<script>
    import { onDestroy, onMount } from 'svelte';
    import { _ } from '../i18n';

    export let sections = [];
    export let github = '';
    export let currentLocale = 'en';
    export let setLocale = () => {};

    let menuOpen = false;
    let isMobile = false;
    let menuButton;

    function closeMenu() {
        menuOpen = false;
    }

    function chooseLocale(nextLocale) {
        setLocale(nextLocale);
        closeMenu();
    }

    function handleKeydown(event) {
        if (event.key === 'Escape' && menuOpen) {
            closeMenu();
            menuButton?.focus();
        }
    }

    onMount(() => {
        const mediaQuery = window.matchMedia('(max-width: 820px)');
        const syncViewport = () => {
            isMobile = mediaQuery.matches;
            if (!isMobile) {
                menuOpen = false;
            }
        };

        syncViewport();
        mediaQuery.addEventListener('change', syncViewport);
        return () => mediaQuery.removeEventListener('change', syncViewport);
    });

    $: if (typeof document !== 'undefined') {
        document.body.classList.toggle('menu-open', menuOpen);
    }

    onDestroy(() => {
        if (typeof document !== 'undefined') {
            document.body.classList.remove('menu-open');
        }
    });
</script>

<svelte:window on:keydown={handleKeydown} />

<header class="top-nav">
    <div class="nav-shell">
        <a class="brand mono" href="#home" on:click={closeMenu}>
            <img class="brand-star" src="/assets/space/signal-star.svg" alt="" />
            <span><b>bruno</b>.ancona</span>
        </a>

        <button
            bind:this={menuButton}
            class:open={menuOpen}
            class="menu-toggle"
            type="button"
            aria-label={$_('nav.sections')}
            aria-controls="site-navigation"
            aria-expanded={menuOpen}
            on:click={() => (menuOpen = !menuOpen)}
        >
            <span></span><span></span><span></span>
        </button>

        <div
            id="site-navigation"
            class:open={menuOpen}
            class="nav-panel"
            aria-hidden={isMobile && !menuOpen}
        >
            <nav aria-label={$_('nav.sections')}>
                {#each sections as section}
                    <a
                        class="link mono"
                        href={`#${section.id}`}
                        tabindex={isMobile && !menuOpen ? -1 : undefined}
                        on:click={closeMenu}
                    >
                        {section.label}
                    </a>
                {/each}
            </nav>

            <div class="top-actions">
                <div class="locale-toggle" aria-label={$_('locale.label')}>
                    <button
                        type="button"
                        tabindex={isMobile && !menuOpen ? -1 : undefined}
                        class:active={currentLocale === 'en'}
                        aria-pressed={currentLocale === 'en'}
                        on:click={() => chooseLocale('en')}>{$_('locale.en')}</button
                    >
                    <button
                        type="button"
                        tabindex={isMobile && !menuOpen ? -1 : undefined}
                        class:active={currentLocale === 'es'}
                        aria-pressed={currentLocale === 'es'}
                        on:click={() => chooseLocale('es')}>{$_('locale.es')}</button
                    >
                </div>
                <a
                    class="github mono"
                    href={github}
                    target="_blank"
                    rel="noreferrer noopener"
                    tabindex={isMobile && !menuOpen ? -1 : undefined}
                >
                    GitHub <span aria-hidden="true">↗</span>
                </a>
            </div>
        </div>
    </div>
</header>

{#if menuOpen}
    <button class="nav-scrim" aria-label={$_('nav.close')} on:click={closeMenu}></button>
{/if}
