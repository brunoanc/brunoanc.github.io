<script>
    import { _ } from 'svelte-i18n';

    export let sections = [];
    export let github = '';
    export let currentLocale = 'en';
    export let setLocale = () => {};
</script>

<header class="top-nav">
    <div class="top-row">
        <a class="brand" href="#home">Bruno Ancona</a>
        <div class="top-actions">
            <div class="locale-toggle" aria-label={$_('locale.label')}>
                <button
                    type="button"
                    class:active={currentLocale === 'en'}
                    on:click={() => setLocale('en')}>{$_('locale.en')}</button
                >
                <button
                    type="button"
                    class:active={currentLocale === 'es'}
                    on:click={() => setLocale('es')}>{$_('locale.es')}</button
                >
            </div>
            <a class="github" href={github} target="_blank" rel="noreferrer noopener">GitHub</a>
        </div>
    </div>

    <nav aria-label={$_('nav.sections')}>
        {#each sections as section}
            <a class="link" href={`#${section.id}`}>{section.label}</a>
        {/each}
    </nav>
</header>
