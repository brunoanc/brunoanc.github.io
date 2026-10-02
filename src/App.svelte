<script>
    import { onMount, tick } from 'svelte';
    import { Download, Terminal, CircleHelp, Eraser, ArrowUpRight } from '@lucide/svelte';
    import { copy } from './data/portfolio.js';
    import { terminalCopy } from './data/terminal-copy.js';
    import { locale, setAppLocale } from './i18n.js';
    import {
        execute,
        sections,
        commandFor,
        commandForRoute,
        routeFromHash,
        hashFor,
        cvPath
    } from './terminal.js';
    import PortfolioView from './components/PortfolioView.svelte';
    import CommandLine from './components/CommandLine.svelte';

    let cwd = '/home/bruno';
    let history = [];
    let serial = 0;
    const initial = routeFromHash(window.location.hash);

    let entries = [
        {
            id: serial++,
            command: commandForRoute(initial),
            path: '~',
            result: initial
        }
    ];

    let activeView = initial.view;
    let output;
    let commandLine;
    let announcement = '';

    $: language = $locale === 'es' ? 'es' : 'en';
    $: t = copy[language];
    $: s = terminalCopy[language];

    $: activeSection =
        activeView === 'project'
            ? 'projects'
            : ['skills', 'education', 'achievements'].includes(activeView)
            ? 'experience'
            : activeView === 'cv'
            ? 'contact'
            : activeView;

    $: if (typeof document !== 'undefined') {
        document.documentElement.lang = language;
        document.querySelector('meta[name="description"]')?.setAttribute('content', t.description);

        document
            .querySelector('meta[property="og:description"]')
            ?.setAttribute('content', t.description);
    }

    async function revealLatest(focusOutput = false) {
        await tick();
        const latest = output?.lastElementChild;

        if (!latest) {
            return;
        }

        output.scrollTop = latest.offsetTop;

        if (focusOutput) {
            (entries.length ? latest : output).focus({ preventScroll: true });
        }
    }

    function clear() {
        commandLine?.resetNavigation();
        entries = [];
        announcement = s.cleared;
    }

    async function run(command, { fresh = false, updateUrl = true, download = true } = {}) {
        const nextHistory = [...history, command];
        const result = execute(command, { cwd, language, history: nextHistory });

        if (result.empty) {
            return;
        }

        if (fresh) {
            commandLine?.resetNavigation();
        }

        if (!download) {
            delete result.downloadLocale;
        }

        history = nextHistory;
        announcement = '';

        if (result.clear) {
            clear();
            return;
        }

        const entry = { id: serial++, command, path: cwd.replace('/home/bruno', '~'), result };

        entries = fresh ? [entry] : [...entries, entry];

        if (result.cwd) {
            cwd = result.cwd;
        }

        if (result.view) {
            activeView = result.view;

            if (updateUrl && window.location.hash !== hashFor(result)) {
                window.history.pushState(null, '', hashFor(result));
            }
        }

        if (result.downloadLocale) {
            const link = document.createElement('a');

            link.href = cvPath(result.downloadLocale);
            link.download = '';
            document.body.append(link);
            link.click();
            link.remove();
        }

        await revealLatest(fresh);

        announcement = result.error
            ? `${s.error}: ${s[result.error]} ${result.value || ''}`
            : s.results;
    }

    function navigate(event, command) {
        if (
            event &&
            (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button > 0)
        ) {
            return;
        }

        event?.preventDefault();

        if (!command) {
            const route = routeFromHash(new URL(event.currentTarget.href).hash);

            command = commandForRoute(route);
        }

        run(command, { fresh: true, download: false });
    }

    function cancel(command) {
        entries = [
            ...entries,
            {
                id: serial++,
                command: `${command}^C`,
                path: cwd.replace('/home/bruno', '~'),
                result: {}
            }
        ];

        revealLatest();
    }

    onMount(() => {
        const restoreRoute = () => {
            const route = routeFromHash(window.location.hash);
            const command = commandForRoute(route);

            run(command, { fresh: true, updateUrl: false, download: false });
        };

        window.addEventListener('hashchange', restoreRoute);
        return () => window.removeEventListener('hashchange', restoreRoute);
    });
</script>

<a
    class="skip-link"
    href="#terminal-output"
    on:click={(event) => {
        event.preventDefault();
        output?.focus();
    }}
