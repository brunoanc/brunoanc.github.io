<script>
  export let sections = [];
  export let github = '';
</script>

<header class="top-nav">
  <div class="top-row">
    <a class="brand" href="#home">Bruno Ancona</a>
    <a class="github" href={github} target="_blank" rel="noreferrer noopener">GitHub</a>
  </div>

  <nav aria-label="Sections">
    {#each sections as section}
      <a class="link" href={`#${section.id}`}>{section.label}</a>
    {/each}
  </nav>
</header>
