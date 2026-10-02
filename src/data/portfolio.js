const pair = (en, es) => ({ en, es });

export const projects = [
    {
        id: 'smmun',
        title: 'SMMUN.com',
        category: 'cloud',
        number: '01',
        role: pair('Lead Software Engineer', 'Ingeniero de Software Líder'),
        result: pair('500+ registrations', '500+ registros'),
        description: pair(
            'Registration for SMMUN, built with FastAPI and Google Cloud.',
            'Plataforma de registros de SMMUN, desarrollada con FastAPI y Google Cloud.'
        ),
        stack: ['Python', 'FastAPI', 'Cloud Run', 'Pub/Sub', 'Firestore', 'Terraform'],
        visual: 'cloud',
        steps: ['FastAPI', 'Firestore + outbox', 'Pub/Sub', 'Worker'],
        context: pair(
            'Each registration includes participant information, private file uploads, and calls to external services. I needed to accept submissions reliably and recover when those services failed.',
            'Cada registro incluye datos del participante, archivos privados y llamadas a servicios externos. Necesitaba aceptar las solicitudes de forma confiable y recuperar las operaciones si alguno de esos servicios fallaba.'
        ),
        decisions: pair(
            [
                'I used idempotent intake and a transactional outbox to accept registrations separately from calls to external services.',
                'Workers save checkpoints so they can resume unfinished operations after a failure.',
                'I provisioned the infrastructure with Terraform and automated deployments with GitHub Actions.'
            ],
            [
                'Usé recepción idempotente y un outbox transaccional para aceptar registros por separado de las llamadas a servicios externos.',
                'Los workers guardan checkpoints para retomar las operaciones pendientes después de un fallo.',
                'Definí la infraestructura con Terraform y automaticé los despliegues con GitHub Actions.'
            ]
        ),
        outcome: pair(
            'The platform handled 500+ registrations. Idempotent processing prevents duplicate entries, and checkpoints let workers resume interrupted operations.',
            'La plataforma procesó más de 500 registros. El procesamiento idempotente evita duplicados y los checkpoints permiten retomar las operaciones interrumpidas.'
        ),
        links: [
            { label: 'GitHub', url: 'https://github.com/brunoanc/smmun-gcp' },
            { label: pair('Website', 'Sitio web'), url: 'https://smmun.com' }
        ]
    },
    {
        id: 'cufa',
        title: 'CUFA',
        category: 'backend',
        number: '02',
        role: pair(
            'Software Engineer · sole developer',
            'Ingeniero de Software · desarrollador único'
        ),
        result: pair('In production', 'En producción'),
        description: pair(
            'Enrollment, academic records, and payments for CUFA’s administrative staff and professors.',
            'Inscripciones, control académico y pagos para el personal administrativo y docente de CUFA.'
        ),
        stack: ['PHP', 'Laravel', 'PostgreSQL', 'Pest', 'CI/CD'],
        visual: 'backend',
        steps: pair(
            ['Enrollment', 'Academics', 'Payments'],
            ['Inscripciones', 'Control académico', 'Pagos']
        ),
        context: pair(
            'CUFA’s previous system didn’t fit its processes, leaving staff with manual work. I met with users each week to understand their needs and built a replacement from scratch.',
            'El sistema anterior no se ajustaba a los procesos de CUFA y el personal seguía trabajando manualmente. Me reuní con los usuarios cada semana para entender sus necesidades y construí un reemplazo desde cero.'
        ),
        decisions: pair(
            [
                'I organized the backend into services for the university’s academic and financial rules.',
                'Payment registration uses idempotency and database transactions to prevent duplicate entries and incomplete updates.',
                'I wrote regression tests for payment processing and academic rules.'
            ],
            [
                'Organicé el backend en servicios para las reglas académicas y financieras de la universidad.',
                'El registro de pagos usa idempotencia y transacciones de base de datos para evitar duplicados y actualizaciones incompletas.',
                'Escribí pruebas de regresión para el procesamiento de pagos y las reglas académicas.'
            ]
        ),
        outcome: pair(
            'Administrative staff and professors use the system for enrollment, academic records, and payments. Professor registration is rolling out; student login is planned, not shipped.',
            'El personal administrativo y docente usa el sistema para inscripciones, control académico y pagos. El registro de profesores está en adopción; el acceso de estudiantes está planeado, no implementado.'
        ),
        links: []
    },
    {
        id: 'eternal-mod-manager',
        title: 'EternalModManager',
        category: 'systems',
        number: '03',
        role: pair('Creator · open source', 'Creador · código abierto'),
        result: pair('5k+ Flathub downloads', '5k+ descargas en Flathub'),
        description: pair(
            'A native DOOM Eternal mod manager for Linux and Windows, written in Rust.',
            'Un gestor nativo de mods de DOOM Eternal para Linux y Windows, desarrollado en Rust.'
        ),
        stack: ['Rust', 'GTK4', 'libadwaita', 'Linux', 'Windows'],
        visual: 'image',
        image: '/eternal-manager.png',
        alt: pair(
            'EternalModManager showing its mod list and application settings.',
            'EternalModManager con su lista de mods y configuración.'
        ),
        context: pair(
            'Most DOOM Eternal modding tools were built for Windows. I wanted to manage mods on Linux too, so I built a native desktop app for both platforms.',
            'La mayoría de las herramientas de mods de DOOM Eternal eran para Windows. Quería gestionar mods también en Linux, así que desarrollé una aplicación de escritorio nativa para ambas plataformas.'
        ),
        decisions: pair(
            [
                'The app uses Rust for memory safety and GTK4 for its native interface.',
                'Mod operations run on background threads and send messages to the interface.',
                'I publish packages on Flathub, Snap, AppImage, and AUR, alongside a Windows executable.'
            ],
            [
                'La aplicación usa Rust para la seguridad de memoria y GTK4 para la interfaz nativa.',
                'Las operaciones con mods se ejecutan en hilos en segundo plano y envían mensajes a la interfaz.',
                'Publico paquetes en Flathub, Snap, AppImage y AUR, además de un ejecutable para Windows.'
            ]
        ),
        outcome: pair(
            'The app has more than 5,000 downloads on Flathub. Its source code and releases are public.',
            'La aplicación tiene más de 5,000 descargas en Flathub. El código fuente y las versiones publicadas son públicos.'
        ),
        links: [
            { label: 'GitHub', url: 'https://github.com/brunoanc/EternalModManager' },
            {
                label: 'Flathub',
                url: 'https://flathub.org/en/apps/io.github.brunoanc.eternalmodmanager'
            }
        ]
    },
    {
        id: 'aws-workshop',
        title: pair('AI agent workshop', 'Taller de agentes de IA'),
        category: 'cloud',
        number: '04',
        role: pair('Workshop author & instructor', 'Autor e instructor del taller'),
        result: pair('Delivered to 30 students', 'Impartido a 30 estudiantes'),
        description: pair(
            'A hands-on AWS workshop: an AI agent that interacts with a digital pet.',
            'Un taller práctico de AWS: un agente de IA que interactúa con una mascota digital.'
        ),
        stack: ['Amazon Bedrock', 'Strands Agents', 'Lambda', 'DynamoDB', 'Terraform'],
        visual: 'image',
        image: '/workshop.png',
        alt: pair(
            'The workshop application with the digital pet and agent conversation interface.',
            'La aplicación del taller con la mascota digital y la interfaz de conversación del agente.'
        ),
        context: pair(
            'I designed the workshop around a digital pet so students could see an agent use tools and change data stored by an application.',
            'Diseñé el taller alrededor de una mascota digital para que los estudiantes vieran cómo un agente usa herramientas y modifica los datos de una aplicación.'
        ),
        decisions: pair(
            [
                'I built the agent with Bedrock and Strands Agents. Its tools call Lambda functions that interact with DynamoDB.',
                'Terraform provisions the workshop’s infrastructure.',
                'I included participant and organizer guides, checkpoints, and tests for the practical session.'
            ],
            [
                'Construí el agente con Bedrock y Strands Agents. Sus herramientas llaman funciones Lambda que interactúan con DynamoDB.',
                'Terraform aprovisiona la infraestructura del taller.',
                'Preparé guías para participantes y organizadores, checkpoints y pruebas para la sesión práctica.'
            ]
        ),
        outcome: pair(
            'I taught the workshop to 30 students through the AWS Student Builder Group.',
            'Desarrollé e impartí el taller a un grupo de 30 estudiantes en el AWS Student Builder Group.'
        ),
        links: [
            {
                label: 'GitHub',
                url: 'https://github.com/brunoanc/aws-digital-pet-workshop'
            }
        ]
    }
];

