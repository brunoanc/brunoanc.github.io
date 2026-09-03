<script>
    export let project;
    export let compact = false;

    $: points = compact ? project.impact.slice(0, 2) : project.impact;
    $: accent = ['#67e3ff', '#ff57b6', '#fdca40', '#ff6b6b'][
        project.slug.split('').reduce((total, letter) => total + letter.charCodeAt(0), 0) % 4
    ];
</script>

<article class="project-card" style={`--card-accent: ${accent}`}>
    <div class="project-index mono">
        <span aria-hidden="true">•</span>
        <span>{project.slug}</span>
    </div>
    <div class="project-header">
        <h3>{project.title}</h3>
        <p class="role mono">{project.role}</p>
    </div>

    <p class="summary">{project.summary}</p>

    <div class="chips">
        {#each project.tags as tag}
            <span>{tag}</span>
        {/each}
    </div>

    <ul>
        {#each points as point}
            <li>{point}</li>
        {/each}
    </ul>

    <div class="stack">
        {#each project.stack as tech}
            <small class="mono">{tech}</small>
        {/each}
    </div>

    {#if project.links.length}
        <div class="links">
            {#each project.links as link}
                <a href={link.href} target="_blank" rel="noreferrer noopener"
                    >{link.label}<span aria-hidden="true"> ↗</span></a
                >
            {/each}
        </div>
    {/if}
</article>
