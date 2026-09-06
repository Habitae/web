import Negotiator from 'negotiator';

export const HTML = 'text/html';
export const MARKDOWN = 'text/markdown';

/** RFC 9110 selection: most specific matching range supplies each representation's q. */
export function representation(accept, available = [HTML, MARKDOWN]) {
  const headers = accept === null ? {} : { accept };
  const offers = available.map(type => /^(text\/|application\/(json|xml))/.test(type) ? `${type}; charset=utf-8` : type);
  const chosen = new Negotiator({ headers }).mediaType(offers);
  return chosen ? available[offers.indexOf(chosen)] : null;
}

function vary(headers) {
  const values = (headers.get('Vary') || '').split(',').map(value => value.trim()).filter(Boolean);
  if (values.includes('*')) return;
  for (const name of ['Accept', 'Accept-Encoding']) if (!values.some(value => value.toLowerCase() === name.toLowerCase())) values.push(name);
  headers.set('Vary', values.join(', '));
}

function documentHeaders(original = {}) {
  const headers = new Headers(original);
  vary(headers);
  // Source assets are cached by their distinct file URLs. Do not cache negotiated
  // responses under a shared URL: downstream CDN cache rules can ignore Vary.
  headers.set('Cache-Control', 'no-store');
  headers.set('X-Content-Type-Options', 'nosniff');
  return headers;
}

function reply(request, status, body, headers) {
  return new Response(request.method === 'HEAD' ? null : body, { status, headers });
}

export function createHandler(manifest) {
  const publicOrigin = new URL(manifest.origin);
  const recoveryLinks = `<${manifest.origin}/sitemap.xml>; rel="sitemap", <${manifest.origin}/llms.txt>; rel="describedby", <${manifest.origin}/404.md>; rel="alternate"; type="text/markdown"`;

  return async function handle(request, assets) {
    const url = new URL(request.url);
    // Enforce HTTPS on the public host while keeping local HTTP previews usable.
    if (url.protocol === 'http:' && url.hostname === publicOrigin.hostname) {
      const destination = new URL(publicOrigin);
      destination.pathname = url.pathname;
      destination.search = url.search;
      return reply(request, 308, null, documentHeaders({ Location: destination.href }));
    }
    const accept = request.headers.get('Accept');
    const getAsset = (path, method = request.method) => {
      const target = new URL(path, url.origin);
      // Internal requests select an actual immutable representation, never negotiate
      // through the public handler or forward the other variant's validators/ranges.
      return assets.fetch(new Request(target, { method, headers: { Accept: '*/*' } }));
    };
    const unavailable = () => reply(request, 503, null, documentHeaders({ 'Retry-After': '60' }));
    const notAcceptable = (canonical) => reply(request, 406, null, documentHeaders({ Link: canonical ? `<${canonical}>; rel="canonical"` : recoveryLinks }));
    const missing = async () => {
      const selected = representation(accept, [MARKDOWN, HTML]);
      const headers = documentHeaders({ 'X-Robots-Tag': 'noindex, follow', Link: recoveryLinks });
      if (!selected) return reply(request, 404, null, headers);
      const source = await getAsset(selected === MARKDOWN ? '/404.md' : '/404.html');
      if (source.status !== 200) return unavailable();
      headers.set('Content-Type', `${selected}; charset=utf-8`);
      return reply(request, 404, source.body, headers);
    };

    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return reply(request, 405, null, documentHeaders({ Allow: 'GET, HEAD' }));
    }
    // These are error documents, not successful product pages even if the files exist.
    if (url.pathname === '/404.html') return missing();

    const route = Object.hasOwn(manifest.routes, url.pathname) ? manifest.routes[url.pathname] : null;
    if (route) {
      const selected = representation(accept);
      if (!selected) return notAcceptable(route.canonical);
      const language = url.searchParams.get('lang');
      const destination = route.kind !== 'help' && ['pt', 'en'].includes(language)
        ? route.alternates[language] : new URL(route.canonical).pathname;
      // Canonicalise legacy query-language links in one hop, including without JS.
      if (destination !== url.pathname || (route.kind !== 'help' && ['pt', 'en'].includes(language))) {
        url.pathname = destination;
        if (route.kind !== 'help') url.searchParams.delete('lang');
        return reply(request, 308, null, documentHeaders({ Location: `${url.pathname}${url.search}` }));
      }
      const source = await getAsset(selected === MARKDOWN ? route.markdown : route.html);
      if (source.status !== 200) return unavailable();
      const headers = documentHeaders(source.headers);
      headers.set('Content-Type', `${selected}; charset=utf-8`);
      headers.set('Link', `<${route.canonical}>; rel="canonical", <${manifest.origin}${route.markdown}>; rel="alternate"; type="text/markdown", <${manifest.origin}/llms.txt>; rel="describedby"`);
      if (route.noindex) headers.set('X-Robots-Tag', 'noindex, follow');
      return reply(request, 200, source.body, headers);
    }

    const file = Object.hasOwn(manifest.files, url.pathname) ? manifest.files[url.pathname] : null;
    if (!file) return missing();
    const selected = representation(accept, [file.type]);
    if (!selected) return notAcceptable(file.canonical);
    const source = await getAsset(url.pathname);
    if (source.status !== 200) return unavailable();
    const isText = /^(text\/|application\/(json|xml))/.test(file.type);
    const isDocument = ['text/html', 'text/markdown', 'text/plain', 'application/json', 'application/xml'].includes(file.type);
    const headers = isDocument ? documentHeaders(source.headers) : new Headers(source.headers);
    headers.set('Content-Type', `${file.type}${isText ? '; charset=utf-8' : ''}`);
    if (file.canonical) headers.set('Link', `<${file.canonical}>; rel="canonical", <${manifest.origin}/llms.txt>; rel="describedby"`);
    if (file.noindex) headers.set('X-Robots-Tag', 'noindex, follow');
    // Rejecting an incompatible Accept also varies these asset endpoints.
    vary(headers);
    return reply(request, 200, source.body, headers);
  };
}
