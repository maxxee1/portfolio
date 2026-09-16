export const LOCALES = ["es", "en", "de", "it", "nl"] as const;

export type Locale = (typeof LOCALES)[number];

/** Los dos idiomas de la píldora ES/EN de la barra. */
export const MAIN_LOCALES = ["es", "en"] as const satisfies readonly Locale[];

/** Idiomas nicho: viven en el selector del globo terráqueo. */
export const NICHE_LOCALES = ["de", "it", "nl"] as const satisfies readonly Locale[];

/** Nombre de cada idioma en su propia lengua, para el selector. */
export const LOCALE_NAMES: Record<Locale, string> = {
  es: "Español",
  en: "English",
  de: "Deutsch",
  it: "Italiano",
  nl: "Nederlands",
};

/** El sitio se sirve en español; los demás idiomas se activan desde la barra. */
export const DEFAULT_LOCALE: Locale = "es";

export function isLocale(value: unknown): value is Locale {
  return LOCALES.includes(value as Locale);
}

/** Valor que existe en todos los idiomas. */
export type Localized<T = string> = Record<Locale, T>;

/** Texto que puede ser igual en todos los idiomas (nombres propios, marcas). */
export type Text = string | Localized;

export function pick(text: Text, locale: Locale): string {
  return typeof text === "string" ? text : text[locale];
}
