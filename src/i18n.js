import { addMessages, init, locale } from 'svelte-i18n';

const messages = {
    en: {
        nav: {
            projects: 'Projects',
            experience: 'Experience',
            about: 'About',
            cv: 'CV',
            contact: 'Contact',
            sections: 'Sections'
        },
        locale: {
            label: 'Language',
            en: 'EN',
            es: 'ES'
        },
        actions: {
            viewProjects: 'View Projects',
            viewCv: 'View CV'
        },
        home: {
            lead: 'Software engineering student with hands-on experience in cloud-native systems, backend development, and cybersecurity.',
            imageAlt: 'Terminal-style profile snippet with skills and languages.'
        },
        sections: {
            highlights: 'Highlights',
            work: 'Selected Work',
            experience: 'Experience and Leadership',
            about: 'About',
            cv: 'My CV',
            contact: "Let's build something meaningful"
        },
        highlights: {
            aria: 'Highlights'
        },
        projects: {
            lead: 'The recent work here is centered on production systems, cloud-native workflows, and cross-platform tooling that solve real operational problems.',
            all: 'See full project list'
        },
        cv: {
            lead: 'Software engineering student with hands-on experience in cloud-native systems, backend development, and cybersecurity.',
            downloadEn: 'Download CV (English)',
            downloadEs: 'Download CV (Spanish)',
            focus: 'Current Focus',
            contact: 'Contact',
            focusItems: [
                'Cloud-native backend systems, infrastructure, and reliable operations.',
                'Production software for institutional and event-driven workflows.',
                'Cross-platform tooling and security-aware engineering practices.'
            ]
        },
        contact: {
            lead: 'Open to internships, collaborative projects, and engineering opportunities in backend, cloud, and systems development.',
            email: 'Email Me',
            linkedin: 'LinkedIn'
        },
        footer: {
            top: 'Back to top'
        }
    },
    es: {
        nav: {
            projects: 'Proyectos',
            experience: 'Experiencia',
            about: 'Perfil',
            cv: 'CV',
            contact: 'Contacto',
            sections: 'Secciones'
        },
        locale: {
            label: 'Idioma',
            en: 'EN',
            es: 'ES'
        },
        actions: {
            viewProjects: 'Ver proyectos',
            viewCv: 'Ver CV'
        },
        home: {
            lead: 'Estudiante de Ingenieria en Software con experiencia en sistemas cloud-native, desarrollo backend y ciberseguridad.',
            imageAlt: 'Fragmento de terminal con informacion de perfil, lenguajes y habilidades.'
        },
        sections: {
            highlights: 'Destacados',
            work: 'Trabajo seleccionado',
            experience: 'Experiencia y liderazgo',
            about: 'Perfil',
            cv: 'Mi CV',
            contact: 'Construyamos algo util'
        },
        highlights: {
            aria: 'Destacados'
        },
        projects: {
            lead: 'El trabajo reciente se centra en sistemas de produccion, flujos cloud-native y herramientas multiplataforma que resuelven problemas operativos reales.',
            all: 'Ver lista completa de proyectos'
        },
        cv: {
            lead: 'Estudiante de Ingenieria en Software con experiencia en sistemas cloud-native, desarrollo backend y ciberseguridad.',
            downloadEn: 'Descargar CV (Ingles)',
            downloadEs: 'Descargar CV (Espanol)',
            focus: 'Enfoque actual',
            contact: 'Contacto',
            focusItems: [
                'Backends cloud-native, infraestructura y operaciones confiables.',
                'Software de produccion para flujos institucionales y orientados a eventos.',
                'Herramientas multiplataforma y practicas de ingenieria con enfoque en seguridad.'
            ]
        },
        contact: {
            lead: 'Abierto a practicas profesionales, proyectos colaborativos y oportunidades de ingenieria en backend, cloud y sistemas.',
            email: 'Escribeme',
            linkedin: 'LinkedIn'
        },
        footer: {
            top: 'Volver arriba'
        }
    }
};

for (const [key, value] of Object.entries(messages)) {
    addMessages(key, value);
}

const normalizeLocale = (value) => (value && value.toLowerCase().startsWith('es') ? 'es' : 'en');

const getInitialLocale = () => {
    if (typeof window === 'undefined') {
        return 'en';
    }

    return normalizeLocale(window.navigator.language || window.navigator.languages?.[0]);
};

export const initI18n = () => {
    init({
        fallbackLocale: 'en',
        initialLocale: getInitialLocale()
    });
};

export const setAppLocale = (value) => {
    locale.set(normalizeLocale(value));
};
