<script>
    export let project;
    export let compact = false;

    $: points = compact ? project.impact.slice(0, 2) : project.impact;
</script>

<article class="project-card">
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
                <a href={link.href} target="_blank" rel="noreferrer noopener">{link.label}</a>
            {/each}
        </div>
    {/if}
</article>
