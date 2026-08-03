function deploymentPrefix() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return '';

  const moduleScript = document.querySelector<HTMLScriptElement>('script[type="module"][src]');
  if (!moduleScript) return '';

  const scriptPath = new URL(moduleScript.src, window.location.href).pathname;
  const assetsMarker = scriptPath.lastIndexOf('/assets/');
  return assetsMarker === -1 ? '' : scriptPath.slice(0, assetsMarker);
}

export function sitePath(path = '/') {
  const prefix = deploymentPrefix();
  const normalizedPath = path.replace(/^\/+/, '');
  return normalizedPath ? `${prefix}/${normalizedPath}` : `${prefix || ''}/`;
}

export function siteAsset(filename: string) {
  return sitePath(filename);
}

export function appPathname() {
  const prefix = deploymentPrefix();
  const pathname = window.location.pathname;

  if (prefix && (pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return pathname.slice(prefix.length) || '/';
  }

  return pathname;
}
