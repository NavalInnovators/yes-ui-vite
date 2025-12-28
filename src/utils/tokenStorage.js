/**
 * Token Storage Utility
 * 
 * Manages authentication tokens using JavaScript-managed cookies.
 * This is an intermediate solution providing better security than localStorage
 * before migrating to HTTP-only cookies.
 * 
 * Security features:
 * - Secure flag (HTTPS only in production)
 * - SameSite=Strict (CSRF protection)
 * - Configurable expiration
 * - In-memory caching for performance
 */

// In-memory cache to reduce cookie parsing
let cache = {
    token: null,
    profileId: null,
    email: null,
};

// Cookie configuration
const COOKIE_CONFIG = {
    token: {
        name: 'auth_token',
        maxAge: 24 * 60 * 60, // 24 hours in seconds
    },
    profileId: {
        name: 'profile_id',
        maxAge: 24 * 60 * 60, // 24 hours in seconds
    },
    email: {
        name: 'user_email',
        maxAge: 24 * 60 * 60, // 24 hours in seconds
    },
};

/**
 * Set a cookie with security flags
 * @param {string} name - Cookie name
 * @param {string} value - Cookie value
 * @param {number} maxAge - Max age in seconds (optional)
 */
const setCookie = (name, value, maxAge = null) => {
    if (!value) return;

    let cookieString = `${name}=${encodeURIComponent(value)}`;

    // Add max age if provided
    if (maxAge) {
        cookieString += `; max-age=${maxAge}`;
    }

    // Add path
    cookieString += '; path=/';

    // Add SameSite for CSRF protection
    cookieString += '; SameSite=Strict';

    // Add Secure flag if in production (HTTPS)
    if (window.location.protocol === 'https:') {
        cookieString += '; Secure';
    }

    document.cookie = cookieString;
};

/**
 * Get a cookie value by name
 * @param {string} name - Cookie name
 * @returns {string|null} Cookie value or null
 */
const getCookie = (name) => {
    const nameEQ = name + '=';
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length));
        }
    }

    return null;
};

/**
 * Remove a cookie by name
 * @param {string} name - Cookie name
 */
const removeCookie = (name) => {
    document.cookie = `${name}=; path=/; max-age=0`;
};

// Token management
export const tokenStorage = {
    /**
     * Get the authentication token
     * @returns {string|null} Token or null
     */
    getToken: () => {
        if (cache.token) return cache.token;
        const token = getCookie(COOKIE_CONFIG.token.name);
        cache.token = token;
        return token;
    },

    /**
     * Set the authentication token
     * @param {string} token - JWT token
     */
    setToken: (token) => {
        cache.token = token;
        setCookie(COOKIE_CONFIG.token.name, token, COOKIE_CONFIG.token.maxAge);
    },

    /**
     * Remove the authentication token
     */
    removeToken: () => {
        cache.token = null;
        removeCookie(COOKIE_CONFIG.token.name);
    },

    /**
     * Get the profile ID
     * @returns {string|null} Profile ID or null
     */
    getProfileId: () => {
        if (cache.profileId) return cache.profileId;
        const profileId = getCookie(COOKIE_CONFIG.profileId.name);
        cache.profileId = profileId;
        return profileId;
    },

    /**
     * Set the profile ID
     * @param {string} profileId - User profile ID
     */
    setProfileId: (profileId) => {
        cache.profileId = profileId;
        setCookie(COOKIE_CONFIG.profileId.name, profileId, COOKIE_CONFIG.profileId.maxAge);
    },

    /**
     * Remove the profile ID
     */
    removeProfileId: () => {
        cache.profileId = null;
        removeCookie(COOKIE_CONFIG.profileId.name);
    },

    /**
     * Get the user email
     * @returns {string|null} Email or null
     */
    getEmail: () => {
        if (cache.email) return cache.email;
        const email = getCookie(COOKIE_CONFIG.email.name);
        cache.email = email;
        return email;
    },

    /**
     * Set the user email
     * @param {string} email - User email
     */
    setEmail: (email) => {
        cache.email = email;
        setCookie(COOKIE_CONFIG.email.name, email, COOKIE_CONFIG.email.maxAge);
    },

    /**
     * Remove the user email
     */
    removeEmail: () => {
        cache.email = null;
        removeCookie(COOKIE_CONFIG.email.name);
    },

    /**
     * Clear all authentication data
     */
    clearAll: () => {
        tokenStorage.removeToken();
        tokenStorage.removeProfileId();
        tokenStorage.removeEmail();
    },

    /**
     * Clear the in-memory cache
     * Useful for testing or when you want to force re-reading from cookies
     */
    clearCache: () => {
        cache = {
            token: null,
            profileId: null,
            email: null,
        };
    },
};

export default tokenStorage;
