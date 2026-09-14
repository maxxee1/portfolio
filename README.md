# Portafolio — Maximiliano Solorza

Portafolio personal bilingüe (ES/EN) enfocado en ciberseguridad e inteligencia artificial.

**En vivo:** https://my-portfolio-maximiliano.vercel.app

## Stack

| Pieza      | Qué se usa                                    |
| ---------- | --------------------------------------------- |
| Framework  | Next.js 16 (App Router, React 19)             |
| Lenguaje   | TypeScript en modo estricto                   |
| Estilos    | Tailwind CSS v4 (tokens en `app/globals.css`) |
| Animación  | Motion                                        |
| Íconos     | lucide-react + CDN (devicon / Simple Icons)   |
| Despliegue | Vercel                                        |

## Estructura

```
app/          layout, página y tokens de diseño
components/
  layout/     barra, pie y botón de volver arriba
  sections/   una sección de la página por archivo
  ui/         piezas reutilizables (Section, Reveal, PixelatedCanvas…)
content/      TODO el contenido, tipado y bilingüe (sin texto en los componentes)
lib/          i18n, hooks de scroll y utilidades
public/       imágenes, favicon e imagen para compartir
```

El contenido vive separado de la presentación: para agregar un proyecto, una
certificación o un puesto se edita solo el archivo correspondiente de `content/`,
siempre con las dos traducciones.

## Desarrollo

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de producción
npm run lint
```

## Detalles

- **Idioma:** el sitio arranca en español (`DEFAULT_LOCALE` en `lib/i18n.ts`) y
  recuerda la preferencia en `localStorage`.
- **Retrato:** el componente [PixelatedCanvas de Aceternity UI](https://ui.aceternity.com/components/pixelated-canvas)
  dibuja la foto como una malla de puntos que se distorsiona con el puntero.
- **Accesibilidad:** las animaciones respetan `prefers-reduced-motion`, tanto en
  CSS como en Motion.
