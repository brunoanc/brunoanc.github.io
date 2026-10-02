<script>
    import { ArrowUpRight, ArrowRight, ArrowLeft, Download, Check } from '@lucide/svelte';
    import { projects, contributions, copy, skills, localized } from '../data/portfolio.js';
    import { terminalCopy } from '../data/terminal-copy.js';
    import { categories, cvPath } from '../terminal.js';

    export let result;
    export let language;
    export let navigate;
    $: t = copy[language];
    $: s = terminalCopy[language];
    $: l = (value) => localized(value, language);
    $: project = projects.find((item) => item.id === result.projectId);

    $: selected = projects.filter(
        (item) => !result.filter || result.filter === 'all' || item.category === result.filter
    );
</script>

{#if result.view === 'about'}
    <section class="about-view">
        <div class="about-grid">
            <div>
                <h2 class="profile-name">Bruno Ancona<span>.</span></h2>

                <p class="profile-focus">{t.intro}</p>
                <p class="profile-lead">{t.lead}</p>
                <p class="identity">{t.identity}</p>

                <div class="actions">
                    <a
                        class="button primary"
                        href="#projects"
                        on:click={(event) => navigate(event, 'projects')}
                    >{t.nav[0]}<ArrowRight size={16} /></a>

                    <a class="text-link" href={cvPath(language)} download><Download size={16} />{t.cv}</a>
                </div>
            </div>

            <figure class="portrait">
                <div class="portrait-orbit">
                    <img src="/profile.jpg" alt={t.photoAlt} width="220" height="220" />
                </div>

                <figcaption>{s.photoCaption}</figcaption>
            </figure>
        </div>
    </section>
{:else if result.view === 'projects'}
    <section>
        <div class="view-heading">
            <h2>{t.work}</h2>
        </div>

        <div
            class="filters"
            role="group"
            aria-label={language === 'es' ? 'Filtrar proyectos' : 'Filter projects'}
        >
            {#each categories as category, i}
                <button
                    aria-pressed={(result.filter || 'all') === category}
                    on:click={(event) => navigate(event, `projects ${category}`)}
                >{t.filters[i]}</button>
            {/each}
        </div>

        <div class="project-list">
            {#each selected as item}
                <a class="project-row" href={`#${item.id}`} on:click={(event) => navigate(event)}>
                    <span class="row-number">{item.number}</span>

                    <div class="project-row-copy">
                        <h3>{l(item.title)}</h3>
                        <p>{l(item.description)}</p>
                        <span class="stack-text">{item.stack.join(' · ')}</span>
                    </div>

                    <div class="project-row-end">
                        <span>{l(item.result)}</span>
                        <code>open {item.id}</code>

                        <ArrowUpRight size={18} />
                    </div>
                </a>
            {/each}
        </div>

        <div class="additional-work">
            <h3>{s.more}</h3>

            <a
                href="https://github.com/brunoanc/EternalResourceExtractor"
                target="_blank"
                rel="noopener noreferrer"
            >
                <strong>EternalResourceExtractor<ArrowUpRight size={15} /></strong>

                <p>{t.extractor}</p>
            </a>

            <a href="https://cic.org.mx" target="_blank" rel="noopener noreferrer">
                <strong>CIC.org.mx<ArrowUpRight size={15} /></strong>

                <p>{t.cic}</p>
            </a>
        </div>
    </section>
{:else if result.view === 'project' && project}
    <article class="project-detail">
        <a class="text-link back-link" href="#projects" on:click={(event) => navigate(event)}>
            <ArrowLeft size={15} />{s.back}
        </a>

        <div class="view-heading">
            <p class="eyebrow">{l(project.role)}</p>
            <h2>{l(project.title)}</h2>
            <p>{l(project.description)}</p>
        </div>

        <div class="project-facts">
            <strong>{l(project.result)}</strong>
            <span>{project.stack.join(' · ')}</span>
        </div>

        {#if project.image}
            <a
                class="project-image"
                href={project.image}
                target="_blank"
                rel="noopener"
                title={language === 'es' ? 'Ver captura completa' : 'View full screenshot'}
            >
                <img src={project.image} alt={l(project.alt)} />
            </a>
        {:else}
            <div
                class="architecture"
                aria-label={project.visual === 'cloud' ? t.diagram : t.production}
            >
                <span class="eyebrow">{project.visual === 'cloud'
                    ? 'SMMUN / Google Cloud'
                    : 'CUFA / Laravel + PostgreSQL'}</span>

                <ol>
                    {#each l(project.steps) as step}
                        <li>{step}</li>
                    {/each}
                </ol>

                <p>
                    {project.visual === 'cloud'
                        ? language === 'es'
                            ? 'Recepción idempotente · recuperación por checkpoints'
                            : 'Idempotent intake · checkpointed recovery'
                        : t.integrity}
                </p>
            </div>
        {/if}

        <div class="case-study">
            <div>
                <h3>{t.context}</h3>
                <p>{l(project.context)}</p>
            </div>

            <div>
                <h3>{t.decisions}</h3>

                <ul>
                    {#each l(project.decisions) as decision}
                        <li>{decision}</li>
                    {/each}
                </ul>
            </div>

            <div>
                <h3>{t.outcome}</h3>
                <p>{l(project.outcome)}</p>
            </div>
        </div>

        <div class="actions">
            {#each project.links as link}
                <a
                    class="text-link"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                >{l(link.label)}<ArrowUpRight size={16} /></a>
            {/each}

            {#if !project.links.length}
                <span class="muted">{t.private}</span>
            {/if}
        </div>
    </article>
{:else if result.view === 'open-source'}
    <section>
        <div class="view-heading">
            <h2>{t.oss}</h2>
        </div>

        <div class="contributions">
            {#each contributions as contribution}
                <article class:featured={contribution.featured}>
                    <div class="contribution-meta">
                        <span><Check size={14} />{t.merged}</span>

                        <span>{contribution.stack} / {contribution.date}</span>
                    </div>

                    <h3>{contribution.title}</h3>
                    <p>{l(contribution.description)}</p>

                    <a
                        class="text-link"
                        href={contribution.url}
                        target="_blank"
                        rel="noopener noreferrer"
                    >{t.patch}<ArrowUpRight size={16} /></a>
                </article>
            {/each}
        </div>
    </section>
{:else if ['experience', 'education', 'skills', 'achievements'].includes(result.view)}
    <section>
        {#if result.view === 'experience'}
            <div class="view-heading">
                <h2>{t.experience}</h2>
            </div>

            <div class="timeline">
                {#each [...t.roles].reverse() as role}
                    <article>
                        <span class="role-date">{role.date}</span>

                        <div>
                            <h3>{role.role}</h3>
                            <p class="org">{role.org}</p>
                            <p>{role.text}</p>
                        </div>
                    </article>
                {/each}
            </div>
        {/if}

        {#if ['experience', 'education'].includes(result.view)}
            <div class="education content-block">
                <h2>{t.education}</h2>
                <h3>{t.degree}</h3>
                <p>{t.school} · {t.schoolDate}</p>
                <p>{t.gpa} · {t.scholarship}</p>
            </div>
        {/if}

        {#if ['experience', 'skills'].includes(result.view)}
            <div class="skills content-block">
                <h2>{t.skills}</h2>

                {#each skills as group, i}
                    <div>
                        <h3>{t.skillLabels[i]}</h3>
                        <p>{group.join(' · ')}</p>
                    </div>
                {/each}
            </div>
        {/if}

        {#if ['experience', 'achievements'].includes(result.view)}
            <div class="recognition content-block">
                <h2>{t.recognition}</h2>

                <div class="award-list">
                    {#each t.awards as award}
                        <div>
                            <strong>{award[0]}</strong>
                            <span>{award[2]}</span>
                        </div>
                    {/each}
                </div>

                <a
                    class="text-link"
                    href="https://github.com/brunoanc/ahau-ctf-2026-writeups"
                    target="_blank"
                    rel="noopener noreferrer"
                >{t.writeups}<ArrowUpRight size={16} /></a>
            </div>
        {/if}
    </section>
{:else if result.view === 'contact' || result.view === 'cv'}
    <section>
        <div class="view-heading">
            <h2>{result.view === 'contact' ? t.contactTitle : s.downloads}</h2>

            <p>
                {result.view === 'contact'
                    ? t.contactLead
                    : result.downloadLocale
                    ? s.download
                    : ''}
            </p>
        </div>

        {#if result.view === 'contact'}
            <div class="actions social-links">
                <a class="text-link" href="mailto:brunoanconasala@gmail.com">{t.email}<ArrowUpRight size={16} /></a>

                <a
                    class="text-link"
                    href="https://github.com/brunoanc"
                    target="_blank"
                    rel="noopener noreferrer"
                >GitHub<ArrowUpRight size={16} /></a>

                <a
                    class="text-link"
                    href="https://www.linkedin.com/in/banconas"
                    target="_blank"
                    rel="noopener noreferrer"
                >LinkedIn<ArrowUpRight size={16} /></a>
            </div>
        {/if}

        <div class="resume-downloads">
            <h3>{t.resumes}</h3>

            <div class="actions">
                <a class="button" href={cvPath('en')} download lang="en"><Download size={16} />English PDF</a>

                <a class="button" href={cvPath('es')} download lang="es"><Download size={16} />Español PDF</a>
            </div>
        </div>
    </section>
{:else if result.view === 'help'}
    <section class="help-view">
        <div class="view-heading">
            <h2>{s.helpTitle}</h2>
        </div>

        <dl class="help-commands">
            {#each s.helpCommands as [command, description]}
                <div>
                    <dt>
                        <code>{command}</code>
                    </dt>

                    <dd>{description}</dd>
                </div>
            {/each}
        </dl>
    </section>
{/if}
