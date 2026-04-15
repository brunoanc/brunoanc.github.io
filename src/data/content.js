export const content = {
    en: {
        profile: {
            name: 'Bruno Ancona Sala',
            location: 'Merida, MX',
            email: 'brunoanconasala@gmail.com',
            phone: '(999) 903-3025',
            headline:
                'I build cloud-native, backend, and systems software with a focus on reliable infrastructure and real operational use.',
            availability:
                'Open to internships, collaborative projects, and engineering opportunities in backend, cloud, and systems development.',
            links: {
                github: 'https://github.com/brunoanc',
                linkedin: 'https://linkedin.com/in/banconas',
                email: 'mailto:brunoanconasala@gmail.com'
            }
        },
        certifications: [
            { label: 'Google Cloud Certified - Associate Cloud Engineer', icon: 'cloud' },
            { label: 'AWS Certified Cloud Practitioner (CLF-C02)', icon: 'cloud' },
            {
                label: 'OEA Cyber Challenge Mexico 2025 CTF - 1st Place (50+ teams)',
                icon: 'trophy'
            },
            { label: 'Google Cybersecurity Certificate', icon: 'shield' }
        ],
        aboutLead:
            'I specialize in cloud-native systems, backend infrastructure, and cybersecurity. My work focuses on reliability, maintainability, and software that can hold up under real operational use.',
        cvFocusItems: [
            'Cloud-native backend systems, infrastructure, and reliable operations.',
            'Production software for institutional and event-driven workflows.',
            'Cross-platform tooling and security-aware engineering practices.'
        ],
        skillGroups: [
            {
                title: 'Languages',
                items: ['C', 'C++', 'Rust', 'Python', 'JavaScript', 'Go', 'PHP']
            },
            {
                title: 'Frameworks',
                items: ['FastAPI', 'SvelteKit', 'Laravel', 'Flutter']
            },
            {
                title: 'Cloud & Tools',
                items: ['Google Cloud', 'AWS', 'Docker', 'Terraform', 'GitHub Actions', 'Linux']
            },
            {
                title: 'Domains',
                items: [
                    'Cloud-Native Systems',
                    'Backend Development',
                    'Cybersecurity',
                    'Reverse Engineering'
                ]
            }
        ],
        experience: [
            {
                org: 'Centro Universitario de Formacion Artistica (CUFA)',
                role: 'Software Engineer',
                period: 'Feb 2025 - Present',
                highlights: [
                    'Sole engineer on a modular Laravel + PostgreSQL system for academic and financial management, covering design, backend logic, and production deployment.',
                    'Introduced CI/CD pipelines and delivered a multilingual website using SvelteKit and Sanity CMS, enabling reliable releases and non-technical content management.'
                ],
                tags: ['Backend', 'Production']
            },
            {
                org: 'AWS Cloud Club Anahuac Mayab',
                role: 'Director of Technology',
                period: '2026 - Present',
                highlights: [
                    'Lead cloud architecture initiatives, deliver AWS workshops, and mentor members on real projects.'
                ],
                tags: ['Leadership', 'Cloud']
            },
            {
                org: 'Southeastern Mexican Model UN',
                role: 'Secretary of Finance and Technology',
                period: '2024 - Present',
                highlights: [
                    'Oversee digital systems and financial planning for a regional Model UN conference.'
                ],
                tags: ['Operations', 'Leadership']
            }
        ],
        education: {
            org: 'Anahuac Mayab University',
            degree: 'B.S. in Software Engineering',
            period: '2024 - 2028',
            notes: [
                'Full-ride Academic Excellence Scholarship (GPA 9.8/10) · Member of Vertice Leadership Program'
            ]
        },
        projects: [
            {
                slug: 'smmun',
                title: 'SMMUN.com',
                role: 'Secretary of Finance and Technology / Cloud-Native Developer',
                summary:
                    'Cloud-native web application for a Model United Nations conference, built on Google Cloud.',
                problem:
                    'The event required reliable registration processing, file handling, and operational coordination at production scale.',
                solution:
                    'Designed an event-driven system using Cloud Run, Pub/Sub, Firestore, and Terraform, then built a FastAPI service for registrations, uploads, and external integrations.',
                impact: [
                    'Handled 500+ registrations, file uploads, and external integrations.',
                    'Redesigned the system with idempotent processing to eliminate duplicate entries under concurrent load.',
                    'Implemented CI/CD pipelines with GitHub Actions and Terraform for automated deployments.'
                ],
                stack: [
                    'FastAPI',
                    'Python',
                    'Google Cloud',
                    'Cloud Run',
                    'Pub/Sub',
                    'Firestore',
                    'Terraform',
                    'GitHub Actions'
                ],
                links: [
                    { label: 'Live Site', href: 'https://smmun.com' },
                    { label: 'GitHub', href: 'https://github.com/brunoanc/smmun-gcp' }
                ],
                tags: ['Web', 'Cloud'],
                featured: true
            },
            {
                slug: 'cic',
                title: 'CIC.org.mx',
                role: 'Software Engineering Intern',
                summary:
                    'Institutional website focused on clear communication and maintainable frontend delivery.',
                problem: 'CIC needed a modern and trustworthy web presence.',
                solution:
                    'Implemented the frontend with Svelte and supported production publishing.',
                impact: [
                    'Launched public-facing institutional site.',
                    'Contributed to internship-to-employment progression.'
                ],
                stack: ['Svelte', 'PHP', 'Sanity CMS'],
                links: [{ label: 'Live Site', href: 'https://cic.org.mx' }],
                tags: ['Web'],
                featured: false
            },
            {
                slug: 'cufa-admin-system',
                title: 'CUFA Administrative System',
                role: 'Software Engineer',
                summary:
                    'Administrative platform and supporting web delivery work used by university staff for daily operations.',
                problem:
                    'CUFA needed a centralized system for registration, payments, careers, and administration.',
                solution:
                    'Built the core Laravel + PostgreSQL system, added CI/CD and structured testing, and shipped a multilingual SvelteKit + Sanity website for staff-managed content.',
                impact: [
                    'Supports student registration, payments, careers, and related institutional workflows.',
                    'Improved deployment reliability and enabled non-technical staff to manage multilingual content independently.'
                ],
                stack: ['Laravel', 'PHP', 'PostgreSQL', 'SvelteKit', 'Sanity CMS', 'CI/CD'],
                links: [],
                tags: ['Web'],
                featured: true
            },
            {
                slug: 'eternal-mod-manager',
                title: 'EternalModManager',
                role: 'Creator / Systems Developer',
                summary:
                    'Cross-platform mod manager for DOOM Eternal with broad Linux and Windows distribution.',
                problem: 'Most modding tools for the game ecosystem were Windows-only.',
                solution:
                    'Built with Rust, GTK4, and libadwaita; distributed through Flathub, Snap, AppImage, AUR, and Windows EXE.',
                impact: [
                    '5k+ downloads on Flathub.',
                    'Built a concurrent, memory-safe Rust architecture for a cross-platform desktop app.'
                ],
                stack: ['Rust', 'GTK4', 'libadwaita'],
                links: [
                    { label: 'GitHub', href: 'https://github.com/brunoanc/EternalModManager' },
                    {
                        label: 'Flathub',
                        href: 'https://flathub.org/en/apps/io.github.brunoanc.eternalmodmanager'
                    }
                ],
                tags: ['Systems', 'Open Source'],
                featured: true
            },
            {
                slug: 'open-source-contributions',
                title: 'Open Source Contributions',
                role: 'Contributor',
                summary:
                    'Targeted upstream fixes to systems and graphics tooling used outside my own projects.',
                problem:
                    'The affected projects had Linux-specific issues that blocked real device support and image export compatibility.',
                solution:
                    'Contributed patches to the Linux kernel and Microsoft DirectXTex to resolve concrete platform compatibility problems.',
                impact: [
                    'Linux kernel (ALSA/SoC): contributed a patch restoring microphone support for a specific chipset.',
                    'Microsoft DirectXTex: fixed image export issues and improved error handling in PNG processing.'
                ],
                stack: ['C', 'C++', 'Linux', 'libpng'],
                links: [
                    { label: 'Linux kernel', href: 'https://github.com/torvalds/linux' },
                    { label: 'DirectXTex', href: 'https://github.com/microsoft/DirectXTex' }
                ],
                tags: ['Systems', 'Open Source'],
                featured: false
            },
            {
                slug: 'eternal-resource-extractor',
                title: 'EternalResourceExtractor',
                role: 'Creator / Systems Developer',
                summary:
                    'High-performance extractor for proprietary DOOM Eternal resource archives.',
                problem: 'Existing approaches were slow and often Windows-only.',
                solution:
                    'Reverse-engineered archive details and implemented a C++ extractor using memory-mapped files on Linux and Windows.',
                impact: [
                    'Reduced extraction time to seconds for large archives.',
                    'Provided a practical cross-platform utility.'
                ],
                stack: ['C++', 'Reverse Engineering', 'Memory mapping'],
                links: [
                    {
                        label: 'GitHub',
                        href: 'https://github.com/brunoanc/EternalResourceExtractor'
                    }
                ],
                tags: ['Systems', 'Open Source'],
                featured: false
            },
            {
                slug: 'love-app',
                title: 'Flutter Sync App',
                role: 'Mobile Developer',
                summary:
                    'Cross-platform mobile app exploring Flutter and Firebase, with real-time data sync, push notifications, and cloud-backed state management.',
                problem:
                    'Wanted hands-on experience building a full mobile stack with real-time sync and notification delivery across platforms.',
                solution:
                    'Built with Flutter for cross-platform UI and Firebase for Firestore real-time sync, FCM push notifications, and cloud storage.',
                impact: [
                    'Implemented end-to-end mobile + backend integration across Android and iOS.',
                    'Gained practical experience with reactive data patterns and Firebase service orchestration.'
                ],
                stack: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'FCM'],
                links: [{ label: 'GitHub', href: 'https://github.com/brunoanc/love' }],
                tags: ['Mobile'],
                featured: false
            }
        ]
    },
    es: {
        profile: {
            name: 'Bruno Ancona Sala',
            location: 'Merida, MX',
            email: 'brunoanconasala@gmail.com',
            phone: '(999) 903-3025',
            headline:
                'Construyo software cloud-native, backend y de sistemas con enfoque en infraestructura confiable y uso operativo real.',
            availability:
                'Abierto a practicas profesionales, proyectos colaborativos y oportunidades de ingenieria en backend, cloud y sistemas.',
            links: {
                github: 'https://github.com/brunoanc',
                linkedin: 'https://linkedin.com/in/banconas',
                email: 'mailto:brunoanconasala@gmail.com'
            }
        },
        certifications: [
            { label: 'Google Cloud Certified - Associate Cloud Engineer', icon: 'cloud' },
            { label: 'AWS Certified Cloud Practitioner (CLF-C02)', icon: 'cloud' },
            {
                label: 'OEA Cyber Challenge Mexico 2025 CTF - 1er lugar (50+ equipos)',
                icon: 'trophy'
            },
            { label: 'Google Cybersecurity Certificate', icon: 'shield' }
        ],
        aboutLead:
            'Me especializo en sistemas cloud-native, infraestructura backend y ciberseguridad. Mi trabajo se enfoca en confiabilidad, mantenibilidad y software que resista el uso operativo real.',
        cvFocusItems: [
            'Backends cloud-native, infraestructura y operaciones confiables.',
            'Software de produccion para flujos institucionales y orientados a eventos.',
            'Herramientas multiplataforma y practicas de ingenieria con enfoque en seguridad.'
        ],
        skillGroups: [
            {
                title: 'Lenguajes',
                items: ['C', 'C++', 'Rust', 'Python', 'JavaScript', 'Go', 'PHP']
            },
            {
                title: 'Frameworks',
                items: ['FastAPI', 'SvelteKit', 'Laravel', 'Flutter']
            },
            {
                title: 'Nube y herramientas',
                items: ['Google Cloud', 'AWS', 'Docker', 'Terraform', 'GitHub Actions', 'Linux']
            },
            {
                title: 'Areas',
                items: [
                    'Sistemas cloud-native',
                    'Desarrollo backend',
                    'Ciberseguridad',
                    'Ingenieria inversa'
                ]
            }
        ],
        experience: [
            {
                org: 'Centro Universitario de Formacion Artistica (CUFA)',
                role: 'Ingeniero de Software',
                period: 'Feb 2025 - presente',
                highlights: [
                    'Ingeniero principal en un sistema administrativo modular con Laravel y PostgreSQL para control académico y financiero, cubriendo diseno, logica backend y despliegue en produccion.',
                    'Implemente pipelines de CI/CD y desarrolle un sitio web multilingue usando SvelteKit + Sanity CMS, habilitando despliegues confiables y gestion de contenido por personal no tecnico.'
                ],
                tags: ['Backend', 'Produccion']
            },
            {
                org: 'AWS Cloud Club Anahuac Mayab',
                role: 'Director de Tecnología',
                period: '2026 - presente',
                highlights: [
                    'Lidero iniciativas de arquitectura cloud, imparto talleres de AWS y asesoro en proyectos practicos.'
                ],
                tags: ['Liderazgo', 'Cloud']
            },
            {
                org: 'Modelo de Naciones Unidas del Sureste Mexicano',
                role: 'Secretario de Tecnología',
                period: '2024 - presente',
                highlights: [
                    'Superviso los sistemas digitales y la planificacion financiera de una conferencia MUN regional.'
                ],
                tags: ['Operaciones', 'Liderazgo']
            }
        ],
        education: {
            org: 'Universidad Anahuac Mayab',
            degree: 'Ingenieria en Software',
            period: '2024 - 2028',
            notes: [
                'Beca de Excelencia Academica · GPA: 9.8/10 · Miembro del Programa de Liderazgo Vertice'
            ]
        },
        projects: [
            {
                slug: 'smmun',
                title: 'SMMUN.com',
                role: 'Secretario de Finanzas y Tecnología / Desarrollador cloud-native',
                summary:
                    'Aplicacion web cloud-native para una conferencia de Modelo de Naciones Unidas, construida sobre Google Cloud.',
                problem:
                    'El evento necesitaba procesar registros, archivos y coordinacion operativa de forma confiable y a escala real.',
                solution:
                    'Disene un sistema orientado a eventos usando Cloud Run, Pub/Sub, Firestore y Terraform, y construi un servicio FastAPI para registros, cargas e integraciones.',
                impact: [
                    'Gestiona 500+ registros e integraciones externas.',
                    'Redisené el sistema con procesamiento idempotente para eliminar duplicados bajo concurrencia.',
                    'Implemente pipelines de CI/CD con GitHub Actions y Terraform para despliegues automatizados.'
                ],
                stack: [
                    'FastAPI',
                    'Python',
                    'Google Cloud',
                    'Cloud Run',
                    'Pub/Sub',
                    'Firestore',
                    'Terraform',
                    'GitHub Actions'
                ],
                links: [
                    { label: 'Sitio', href: 'https://smmun.com' },
                    { label: 'GitHub', href: 'https://github.com/brunoanc/smmun-gcp' }
                ],
                tags: ['Web', 'Cloud'],
                featured: true
            },
            {
                slug: 'cic',
                title: 'CIC.org.mx',
                role: 'Practicante de Ingenieria de Software',
                summary:
                    'Sitio institucional enfocado en comunicacion clara y una entrega frontend mantenible.',
                problem: 'CIC necesitaba una presencia web moderna y confiable.',
                solution:
                    'Implemente el frontend con Svelte y apoye la publicacion del sitio en produccion.',
                impact: [
                    'Lance un sitio institucional publico.',
                    'Contribui a una trayectoria de practicas que termino en una posicion de ingenieria en CUFA.'
                ],
                stack: ['Svelte', 'PHP', 'Sanity CMS'],
                links: [{ label: 'Sitio', href: 'https://cic.org.mx' }],
                tags: ['Web'],
                featured: false
            },
            {
                slug: 'cufa-admin-system',
                title: 'Sistema Administrativo CUFA',
                role: 'Ingeniero de Software',
                summary:
                    'Plataforma administrativa y trabajo web complementario utilizados por personal universitario en operaciones diarias.',
                problem:
                    'CUFA necesitaba un sistema centralizado para inscripciones, pagos, carreras y administracion.',
                solution:
                    'Construyi el sistema principal con Laravel + PostgreSQL, agregue CI/CD y pruebas estructuradas, y publique un sitio multilingue con SvelteKit + Sanity para que el personal gestione contenido.',
                impact: [
                    'Soporta inscripciones, pagos, carreras y otros flujos institucionales.',
                    'Mejoro la confiabilidad del despliegue y permitio que personal no tecnico gestione contenido multilingue de forma independiente.'
                ],
                stack: ['Laravel', 'PHP', 'PostgreSQL', 'SvelteKit', 'Sanity CMS', 'CI/CD'],
                links: [],
                tags: ['Web'],
                featured: true
            },
            {
                slug: 'eternal-mod-manager',
                title: 'EternalModManager',
                role: 'Creador / Desarrollador de sistemas',
                summary:
                    'Gestor de mods multiplataforma para DOOM Eternal con distribucion amplia en Linux y Windows.',
                problem:
                    'La mayoria de las herramientas de modding del ecosistema estaban limitadas a Windows.',
                solution:
                    'Lo construi con Rust, GTK4 y libadwaita; y lo distribui por Flathub, Snap, AppImage, AUR y Windows EXE.',
                impact: [
                    'Mas de 5,000 descargas en Flathub.',
                    'Desarrolle una arquitectura concurrente y segura en memoria para una aplicacion de escritorio multiplataforma en Rust.'
                ],
                stack: ['Rust', 'GTK4', 'libadwaita'],
                links: [
                    { label: 'GitHub', href: 'https://github.com/brunoanc/EternalModManager' },
                    {
                        label: 'Flathub',
                        href: 'https://flathub.org/en/apps/io.github.brunoanc.eternalmodmanager'
                    }
                ],
                tags: ['Sistemas', 'Open Source'],
                featured: true
            },
            {
                slug: 'open-source-contributions',
                title: 'Contribuciones Open Source',
                role: 'Colaborador',
                summary:
                    'Correcciones puntuales a proyectos upstream de sistemas y graficos usadas fuera de mis propios proyectos.',
                problem:
                    'Los proyectos afectados tenian problemas especificos de Linux que bloqueaban soporte de hardware real y compatibilidad de exportacion de imagenes.',
                solution:
                    'Contribui parches al kernel de Linux y a Microsoft DirectXTex para resolver problemas concretos de compatibilidad en plataforma.',
                impact: [
                    'Linux kernel (ALSA/SoC): contribui un parche que restauro el microfono para un chipset especifico.',
                    'Microsoft DirectXTex: corregi errores de exportacion y mejore el manejo de errores para PNGs.'
                ],
                stack: ['C', 'C++', 'Linux', 'libpng'],
                links: [
                    { label: 'Linux kernel', href: 'https://github.com/torvalds/linux' },
                    { label: 'DirectXTex', href: 'https://github.com/microsoft/DirectXTex' }
                ],
                tags: ['Sistemas', 'Open Source'],
                featured: false
            },
            {
                slug: 'eternal-resource-extractor',
                title: 'EternalResourceExtractor',
                role: 'Creador / Desarrollador de sistemas',
                summary:
                    'Extractor de alto rendimiento para archivos de recursos propietarios de DOOM Eternal.',
                problem:
                    'Los enfoques existentes eran lentos y a menudo solo funcionaban en Windows.',
                solution:
                    'Hice ingenieria inversa del formato e implemente un extractor en C++ usando archivos mapeados en memoria en Linux y Windows.',
                impact: [
                    'Redujo el tiempo de extraccion a segundos para archivos grandes.',
                    'Aporto una utilidad multiplataforma practica para la comunidad.'
                ],
                stack: ['C++', 'Ingenieria inversa', 'Memory mapping'],
                links: [
                    {
                        label: 'GitHub',
                        href: 'https://github.com/brunoanc/EternalResourceExtractor'
                    }
                ],
                tags: ['Sistemas', 'Open Source'],
                featured: false
            },
            {
                slug: 'love-app',
                title: 'Flutter Sync App',
                role: 'Desarrollador mobile',
                summary:
                    'Aplicacion mobile multiplataforma para explorar Flutter y Firebase, con sincronizacion en tiempo real, notificaciones push y estado respaldado en la nube.',
                problem:
                    'Queria experiencia practica construyendo una pila mobile completa con sincronizacion en tiempo real y entrega de notificaciones.',
                solution:
                    'La construyi con Flutter para la UI multiplataforma y Firebase para sincronizacion en Firestore, notificaciones push con FCM y almacenamiento en la nube.',
                impact: [
                    'Implemente integracion end-to-end entre mobile y backend en Android e iOS.',
                    'Adquiri experiencia practica con patrones reactivos de datos y orquestacion de servicios de Firebase.'
                ],
                stack: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'FCM'],
                links: [{ label: 'GitHub', href: 'https://github.com/brunoanc/love' }],
                tags: ['Mobile'],
                featured: false
            }
        ]
    }
};
