export const STRAPI_API_URL = "http://localhost:1337";

/**
 * Helper to get full Strapi URL from path
 * @param {string} path 
 * @returns {string}
 */
export const getStrapiURL = (path = "") => {
    return `${STRAPI_API_URL}${path}`;
};

/**
 * Helper to get full media URL
 * @param {object|string} media 
 * @returns {string}
 */
export const getStrapiMedia = (media) => {
    if (!media) return null;

    // If it's already a full URL or blob, return it
    if (typeof media === "string") {
        const url = media.startsWith("/") ? getStrapiURL(media) : media;
        return url;
    }

    // Handle Strapi media object response structure
    const { url } = media.data?.attributes || media.attributes || media;
    const imageUrl = url.startsWith("/") ? getStrapiURL(url) : url;
    return imageUrl;
};

/**
 * Fetch API helper
 * @param {string} path 
 * @param {object} options 
 * @returns {Promise<any>}
 */
export const fetchAPI = async (path, options = {}) => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 1000); // 1-second timeout

    const mergedOptions = {
        headers: {
            "Content-Type": "application/json",
        },
        signal: controller.signal,
        ...options,
    };

    try {
        const requestUrl = getStrapiURL(`/api${path}`);
        const response = await fetch(requestUrl, mergedOptions);
        clearTimeout(timeoutId);

        if (!response.ok) {
            console.error(response.statusText);
            // Return null or empty object instead of throwing to prevent app crash/UI lag impact
            return { data: [] };
        }
        const data = await response.json();
        return data;
    } catch (error) {
        clearTimeout(timeoutId);
        console.warn("Strapi fetch failed or timed out:", error);
        // Fallback to avoid UI breaking
        return { data: [] };
    }
};

