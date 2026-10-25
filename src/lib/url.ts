// Prefixes the deploy base path (e.g. /aj-protfolio on github.io) onto a root-relative path.
export const url = (path: string) => import.meta.env.BASE_URL.replace(/\/$/, '') + path;
