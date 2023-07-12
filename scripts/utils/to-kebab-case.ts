export function toKebabCase(str: string) {
  return str.toLowerCase().replace(/\s+/g, '-');
}
