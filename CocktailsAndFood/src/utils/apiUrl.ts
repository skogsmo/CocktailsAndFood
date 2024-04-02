

export type cachableUrl = {
  cacheUrl: string;
  nonCacheUrl: string;
};

function isCachableUrl(url: any): url is cachableUrl {
  return typeof url === 'object' && 'cacheUrl' in url && 'nonCacheUrl' in url;
}

export function cachableGetUrl(url: string, useCache: boolean, cacherBaseUrl: string): string
export function cachableGetUrl(url: cachableUrl, useCache: boolean, cacherBaseUrl: string): string;

export default function cachableGetUrl(url: string | cachableUrl, useCache: boolean = false, cacherBaseUrl: string = ""): string {

  if (isCachableUrl(url)) {
    return useCache ? url.cacheUrl : url.nonCacheUrl;
  }

  if (!useCache) return url;

  const encodedUrl = encodeURIComponent(url);

  return cacherBaseUrl + encodedUrl;
};