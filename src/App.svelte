<script>
  import TopNav from './components/TopNav.svelte';
  import Section from './components/Section.svelte';
  import ProjectCard from './components/ProjectCard.svelte';
  import ExperienceItem from './components/ExperienceItem.svelte';
  import SiteFooter from './components/SiteFooter.svelte';

  import { profile } from './data/profile';
  import { certifications } from './data/certifications';
  import { skillGroups } from './data/skills';
  import { experience, education } from './data/experience';
  import { projects } from './data/projects';

  const featuredSlugs = ['smmun', 'cufa-admin-system', 'eternal-mod-manager'];
  const featuredProjects = projects.filter((project) => featuredSlugs.includes(project.slug));

  const navSections = [
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'about', label: 'About' },
    { id: 'cv', label: 'CV' },
    { id: 'contact', label: 'Contact' }
  ];
</script>

<TopNav sections={navSections} github={profile.links.github} />

<main>
  <Section id="home" compact>
    <div class="home-grid">
      <div class="home-copy">
        <h1>{profile.headline}</h1>
        <p class="lead">
          Software engineering student focused on full-stack, cloud, and systems work, with production delivery in education and
          event platforms.
        </p>
        <div class="hero-actions">
          <a class="btn primary" href="#projects">View Projects</a>
          <a class="btn secondary" href="#cv">Download CV</a>
        </div>
      </div>
      <figure class="terminal-preview">
        <img src="code.png" alt="Terminal-style profile snippet with skills and languages." />
      </figure>
    </div>

  </Section>

  <Section id="highlights" title="Highlights">
    <div class="cert-strip" aria-label="Highlights">
      {#each certifications as item}
        <span>
          {#if item.icon === 'cloud'}
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.2 18.5h9a4.3 4.3 0 0 0 .6-8.5 5.7 5.7 0 0 0-11 1.8A3.4 3.4 0 0 0 7.2 18.5Z" fill="currentColor"/></svg>
          {:else if item.icon === 'trophy'}
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 4h10v2h2a1 1 0 0 1 1 1v1a5 5 0 0 1-5 5h-.1A4.5 4.5 0 0 1 13 15.7V18h3v2H8v-2h3v-2.3A4.5 4.5 0 0 1 9.1 13H9a5 5 0 0 1-5-5V7a1 1 0 0 1 1-1h2V4Zm10 4v-.1h1A3 3 0 0 1 15 11h-.1A4.5 4.5 0 0 0 17 8Zm-10-.1V8a4.5 4.5 0 0 0 2.1 3H9a3 3 0 0 1-3-3h1Z" fill="currentColor"/></svg>
          {:else if item.icon === 'shield'}
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 5 6v5c0 4.3 2.6 8.2 7 10 4.4-1.8 7-5.7 7-10V6l-7-3Zm-1 12 6-6 1.4 1.4L11 17.8l-3.4-3.4L9 13l2 2Z" fill="currentColor"/></svg>
          {:else}
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 4 2 9l10 5 8-4v6h2V9L12 4Zm-6 9v3c0 2.2 2.7 4 6 4s6-1.8 6-4v-3l-6 3-6-3Z" fill="currentColor"/></svg>
          {/if}
          {item.label}
        </span>
      {/each}
    </div>
  </Section>

  <Section id="projects" title="Selected Work">
    <p class="section-lead">
      From production web platforms to reverse-engineered systems tools, I focus on practical solutions with measurable impact.
    </p>

    <div class="project-grid">
      {#each featuredProjects as project}
        <ProjectCard {project} compact />
      {/each}
    </div>

    <details class="all-projects">
      <summary>See full project list</summary>
      <div class="project-grid full">
        {#each projects.filter((project) => !project.featured) as project}
          <ProjectCard {project} />
        {/each}
      </div>
    </details>
  </Section>

  <Section id="experience" title="Experience and Leadership">
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

  <Section id="about" title="About">
    <p class="section-lead">
      I enjoy building products that connect user experience with robust engineering underneath. My background combines full-stack
      delivery, cloud community leadership, and systems-level development through open-source tooling.
    </p>

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

  <Section id="cv" title="My CV">
    <p class="section-lead">
      Software engineering student with hands-on experience in full-stack systems, cybersecurity, and systems-level programming.
    </p>
    <div class="cv-actions">
      <a class="btn primary" href="/Bruno-Ancona-CV-English.pdf" download>Download CV (English)</a>
      <a class="btn secondary" href="/Bruno-Ancona-CV-Spanish.pdf" download>Download CV (Spanish)</a>
    </div>
    <div class="cv-grid">
      <article>
        <h3>Current Focus</h3>
        <ul>
          <li>Cloud, backend reliability, and secure software practices.</li>
          <li>Production systems for institutional and event operations.</li>
          <li>Cross-platform tooling and performance-oriented engineering.</li>
        </ul>
      </article>
      <article>
        <h3>Contact</h3>
        <ul>
          <li>{profile.email}</li>
          <li>{profile.phone}</li>
          <li>{profile.location}</li>
        </ul>
      </article>
    </div>
  </Section>

  <Section id="contact" title="Let's build something meaningful" compact>
    <p class="section-lead">{profile.availability}</p>
    <div class="hero-actions">
      <a class="btn primary" href={profile.links.email}>Email Me</a>
      <a class="btn secondary" href={profile.links.linkedin} target="_blank" rel="noreferrer noopener">LinkedIn</a>
    </div>
  </Section>
</main>

<SiteFooter name={profile.name} />
