<script>
    export let id = '';
    export let title = '';
    export let eyebrow = '';
    export let compact = false;
</script>

<section {id} class="cosmic-section" class:compact>
    {#if title}
        <img class="section-star" src="/assets/space/signal-star.svg" alt="" aria-hidden="true" />
    {/if}
    {#if eyebrow}
        <p class="eyebrow">{eyebrow}</p>
    {/if}
    {#if title}
        <h2>{title}</h2>
    {/if}
    <slot />
</section>
