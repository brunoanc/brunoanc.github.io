<script>
    import { X, Minus, Maximize2, Minimize2 } from '@lucide/svelte';
    import { terminalCopy } from '../data/terminal-copy.js';

    export let language;
    export let close;
    export let minimize;
    export let expand;
    export let expanded = false;

    $: s = terminalCopy[language];
</script>

<div class="traffic-lights" role="group" aria-label={s.windowControls}>
    <button type="button" aria-label={s.closeWindow} title={s.closeWindow} on:click={close}>
        <span class="light red"><X size={8} strokeWidth={3} /></span>
    </button>

    <button type="button" aria-label={s.minimizeWindow} title={s.minimizeWindow} on:click={minimize}>
        <span class="light yellow"><Minus size={8} strokeWidth={3} /></span>
    </button>

    <button
        type="button"
        aria-label={expanded ? s.restoreSize : s.expandWindow}
        title={expanded ? s.restoreSize : s.expandWindow}
        aria-pressed={expanded}
        on:click={expand}
    >
        <span class="light green">
            {#if expanded}
                <Minimize2 size={8} strokeWidth={2.5} />
            {:else}
                <Maximize2 size={8} strokeWidth={2.5} />
            {/if}
        </span>
    </button>
</div>

<style>
    .traffic-lights {
        display: flex;
        align-items: center;
    }

    button {
        display: grid;
        place-items: center;
        width: 24px;
        height: 28px;
        padding: 0;
        border-radius: 5px;
    }

    .light {
        display: grid;
        place-items: center;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        color: rgb(0 0 0 / 65%);
        transition: filter 140ms ease, transform 140ms ease;
    }

    .red {
        background: #ff6058;
    }

    .yellow {
        background: #febc2e;
    }

    .green {
        background: #28c840;
    }

    .light :global(svg) {
        opacity: 0;
        transition: opacity 140ms ease;
    }

    .traffic-lights:hover .light :global(svg),
    .traffic-lights:focus-within .light :global(svg) {
        opacity: 1;
    }

    button:hover .light {
        filter: brightness(1.15);
        transform: scale(1.08);
    }

    button:active .light {
        transform: scale(0.9);
    }

    @media (hover: none) {
        .light :global(svg) {
            opacity: 1;
        }
    }

    @media (max-width: 700px) {
        button {
            height: 32px;
        }
    }
</style>
