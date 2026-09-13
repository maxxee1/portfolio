import { renderToString } from 'react-dom/server';
import App from './App.jsx';

// Lo usa scripts/prerender.mjs en el build para generar el HTML inicial.
export const render = () => renderToString(<App />);
