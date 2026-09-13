// Prerender en el build: mete el HTML de la página dentro de dist/index.html para que
// el navegador pinte el contenido antes de descargar y ejecutar el JS (en el teléfono
// era una pantalla vacía de varios segundos). Después React hidrata sobre ese HTML.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const indexPath = path.resolve('dist/index.html');
const { render } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);

const template = fs.readFileSync(indexPath, 'utf8');
const placeholder = '<div id="root"></div>';
if (!template.includes(placeholder)) {
  throw new Error(`No se encontró ${placeholder} en dist/index.html`);
}

fs.writeFileSync(indexPath, template.replace(placeholder, `<div id="root">${render()}</div>`));
fs.rmSync(path.resolve('dist-ssr'), { recursive: true, force: true });
console.log('Prerender OK → dist/index.html');