export const contributions = [
    {
        title: 'Linux kernel',
        featured: true,
        stack: 'C · ALSA / SoC',
        date: '2024',
        url: 'https://github.com/torvalds/linux/commit/c118478665f467e57d06b2354de65974b246b82b',
        description: pair(
            'I added a device-specific fix for the HP 14-em0002la’s internal microphone. The patch is merged into the Linux kernel.',
            'Agregué una corrección específica para el micrófono interno de la HP 14-em0002la. El parche está integrado en el kernel de Linux.'
        )
    },
    {
        title: 'Microsoft DirectXTex',
        featured: true,
        stack: 'C++ · libpng',
        date: '2024',
        url: 'https://github.com/microsoft/DirectXTex/pull/503',
        description: pair(
            'I fixed an incorrect image stride when exporting R8 images to PNG with libpng. The patch is merged into DirectXTex.',
            'Corregí el stride incorrecto al exportar imágenes R8 a PNG con libpng. El parche está integrado en DirectXTex.'
        )
    },
    {
        title: 'Rust image',
        featured: false,
        stack: 'Rust · DDS',
        date: '2022',
        url: 'https://github.com/image-rs/image/pull/1678',
        description: pair(
            'I added DX10 extended-header support to the image crate’s DDS decoder, including header validation and mapping BC1–BC3 formats to the existing DXT decoders.',
            'Agregué soporte para la cabecera extendida DX10 al decodificador DDS del crate image, con validación de cabeceras y mapeo de formatos BC1–BC3 a los decodificadores DXT existentes.'
        )
    },
    {
        title: 'SAMUEL',
        featured: false,
        stack: 'C++ · DirectXTex',
        date: '2024',
        url: 'https://github.com/brongo/SAMUEL/pull/44',
        description: pair(
            'I switched Linux texture export to DirectXTex with libpng and fixed heap corruption in this DOOM Eternal asset extractor.',
            'Migré la exportación de texturas en Linux a DirectXTex con libpng y corregí un problema de corrupción de memoria en este extractor de recursos de DOOM Eternal.'
        )
    },
    {
        title: 'Hyprland',
        featured: false,
        stack: 'C++ · Input',
        date: '2022',
        url: 'https://github.com/hyprwm/Hyprland/pull/195',
        description: pair(
            'I added a separate natural-scrolling setting for touchpads, so it could be configured independently of the mouse.',
            'Agregué una opción de desplazamiento natural para el touchpad independiente de la configuración del ratón.'
        )
    }
];

