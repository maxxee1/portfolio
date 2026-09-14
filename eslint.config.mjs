import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

// eslint-config-next 16 ya viene en formato flat: se importa directo, sin FlatCompat.
const eslintConfig = [
  { ignores: [".next/**", "out/**", "node_modules/**"] },
  ...nextCoreWebVitals,
  ...nextTypeScript,
];

export default eslintConfig;
