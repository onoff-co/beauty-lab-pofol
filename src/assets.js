// Vite supplies the project base in builds; Node tests use the local root.
export function assetUrl(path, base = import.meta.env?.BASE_URL ?? '/') {
  return `${base}${path.replace(/^\//, '')}`;
}
