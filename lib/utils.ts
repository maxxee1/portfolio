type ClassValue = string | false | null | undefined;

/** Une clases ignorando las condicionales que no aplican. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
