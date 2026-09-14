export const LOCALES = ["es", "en"] as const;

export type Locale = (typeof LOCALES)[number];

/** El sitio se sirve en español; el inglés se activa desde la barra. */
export const DEFAULT_LOCALE: Locale = "es";

/** Valor que existe en los dos idiomas. */
export type Localized<T = string> = Record<Locale, T>;

/** Texto que puede ser igual en ambos idiomas (nombres propios, marcas). */
export type Text = string | Localized;

export function pick(text: Text, locale: Locale): string {
  return typeof text === "string" ? text : text[locale];
}
