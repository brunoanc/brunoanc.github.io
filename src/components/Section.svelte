<script>
  export let id = '';
  export let title = '';
  export let eyebrow = '';
  export let compact = false;
</script>

<section {id} class:compact>
  {#if eyebrow}
    <p class="eyebrow">{eyebrow}</p>
  {/if}
  {#if title}
    <h2>{title}</h2>
  {/if}
  <slot />
</section>
