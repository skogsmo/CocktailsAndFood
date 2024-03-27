


const cachableGetUrl = (url: string, useCache: boolean = false): string => {

  if (!useCache) return url;

  const encodedUrl = encodeURIComponent(url);

  return `https://localhost:6789/api-cacher/get/${encodedUrl}`;
};

export default cachableGetUrl;