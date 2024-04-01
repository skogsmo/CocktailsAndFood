


const cachableGetUrl = (cacherBaseUrl: string, url: string, useCache: boolean = false): string => {

  if (!useCache) return url;

  const encodedUrl = encodeURIComponent(url);

  return cacherBaseUrl + encodedUrl;
};

export default cachableGetUrl;