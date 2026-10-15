<script>
    import { onMount, tick } from 'svelte';
    import { Download, Terminal, CircleHelp, Eraser, ArrowUpRight } from '@lucide/svelte';
    import { copy } from './data/portfolio.js';
    import { terminalCopy } from './data/terminal-copy.js';
    import { locale, setAppLocale } from './i18n.js';
    import {
        execute,
        editors,
        sections,
        commandFor,
        commandForRoute,
        routeFromHash,
        hashFor,
        cvPath
    } from './terminal.js';
    import PortfolioView from './components/PortfolioView.svelte';
    import CommandLine from './components/CommandLine.svelte';
    import VimWindow from './components/VimWindow.svelte';
    import EasterEggOutput from './components/EasterEggOutput.svelte';
    import TrafficLights from './components/TrafficLights.svelte';

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

    let destroying = false;
    let destroyed = false;
    let reloadButton;

    let vimOpen = '';
    let terminalEffect = '';
    let effectTimer;
    let pendingRoute = false;
    let windowState = 'open';
    let expanded = false;
    let reopenButton;
    let vimMinimized = false;
    let editorRestoreButton;

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

    async function followLatest(entryId) {
        await tick();

        if (output && windowState === 'open' && entries.at(-1)?.id === entryId) {
            output.scrollTop = output.scrollHeight;
        }
    }

    function clear() {
        resetTerminalEffect();
        commandLine?.resetNavigation();
        entries = [];
        announcement = s.cleared;
    }

    function resetTerminalEffect() {
        window.clearTimeout(effectTimer);
        terminalEffect = '';
    }

    async function run(command, { fresh = false, updateUrl = true, download = true } = {}) {
        if (destroying || destroyed || (vimOpen && !vimMinimized) || terminalEffect === 'kill') {
            return;
        }

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
        windowState = 'open';
        resetTerminalEffect();

        if (result.destroy) {
            vimOpen = '';
            vimMinimized = false;
            destroying = true;
            announcement = s.destroying;
            return;
        }

        if (result.clear) {
            clear();
            return;
        }

        const entry = { id: serial++, command, path: cwd.replace('/home/bruno', '~'), result };

        entries = fresh ? [entry] : [...entries, entry];

        if (result.egg === 'windows' || result.egg === 'kill') {
            terminalEffect = result.egg;

            effectTimer = window.setTimeout(async () => {
                terminalEffect = '';

                if (result.egg === 'kill') {
                    announcement = result.lines.join('\n');
                    await tick();

                    if (pendingRoute) {
                        await restoreRoute();
                    }

                    commandLine?.focus();
                }
            }, result.egg === 'kill' ? 1800 : 4500);
        }

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

        if (result.vim) {
            vimOpen = result.vim;
            vimMinimized = false;
            announcement = s.vimOpened.replace('{editor}', editors[vimOpen]);
            return;
        }

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

    async function finishDestruction(event) {
        if (event.target !== event.currentTarget) {
            return;
        }

        destroyed = true;
        announcement = s.destroyed;
        await tick();
        reloadButton?.focus();
    }

    async function exitVim() {
        announcement = s.vimExited.replace('{editor}', editors[vimOpen]);
        vimOpen = '';
        vimMinimized = false;
        windowState = 'open';
        await tick();

        if (pendingRoute) {
            await restoreRoute();
        }

        commandLine?.focus();
    }

    function restoreRoute() {
        if ((vimOpen && !vimMinimized) || terminalEffect === 'kill' || windowState !== 'open') {
            pendingRoute = true;
            return;
        }

        pendingRoute = false;
        const route = routeFromHash(window.location.hash);
        const command = commandForRoute(route);

        return run(command, { fresh: true, updateUrl: false, download: false });
    }

    async function hideWindow(state) {
        windowState = state;
        announcement = state === 'closed' ? s.windowClosed : s.windowMinimized;
        await tick();
        reopenButton?.focus();
    }

    async function restoreWindow() {
        windowState = 'open';
        await tick();

        if (pendingRoute) {
            await restoreRoute();
        }

        commandLine?.focus();
    }

    async function toggleExpanded() {
        expanded = !expanded;
        await tick();
        commandLine?.focus();
    }

    async function minimizeVim() {
        vimMinimized = true;
        await tick();

        if (pendingRoute) {
            await restoreRoute();
        }

        editorRestoreButton?.focus();
    }

    onMount(() => {
        commandLine?.focus();

        window.addEventListener('hashchange', restoreRoute);

        return () => {
            window.removeEventListener('hashchange', restoreRoute);
            window.clearTimeout(effectTimer);
        };
    });
</script>

{#if destroyed}
    <main class="deleted-page">
        <code>404 /</code>
        <h1>{s.destroyed}</h1>

        <button class="button" bind:this={reloadButton} on:click={() => window.location.reload()}>
            {s.restore}
        </button>
    </main>
{:else}
    <a
        class="skip-link"
        href="#terminal-output"
        on:click={async (event) => {
            event.preventDefault();

            if (windowState !== 'open') {
                await restoreWindow();
            }

            output?.focus();
        }}
    >{t.skip}</a>

    <div
        class="site-shell"
        class:site-destroying={destroying}
        inert={destroying}
        on:animationend={finishDestruction}
    >
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

            <div
                class="terminal-window"
                class:terminal-expanded={expanded}
                class:terminal-windows={terminalEffect === 'windows'}
                class:terminal-playing-dead={terminalEffect === 'kill'}
                inert={terminalEffect === 'kill'}
                hidden={windowState !== 'open'}
            >
                <div class="terminal-titlebar">
                    <TrafficLights
                        {language}
                        close={() => hideWindow('closed')}
                        minimize={() => hideWindow('minimized')}
                        expand={toggleExpanded}
                        {expanded}
                    />

                    <button
                        class="session-title"
                        on:click={() => commandLine.focus()}
                        title={s.commandMode}
                    >
                        <Terminal size={17} />

                        <span>{terminalEffect === 'windows' ? 'C:\\Users\\Lost>' : `bruno@portfolio: ${cwd.replace('/home/bruno', '~')}`}</span>
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

                            {#if entry.result.egg}
                                <EasterEggOutput
                                    egg={entry.result.egg}
                                    lines={entry.result.lines}
                                    onProgress={() => followLatest(entry.id)}
                                />
                            {:else if entry.result.lines}
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
                    windowsMode={terminalEffect === 'windows'}
                />
            </div>

            {#if windowState !== 'open'}
                <div class="terminal-reopen">
                    <Terminal size={28} />
                    <p>{windowState === 'closed' ? s.windowClosed : s.windowMinimized}</p>

                    <button class="button" bind:this={reopenButton} on:click={restoreWindow}>
                        {windowState === 'closed' ? s.reopenWindow : s.restoreWindow}
                    </button>
                </div>
            {/if}
        </main>

        <footer>
            <span>© {new Date().getFullYear()} Bruno Ancona Sala</span>
        </footer>
    </div>
{/if}

{#if vimOpen}
    <VimWindow {language} editor={vimOpen} minimized={vimMinimized} minimize={minimizeVim} exit={exitVim} />
{/if}

{#if vimOpen && vimMinimized}
    <button
        class="button editor-restore"
        bind:this={editorRestoreButton}
        on:click={() => (vimMinimized = false)}
    >{s.restoreEditor.replace('{editor}', editors[vimOpen])}</button>
{/if}

<div class="sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