export const copy = {
    en: {
        nav: ['Work', 'Open source', 'Background', 'Contact'],
        skip: 'Skip to content',
        language: 'Language',
        intro: 'Backend, cloud & systems.',
        lead: 'I build backend and cloud systems, contribute to open source, and participate in cybersecurity competitions.',
        identity: 'Software Engineering · Anáhuac Mayab · Class of 2028',
        cv: 'Download CV',
        work: 'Selected work',
        filters: ['All work', 'Backend', 'Cloud & AI', 'Systems'],
        context: 'The problem',
        decisions: 'Engineering decisions',
        outcome: 'The result',
        private: 'Institutional project · private source',
        diagram: 'Architecture overview',
        production: 'Operational workflows',
        integrity: 'Idempotent payments · transactions · regression tests',
        oss: 'Upstream contributions',
        merged: 'Merged upstream',
        patch: 'View patch',
        extractor: 'Memory-mapped DOOM Eternal archive extraction in C++ for Linux and Windows.',
        cic: 'Institutional website built with Svelte, PHP and Sanity CMS.',
        experience: 'Experience & leadership',
        education: 'Education',
        skills: 'Technical toolkit',
        recognition: 'Certifications & competitions',
        roles: [
            {
                org: 'Centro Universitario de Formación Artística',
                role: 'Software Engineer',
                date: 'Feb 2025 - present',
                text: 'I’m the sole developer of CUFA’s academic and financial platform. I meet with users weekly and handle design, implementation, testing, and deployment.'
            },
            {
                org: 'AWS Student Builder Group · Anáhuac Mayab',
                role: 'Director of Technology',
                date: 'Feb 2026 - present',
                text: 'I lead cloud architecture initiatives and mentor members on practical projects. I also developed and taught an AWS workshop on AI agents for 30 students.'
            },
            {
                org: 'Southeastern Mexican Model UN',
                role: 'Secretary-General',
                date: 'May 2026 - present',
                text: 'I serve as Secretary-General and lead development of the conference’s registration platform.'
            }
        ],
        degree: 'B.S. in Software Engineering',
        school: 'Anáhuac Mayab University',
        schoolDate: 'Aug 2024 - May 2028',
        scholarship: 'Full-ride Academic Excellence Scholarship',
        gpa: '9.8/10 GPA',
        skillLabels: ['Programming languages', 'Cloud & tools', 'Frameworks & databases'],
        awards: [
            ['Associate Cloud Engineer', 'Apr 2026', 'Google Cloud · Certification'],
            [
                'AWS Certified Cloud Practitioner (CLF-C02)',
                'Jan 2026',
                'Amazon Web Services · Certification'
            ],
            ['HackDef 10 CTF', 'Aug 2026', 'Finalist · top 10 teams nationally'],
            ['AHAU CTF 2026', 'Aug 2026', '2nd place · 20+ teams, southeastern Mexico'],
            ['OEA Cyber Challenge Mexico 2025', 'Oct 2025', '1st place · 50+ teams']
        ],
        writeups: 'CTF write-ups',
        contactTitle: 'Get in touch',
        contactLead:
            'I’m looking for an internship in backend development, cloud infrastructure, systems engineering, or cybersecurity. I’m based in Mérida, Mexico.',
        email: 'Email',
        resumes: 'CV',
        photoAlt: 'Bruno Ancona speaking at a podium.',
        description:
            'Bruno Ancona, software engineering student in Mérida, Mexico. Backend and cloud projects, a Rust mod manager, and contributions to Linux and DirectXTex.'
    },
    es: {
        nav: ['Proyectos', 'Open source', 'Trayectoria', 'Contacto'],
        skip: 'Ir al contenido',
        language: 'Idioma',
        intro: 'Backend, cloud y sistemas.',
        lead: 'Desarrollo sistemas de backend y cloud, contribuyo a proyectos de código abierto y participo en competencias de ciberseguridad.',
        identity: 'Ingeniería de Software · Anáhuac Mayab · Generación 2028',
        cv: 'Descargar CV',
        work: 'Proyectos seleccionados',
        filters: ['Todos', 'Backend', 'Cloud e IA', 'Sistemas'],
        context: 'El problema',
        decisions: 'Decisiones de ingeniería',
        outcome: 'El resultado',
        private: 'Proyecto institucional · código privado',
        diagram: 'Vista de arquitectura',
        production: 'Flujos operativos',
        integrity: 'Pagos idempotentes · transacciones · pruebas de regresión',
        oss: 'Contribuciones upstream',
        merged: 'Integrado upstream',
        patch: 'Ver contribución',
        extractor:
            'Extracción de archivos de DOOM Eternal con mapeo de memoria en C++ para Linux y Windows.',
        cic: 'Sitio institucional desarrollado con Svelte, PHP y Sanity CMS.',
        experience: 'Experiencia y liderazgo',
        education: 'Educación',
        skills: 'Herramientas técnicas',
        recognition: 'Certificaciones y competencias',
        roles: [
            {
                org: 'Centro Universitario de Formación Artística',
                role: 'Ingeniero de Software',
                date: 'Feb 2025 - presente',
                text: 'Soy el único desarrollador de la plataforma académica y financiera de CUFA. Me reúno con los usuarios cada semana y me encargo del diseño, desarrollo, pruebas y despliegue.'
            },
            {
                org: 'AWS Student Builder Group · Anáhuac Mayab',
                role: 'Director de Tecnología',
                date: 'Feb 2026 - presente',
                text: 'Lidero iniciativas de arquitectura cloud y asesoro a los miembros en proyectos prácticos. También desarrollé e impartí un taller de agentes de IA en AWS para 30 estudiantes.'
            },
            {
                org: 'Modelo de Naciones Unidas del Sureste Mexicano',
                role: 'Secretario General',
                date: 'May 2026 - presente',
                text: 'Soy Secretario General y lidero el desarrollo de la plataforma de registros del congreso.'
            }
        ],
        degree: 'Ingeniería de Software',
        school: 'Universidad Anáhuac Mayab',
        schoolDate: 'Ago 2024 - May 2028',
        scholarship: 'Beca de Excelencia Académica del 100%',
        gpa: 'Promedio de 9.8/10',
        skillLabels: [
            'Lenguajes de programación',
            'Nube y herramientas',
            'Frameworks y bases de datos'
        ],
        awards: [
            ['Associate Cloud Engineer', 'Abr 2026', 'Google Cloud · Certificación'],
            [
                'AWS Certified Cloud Practitioner (CLF-C02)',
                'Ene 2026',
                'Amazon Web Services · Certificación'
            ],
            ['HackDef 10 CTF', 'Ago 2026', 'Finalista · entre los 10 mejores equipos nacionales'],
            ['AHAU CTF 2026', 'Ago 2026', '2.º lugar · 20+ equipos del sureste de México'],
            ['OEA Cyber Challenge México 2025', 'Oct 2025', '1.er lugar · 50+ equipos']
        ],
        writeups: 'Write-ups de CTF',
        contactTitle: 'Contacto',
        contactLead:
            'Busco oportunidades de prácticas en desarrollo de backend, infraestructura cloud, ingeniería de sistemas o ciberseguridad. Vivo en Mérida, México.',
        email: 'Correo',
        resumes: 'CV',
        photoAlt: 'Bruno Ancona hablando en un podio.',
        description:
            'Bruno Ancona, estudiante de ingeniería de software en Mérida, México. Proyectos de backend y cloud, un gestor de mods en Rust y contribuciones a Linux y DirectXTex.'
    }
};

export const skills = [
    ['C', 'C++', 'Rust', 'Python', 'JavaScript', 'Go', 'PHP', 'Java', 'C#', 'SQL'],
    ['Google Cloud', 'AWS', 'Docker', 'Terraform', 'GitHub Actions', 'Linux'],
    ['FastAPI', 'SvelteKit', 'Laravel', 'Flutter', 'PostgreSQL']
];

export function localized(value, language) {
    return typeof value === 'object' && value !== null && !Array.isArray(value)
        ? value[language]
        : value;
}
