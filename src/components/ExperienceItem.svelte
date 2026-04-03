<script>
    export let item;
</script>

<article class="experience-item">
    <div class="top-row">
        <h3>{item.role}</h3>
        <p class="mono">{item.period}</p>
    </div>
    <p class="org mono">{item.org}</p>

    <ul>
        {#each item.highlights as highlight}
            <li>{highlight}</li>
        {/each}
    </ul>

    <div class="chips">
        {#each item.tags as tag}
            <span>{tag}</span>
        {/each}
    </div>
</article>
