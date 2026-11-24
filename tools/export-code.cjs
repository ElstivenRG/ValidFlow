const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const excluded = new Set(['node_modules', 'platforms', '.git', '.npm-cache']);
const files = [];
function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (excluded.has(entry.name)) continue;
    const absolute = path.join(directory, entry.name);
    if (entry.isDirectory()) walk(absolute);
    else {
      const relative = path.relative(root, absolute).replaceAll('\\', '/');
      if (relative !== 'CODIGO_COMPLETO.md' && !/\.(log|zip)$/.test(relative)) files.push(relative);
    }
  }
}
walk(root);
files.sort();
const languages = { ts: 'typescript', js: 'javascript', cjs: 'javascript', mjs: 'javascript', html: 'html', xml: 'xml', json: 'json', css: 'css', ps1: 'powershell', md: 'markdown', gradle: 'groovy' };
let output = '# Explora: entrega de código completo\n\n';
output += 'Todos los archivos del proyecto se incluyen íntegros. Los PNG se entregan también en Base64 y se pueden regenerar con `tools/generate-assets.ps1`.\n\n';
output += '## Estructura\n\n```text\n' + files.join('\n') + '\n```\n\n';
for (const file of files) {
  const binary = file.endsWith('.png');
  const contents = fs.readFileSync(path.join(root, file), binary ? 'base64' : 'utf8');
  const extension = path.extname(file).slice(1);
  const fence = '`'.repeat(4);
  output += `## ${file}${binary ? ' (Base64)' : ''}\n\n${fence}${binary ? 'text' : languages[extension] || 'text'}\n${contents.trimEnd()}\n${fence}\n\n`;
}
fs.writeFileSync(path.join(root, 'CODIGO_COMPLETO.md'), output);
console.log(`Código completo exportado: ${files.length} archivos.`);
