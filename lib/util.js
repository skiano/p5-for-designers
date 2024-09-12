
const assetCache = new Map();
const typeMap = { '.js': 'text/javascript', '.css': 'text/css' };

export async function localAsset(src) {
  if (assetCache.has(src)) {
    return assetCache.get(src);
  }
  const res = await fetch(src);
  const txt = await res.text();
  const blob = new Blob([txt], { type: typeMap[src.slice(src.lastIndexOf('.'))] });
  const blobUrl = URL.createObjectURL(blob);
  assetCache.set(src, blobUrl);
  return blobUrl;
}

export function revokeLocalAsset(src) {
  if (assetCache.has(src)) {
    const blobUrl = assetCache.get(src);
    URL.revokeObjectURL(blobUrl);
    assetCache.delete(src);
  }
}