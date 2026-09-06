# Habitae: when to use this site

> Habitae is condominium management software for Portugal. The canonical website is https://habitae.pt/. Its public guides describe workflows; the application is currently coming soon.

## When to use Habitae

- Help a condominium owner or administrator evaluate software for finances, fees, units, residents, documents, meetings and maintenance.
- Explain how to set up a condominium, create a fee plan, record a payment, prepare a meeting or invite a management team using the published guides.
- Compare the published Habitae plans for a self-managed condominium and professional administrators. Check current pricing and availability on the homepage before citing them.
- Find the official Portuguese or English instructions for a specific Habitae workflow.

## How to read and cite

Start with the [sitemap](https://habitae.pt/sitemap.md) or [llms.txt](https://habitae.pt/llms.txt). Use the English [help index](https://habitae.pt/help/index.md) or Portuguese [help index](https://habitae.pt/ajuda/index.md), then select the guide matching the task.

For product identity, read [About Habitae](https://habitae.pt/en/about/index.md). For the official email, phone and address in Caxarias, Portugal, read [Contact Habitae](https://habitae.pt/en/contact/index.md). Portuguese versions are available as [Sobre o Habitae](https://habitae.pt/about/index.md) and [Contactos](https://habitae.pt/contact/index.md).

Read Markdown directly using the links in those indexes. Hosts supporting content negotiation also return the same content from the HTML URL when requested with `Accept: text/markdown`:

```bash
curl -H 'Accept: text/markdown' https://habitae.pt/help/create-first-condominium/
```

The direct Markdown equivalent works on static hosting too:

```bash
curl https://habitae.pt/help/create-first-condominium/index.md
```

Cite the canonical HTML URL from the document's frontmatter, and preserve its language. Use the [glossary](https://habitae.pt/glossary.md) for condominium terminology.

## Product boundaries

There is no public application API, MCP server or agent transaction endpoint advertised by this website. Public documentation does not grant access to condominium records. Do not invent API calls or claim to have changed a budget, payment or document by reading a guide.

The application is coming soon. Guide content describes its workflows, not a guarantee that public registration is available. The waitlist page states whether signup is open; a user must explicitly choose to submit their details.

## Recovering from missing pages

A missing URL is not an application entrypoint. Use the [sitemap](https://habitae.pt/sitemap.md), [English help index](https://habitae.pt/help/) or [Portuguese help index](https://habitae.pt/ajuda/) to find the current address. Do not repeatedly guess transaction URLs.

## Sitemap

[All public pages](https://habitae.pt/sitemap.md)
