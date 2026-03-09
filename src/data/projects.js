export const projects = [
  {
    slug: 'smmun',
    title: 'SMMUN.com',
    role: 'Secretary of Finance and Technology / Full-Stack Developer',
    summary:
      'Full-stack event platform for a Model United Nations conference, including a production registration workflow.',
    problem: 'The event required reliable online registration and operational coordination.',
    solution:
      'Built a Svelte frontend with a Python backend and PostgreSQL-backed form pipeline for end-to-end data handling.',
    impact: ['Processed 500 registrations.', 'Reached about 1.4k clicks and 33M impressions.'],
    stack: ['Svelte', 'Python', 'FastAPI', 'PostgreSQL'],
    links: [{ label: 'Live Site', href: 'https://smmun.com' }],
    tags: ['Web', 'Cloud'],
    featured: true
  },
  {
    slug: 'cic',
    title: 'CIC.org.mx',
    role: 'Software Engineering Intern',
    summary: 'Institutional website focused on clear communication and maintainable frontend delivery.',
    problem: 'CIC needed a modern and trustworthy web presence.',
    solution: 'Implemented the frontend with Svelte and supported production publishing.',
    impact: ['Launched public-facing institutional site.', 'Contributed to internship-to-employment progression.'],
    stack: ['Svelte', 'PHP', 'Sanity CMS'],
    links: [{ label: 'Live Site', href: 'https://cic.org.mx' }],
    tags: ['Web'],
    featured: false
  },
  {
    slug: 'cufa-admin-system',
    title: 'CUFA Administrative System',
    role: 'Software Engineer',
    summary: 'Modular administrative platform used by university staff for operational workflows.',
    problem: 'CUFA needed a centralized system for registration, payments, careers, and administration.',
    solution: 'Developed a Laravel + PostgreSQL system used in daily institutional operations.',
    impact: [
      'Handles student registration and payment workflows.',
      'Consolidates critical administrative processes into one platform.'
    ],
    stack: ['Laravel', 'PHP', 'PostgreSQL'],
    links: [],
    tags: ['Web'],
    featured: true
  },
  {
    slug: 'eternal-mod-manager',
    title: 'EternalModManager',
    role: 'Creator / Systems Developer',
    summary: 'Cross-platform mod manager for DOOM Eternal with broad Linux and Windows distribution.',
    problem: 'Most modding tools for the game ecosystem were Windows-only.',
    solution:
      'Built with Rust, GTK4, and libadwaita; distributed through Flathub, Snap, AppImage, AUR, and Windows EXE.',
    impact: ['4.7k+ downloads on Flathub.', 'Enabled cross-platform mod management for the community.'],
    stack: ['Rust', 'GTK4', 'libadwaita'],
    links: [
      { label: 'GitHub', href: 'https://github.com/brunoanc/EternalModManager' },
      { label: 'Flathub', href: 'https://flathub.org/en/apps/io.github.brunoanc.eternalmodmanager' }
    ],
    tags: ['Systems', 'Open Source'],
    featured: true
  },
  {
    slug: 'eternal-resource-extractor',
    title: 'EternalResourceExtractor',
    role: 'Creator / Systems Developer',
    summary: 'High-performance extractor for proprietary DOOM Eternal resource archives.',
    problem: 'Existing approaches were slow and often Windows-only.',
    solution:
      'Reverse-engineered archive details and implemented a C++ extractor using memory-mapped files on Linux and Windows.',
    impact: ['Reduced extraction time to seconds for large archives.', 'Provided a practical cross-platform utility.'],
    stack: ['C++', 'Reverse Engineering', 'Memory mapping'],
    links: [{ label: 'GitHub', href: 'https://github.com/brunoanc/EternalResourceExtractor' }],
    tags: ['Systems', 'Open Source'],
    featured: false
  },
  {
  slug: 'love-app',
  title: 'Flutter Sync App',
  role: 'Mobile Developer',
  summary: 'Cross-platform mobile app exploring Flutter and Firebase, with real-time data sync, push notifications, and cloud-backed state management.',
  problem: 'Wanted hands-on experience building a full mobile stack with real-time sync and notification delivery across platforms.',
  solution: 'Built with Flutter for cross-platform UI and Firebase for Firestore real-time sync, FCM push notifications, and cloud storage.',
  impact: [
    'Implemented end-to-end mobile + backend integration across Android and iOS.',
    'Gained practical experience with reactive data patterns and Firebase service orchestration.'
  ],
  stack: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'FCM'],
  links: [{ label: 'GitHub', href: 'https://github.com/brunoanc/love' }],
  tags: ['Mobile'],
  featured: false
}
];
