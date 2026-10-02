import { writable } from 'svelte/store';

const normalizeLocale = (value) => (value && value.toLowerCase().startsWith('es') ? 'es' : 'en');

const getInitialLocale = () => {
    if (typeof window === 'undefined') {
        return 'en';
    }

    const query = new URLSearchParams(window.location.search).get('lang');

    if (query === 'en' || query === 'es') {
        return query;
    }

    try {
        const saved = window.localStorage.getItem('portfolio-language');

        if (saved === 'en' || saved === 'es') {
            return saved;
        }
    }
    catch {
        /* Storage may be unavailable in private browsing. */
    }

    return normalizeLocale(window.navigator.language || window.navigator.languages?.[0]);
};

export const locale = writable('en');

export const initI18n = () => locale.set(getInitialLocale());

export const setAppLocale = (value) => {
    const language = normalizeLocale(value);

    locale.set(language);

    if (typeof window !== 'undefined') {
        try {
            window.localStorage.setItem('portfolio-language', language);
        }
        catch {
            /* Keep the language switch usable without storage. */
        }

        const url = new URL(window.location.href);

        url.searchParams.set('lang', language);
        window.history.replaceState(null, '', url);
    }
};