>{t.skip}</a>

<div class="site-shell">
    <header class="site-header">
        <a
            class="brand"
            href="#about"
            on:click={(event) => navigate(event, 'whoami')}
            aria-label="Bruno Ancona"
        >
            <span class="brand-mark">ba<span>.</span></span>

            <span>Bruno Ancona</span>
        </a>

        <div class="header-tools">
            <div class="language-switch" role="group" aria-label={t.language}>
                <button
                    lang="en"
                    aria-pressed={language === 'en'}
                    on:click={() => setAppLocale('en')}
                >EN</button>

                <span aria-hidden="true">/</span>

                <button
                    lang="es"
                    aria-pressed={language === 'es'}
                    on:click={() => setAppLocale('es')}
                >ES</button>
            </div>

            <a class="header-cv" href={cvPath(language)} download><Download size={15} />CV</a>
        </div>
    </header>

    <main>
        <h1 class="sr-only">Bruno Ancona · {language === 'es' ? 'Portafolio' : 'Portfolio'}</h1>

        <div class="workspace-caption">
            <p>{s.intro}</p>

            <a href="https://github.com/brunoanc" target="_blank" rel="noopener noreferrer">
                GitHub<ArrowUpRight size={13} />
            </a>
        </div>

        <div class="terminal-window">
            <div class="terminal-titlebar">
                <button
                    class="session-title"
                    on:click={() => commandLine.focus()}
                    title={s.commandMode}
                >
                    <Terminal size={17} />

                    <span>bruno@portfolio: {cwd.replace('/home/bruno', '~')}</span>
                </button>

                <div class="window-tools">
                    <button
                        class="icon-button"
                        aria-label={s.help}
                        title={s.help}
                        on:click={(event) => navigate(event, 'help')}
                    >
                        <CircleHelp size={17} />
                    </button>

                    <button
                        class="icon-button"
                        aria-label={s.clear}
                        title={s.clear}
                        on:click={() => {
                            clear();
                            commandLine.focus();
                        }}
                    >
                        <Eraser size={17} />
                    </button>
                </div>
            </div>

            <nav class="section-tabs" aria-label={s.navigation}>
                {#each sections as section, i}
                    <a
                        href={`#${section}`}
                        aria-current={activeSection === section ? 'page' : undefined}
                        on:click={(event) => navigate(event, commandFor(section))}
                    >{s.nav[i]}</a>
                {/each}
            </nav>

            <!-- svelte-ignore a11y_no_noninteractive_tabindex (the scrollback must be keyboard-scrollable) -->
            <div
                class="terminal-output"
                id="terminal-output"
                bind:this={output}
                tabindex="0"
                role="region"
                aria-label={s.output}
            >
                {#each entries as entry (entry.id)}
                    <div class="terminal-entry" tabindex="-1">
                        <p class="echo-command">
                            <span class="prompt-host">bruno<span>@portfolio</span></span>

                            <span class="prompt-path">{entry.path}</span>
                            <span class="prompt-symbol">$</span>
                            <span>{entry.command}</span>
                        </p>

                        {#if entry.result.error}
                            <p class="terminal-error">
                                <span>{s[entry.result.error]}</span>

                                {#if entry.result.value}
                                    <code>{entry.result.value}</code>
                                {/if}
                            </p>
                        {/if}

                        {#if entry.result.lines}
                            <pre class="plain-output">{entry.result.lines.join('\n')}</pre>
                        {/if}

                        {#if entry.result.view}
                            <PortfolioView
                                result={entry.result}
                                {language}
                                {navigate}
                            />
                        {/if}
                    </div>
                {:else}
                    <p class="empty-terminal">{s.ready}</p>
                {/each}
            </div>

            <a
                class="sr-only focus-link"
                href="#terminal-output"
                on:click={(event) => {
                    event.preventDefault();
                    revealLatest(true);
                }}
            >{s.outputFocus}</a>

            <CommandLine
                bind:this={commandLine}
                {language}
                {cwd}
                {history}
                {run}
                {clear}
                {cancel}
            />
        </div>
    </main>

    <footer>
        <span>© {new Date().getFullYear()} Bruno Ancona Sala</span>
    </footer>
</div>

<div class="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
