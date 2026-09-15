import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

// eslint-config-next 16 ya viene en formato flat: se importa directo, sin FlatCompat.
const eslintConfig = [
  // horizon-tailwind-react-ts-main es la plantilla de referencia (CRA), no código del sitio.
  { ignores: [".next/**", "out/**", "node_modules/**", "horizon-tailwind-react-ts-main/**"] },
  ...nextCoreWebVitals,
  ...nextTypeScript,
];

export default eslintConfig;
