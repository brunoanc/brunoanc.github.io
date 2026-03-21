<script>
    import { _, locale } from 'svelte-i18n';

    import TopNav from './components/TopNav.svelte';
    import Section from './components/Section.svelte';
    import ProjectCard from './components/ProjectCard.svelte';
    import ExperienceItem from './components/ExperienceItem.svelte';
    import SiteFooter from './components/SiteFooter.svelte';

    import { setAppLocale } from './i18n';
    import { content } from './data/content';

    const featuredSlugs = ['smmun', 'cufa-admin-system', 'eternal-mod-manager'];

    $: currentLocale = $locale === 'es' ? 'es' : 'en';
    $: localized = content[currentLocale];
    $: profile = localized.profile;
    $: certifications = localized.certifications;
    $: skillGroups = localized.skillGroups;
    $: experience = localized.experience;
    $: education = localized.education;
    $: projects = localized.projects;
    $: aboutLead = localized.aboutLead;
    $: cvFocusItems = localized.cvFocusItems;
    $: featuredProjects = projects.filter((project) => featuredSlugs.includes(project.slug));
    $: navSections = [
        { id: 'projects', label: $_('nav.projects') },
        { id: 'experience', label: $_('nav.experience') },
        { id: 'about', label: $_('nav.about') },
        { id: 'cv', label: $_('nav.cv') },
        { id: 'contact', label: $_('nav.contact') }
    ];

    $: if (typeof document !== 'undefined') {
        document.documentElement.lang = currentLocale;
    }
</script>

<TopNav
    sections={navSections}
    github={profile.links.github}
    {currentLocale}
    setLocale={setAppLocale}
/>

<main>
    <Section id="home" compact>
        <div class="home-grid">
            <div class="home-copy">
                <h1>{profile.headline}</h1>
                <p class="lead">{$_('home.lead')}</p>
                <div class="hero-actions">
                    <a class="btn primary" href="#projects">{$_('actions.viewProjects')}</a>
                    <a class="btn secondary" href="#cv">{$_('actions.viewCv')}</a>
                </div>
            </div>
            <figure class="terminal-preview">
                <img src="code.png" alt={$_('home.imageAlt')} />
            </figure>
        </div>
    </Section>

    <Section id="highlights" title={$_('sections.highlights')}>
        <div class="cert-strip" aria-label={$_('highlights.aria')}>
            {#each certifications as item}
                <span>
                    {#if item.icon === 'cloud'}
                        <svg viewBox="0 0 24 24" aria-hidden="true"
                            ><path
                                d="M7.2 18.5h9a4.3 4.3 0 0 0 .6-8.5 5.7 5.7 0 0 0-11 1.8A3.4 3.4 0 0 0 7.2 18.5Z"
                                fill="currentColor"
                            /></svg
                        >
                    {:else if item.icon === 'trophy'}
                        <svg viewBox="0 0 24 24" aria-hidden="true"
                            ><path
                                d="M7 4h10v2h2a1 1 0 0 1 1 1v1a5 5 0 0 1-5 5h-.1A4.5 4.5 0 0 1 13 15.7V18h3v2H8v-2h3v-2.3A4.5 4.5 0 0 1 9.1 13H9a5 5 0 0 1-5-5V7a1 1 0 0 1 1-1h2V4Zm10 4v-.1h1A3 3 0 0 1 15 11h-.1A4.5 4.5 0 0 0 17 8Zm-10-.1V8a4.5 4.5 0 0 0 2.1 3H9a3 3 0 0 1-3-3h1Z"
                                fill="currentColor"
                            /></svg
                        >
                    {:else if item.icon === 'shield'}
                        <svg viewBox="0 0 24 24" aria-hidden="true"
                            ><path
                                d="M12 3 5 6v5c0 4.3 2.6 8.2 7 10 4.4-1.8 7-5.7 7-10V6l-7-3Zm-1 12 6-6 1.4 1.4L11 17.8l-3.4-3.4L9 13l2 2Z"
                                fill="currentColor"
                            /></svg
                        >
                    {:else}
                        <svg viewBox="0 0 24 24" aria-hidden="true"
                            ><path
                                d="M12 4 2 9l10 5 8-4v6h2V9L12 4Zm-6 9v3c0 2.2 2.7 4 6 4s6-1.8 6-4v-3l-6 3-6-3Z"
                                fill="currentColor"
                            /></svg
                        >
                    {/if}
                    {item.label}
                </span>
            {/each}
        </div>
    </Section>

    <Section id="projects" title={$_('sections.work')}>
        <p class="section-lead">{$_('projects.lead')}</p>

        <div class="project-grid">
            {#each featuredProjects as project}
                <ProjectCard {project} compact />
            {/each}
        </div>

        <details class="all-projects">
            <summary>{$_('projects.all')}</summary>
            <div class="project-grid full">
                {#each projects.filter((project) => !project.featured) as project}
                    <ProjectCard {project} />
                {/each}
            </div>
        </details>
    </Section>

    <Section id="experience" title={$_('sections.experience')}>
        <div class="experience-list timeline">
            {#each experience as item}
                <ExperienceItem {item} />
            {/each}
        </div>

        <article class="education-card">
            <h3>{education.degree}</h3>
            <p>{education.org} · {education.period}</p>
            <ul>
                {#each education.notes as note}
                    <li>{note}</li>
                {/each}
            </ul>
        </article>
    </Section>

    <Section id="about" title={$_('sections.about')}>
        <p class="section-lead">{aboutLead}</p>

        <div class="skills-grid">
            {#each skillGroups as group}
                <article>
                    <h3>{group.title}</h3>
                    <ul>
                        {#each group.items as skill}
                            <li>{skill}</li>
                        {/each}
                    </ul>
                </article>
            {/each}
        </div>
    </Section>

    <Section id="cv" title={$_('sections.cv')}>
        <p class="section-lead">{$_('cv.lead')}</p>
        <div class="cv-actions">
            <a class="btn primary" href="/Bruno-Ancona-CV-English.pdf" download
                >{$_('cv.downloadEn')}</a
            >
            <a class="btn secondary" href="/Bruno-Ancona-CV-Spanish.pdf" download
                >{$_('cv.downloadEs')}</a
            >
        </div>
        <div class="cv-grid">
            <article>
                <h3>{$_('cv.focus')}</h3>
                <ul>
                    {#each cvFocusItems as item}
                        <li>{item}</li>
                    {/each}
                </ul>
            </article>
            <article>
                <h3>{$_('cv.contact')}</h3>
                <ul>
                    <li>{profile.email}</li>
                    <li>{profile.phone}</li>
                    <li>{profile.location}</li>
                </ul>
            </article>
        </div>
    </Section>

    <Section id="contact" title={$_('sections.contact')} compact>
        <p class="section-lead">{$_('contact.lead')}</p>
        <div class="hero-actions">
            <a class="btn primary" href={profile.links.email}>{$_('contact.email')}</a>
            <a
                class="btn secondary"
                href={profile.links.linkedin}
                target="_blank"
                rel="noreferrer noopener">{$_('contact.linkedin')}</a
            >
        </div>
    </Section>
</main>

<SiteFooter name={profile.name} backToTopLabel={$_('footer.top')} />
