export function slugify(value: string) {
  return value
    .replace(/^l['’]/i, "")
    .replace(/^(le|la|les)\s+/i, "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
