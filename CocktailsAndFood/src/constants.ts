import { cachableUrl } from "./utils/apiUrl";

export const USE_CACHED_API_CALLS = true;

export const API_CACHER_BASE_URL = "https://localhost:6789/api-cacher/get/";

export const MENU_URL: cachableUrl = {
    cacheUrl: "data/menu.json",
    nonCacheUrl: "https://iths-2024-recept-grupp3-3j1u35.reky.se/recipes"
}