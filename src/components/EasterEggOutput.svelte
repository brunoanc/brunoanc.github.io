<script>
    import { onMount } from 'svelte';

    export let egg;
    export let lines;
    let shown = egg === 'ping' ? 1 : lines.length;

    onMount(() => {
        if (egg !== 'ping') {
            return;
        }

        const timer = window.setInterval(() => {
            shown++;

            if (shown === lines.length) {
                window.clearInterval(timer);
            }
        }, 600);

        return () => window.clearInterval(timer);
    });
</script>

<pre
    class="plain-output"
    class:ascii-grass={egg === 'grass'}
    class:ascii-cow={egg === 'moo' || egg === 'cowsay'}
    class:terminal-whisper={egg === 'kill'}
    aria-live={egg === 'ping' ? 'polite' : 'off'}
>{lines.slice(0, shown).join('\n')}</pre>
