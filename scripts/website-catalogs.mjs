import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import ts from 'typescript';

const normalize = text => text.replace(/\s+/gu, ' ').trim().toLocaleLowerCase('pt-PT');

// The catalogs are shared with the administration app. Bundle only copy that
// the public website can use, including controls that are hidden until clicked.
export function websiteSources(directory) {
  const sources = new Set();
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const filename = join(directory, entry.name);
    if (entry.isDirectory()) {
      for (const source of websiteSources(filename)) sources.add(source);
    } else if (/\.tsx?$/.test(entry.name)) {
      const file = ts.createSourceFile(filename, readFileSync(filename, 'utf8'), ts.ScriptTarget.Latest, true);
      const visit = node => {
        if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node) || ts.isJsxText(node)) {
          sources.add(normalize(node.text));
          sources.add(normalize(node.text.replace(/[:*…]+$|\.\.\.$/u, '')));
        }
        ts.forEachChild(node, visit);
      };
      visit(file);
    }
  }
  return sources;
}

export function selectWebsiteCopy(catalog, sources) {
  // Keep interpolated templates: their complete text is assembled at runtime.
  return Object.fromEntries(Object.entries(catalog).filter(([key]) => key.includes('{{') || sources.has(normalize(key))));
}

export function websiteCatalogs(root) {
  let sources;
  return {
    name: 'website-translation-catalogs',
    apply: 'build',
    enforce: 'pre',
    buildStart() { sources = websiteSources(join(root, 'src')); },
    transform(code, id) {
      if (!/\/shared\/locales\/(pt|en|fr)\.json$/.test(id)) return;
      return { code: JSON.stringify(selectWebsiteCopy(JSON.parse(code), sources)), map: null };
    },
  };
}
