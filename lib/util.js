
const assetCache = new Map();
const typeMap = { '.js': 'text/javascript', '.css': 'text/css' };

export async function localAsset(src, type, transform) {
  if (assetCache.has(src)) {
    return assetCache.get(src);
  }
  // NOTE: the strategy is to immediately cache the promise
  // so if two components load the same asset, they will share one promise
  // instead of kicking of multiple requests
  let assetPromise = new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(src);
      let txt = await res.text();
      if (transform) txt = await transform(txt);
      const blob = new Blob([txt], { type: type || typeMap[src.slice(src.lastIndexOf('.'))] });
      const blobUrl = URL.createObjectURL(blob);
      resolve(blobUrl);
    } catch (e) {
      if (assetCache.has(src)) assetCache.delete(src);
      reject(e);
    }
  });
  // TODO: error handling...?
  assetCache.set(src, assetPromise);
  return assetPromise;
}

export async function revokeLocalAsset(src) {
  if (assetCache.has(src)) {
    const blobUrl = await assetCache.get(src);
    if (blobUrl) URL.revokeObjectURL(blobUrl);
    assetCache.delete(src);
  }
}