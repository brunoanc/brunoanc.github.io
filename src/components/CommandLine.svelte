<script>
    import { tick } from 'svelte';
    import { CornerDownLeft, ListEnd } from '@lucide/svelte';
    import { complete } from '../terminal.js';
    import { terminalCopy } from '../data/terminal-copy.js';

    export let language;
    export let cwd;
    export let history;
    export let run;
    export let clear;
    export let cancel;
    let input;
    let value = '';
    let draft = '';
    let historyIndex = -1;
    let suggestions = [];
    let completionArmed = false;
    let feedback = '';
    let focused = false;
    let composing = false;
    let inputScroll = 0;

    $: s = terminalCopy[language];
    $: path = cwd.replace('/home/bruno', '~');
    $: prediction = suggestions[0]?.startsWith(value) ? suggestions[0].slice(value.length) : '';

    export function focus() {
        input?.focus({ preventScroll: true });
    }

    export function resetNavigation() {
        historyIndex = -1;
        resetCompletion();
    }

    function resetCompletion() {
        suggestions = [];
        completionArmed = false;
        feedback = '';
    }

    function predict() {
        resetCompletion();

        if (
            composing ||
            !value.trim() ||
            input.selectionStart !== value.length ||
            input.selectionEnd !== value.length
        ) {
            return;
        }

        suggestions = complete(value, cwd).filter((suggestion) => suggestion !== value);
    }

    function onInput(event) {
        value = event.currentTarget.value;
        historyIndex = -1;

        if (event.isComposing) {
            resetCompletion();
        }
        else {
            predict();
        }
    }

    function hidePredictionWhenEditing() {
        if (input.selectionStart !== value.length || input.selectionEnd !== value.length) {
            resetCompletion();
        }
    }

    async function moveCursor(position) {
        await tick();
        input.setSelectionRange(position, position);
    }

    function submit(event) {
        event.preventDefault();

        if (!value.trim()) {
            return;
        }

        run(value);
        value = '';
        draft = '';
        historyIndex = -1;
        resetCompletion();
        focus();
    }

    function autocomplete() {
        suggestions = complete(value, cwd);
        completionArmed = true;

        if (suggestions.length === 1) {
            value = `${suggestions[0]}${suggestions[0].endsWith('/') ? '' : ' '}`;
            suggestions = [];
            feedback = 'tabHint';
            moveCursor(value.length);
        }
        else {
            feedback = suggestions.length ? 'matches' : 'noMatches';
        }
    }

    function chooseSuggestion(suggestion) {
        value = `${suggestion}${suggestion.endsWith('/') ? '' : ' '}`;
        resetCompletion();
        focus();
        moveCursor(value.length);
    }

    function onKey(event) {
        if (event.isComposing) {
            return;
        }

        if (
            event.key === 'ArrowRight' &&
            !event.shiftKey &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.altKey &&
            prediction &&
            input.selectionStart === value.length &&
            input.selectionEnd === value.length
        ) {
            event.preventDefault();
            chooseSuggestion(suggestions[0]);
            return;
        }

        if (
            event.key === 'Tab' &&
            !event.shiftKey &&
            !event.ctrlKey &&
            !event.metaKey &&
            !event.altKey
        ) {
            if (!completionArmed && input.selectionStart === value.length && value.trim()) {
                event.preventDefault();
                autocomplete();
            }
            else {
                resetCompletion();
            }

            return;
        }

        if (event.key === 'Escape') {
            resetCompletion();
            return;
        }

        if (event.ctrlKey && !event.altKey && !event.metaKey) {
            const key = event.key.toLowerCase();
            const start = input.selectionStart;
            const end = input.selectionEnd;

            if (key === 'c' && (start !== end || window.getSelection()?.toString())) {
                return;
            }

            if (!['l', 'c', 'a', 'e', 'u', 'k'].includes(key)) {
                return;
            }

            event.preventDefault();
            resetCompletion();

            if (key === 'l') {
                clear();
            }

            if (key === 'c') {
                cancel(value);
                value = '';
                draft = '';
                historyIndex = -1;
            }

            if (key === 'a') {
                moveCursor(0);
            }

            if (key === 'e') {
                moveCursor(value.length);
            }

            if (key === 'u') {
                value = value.slice(end);
                moveCursor(0);
            }

            if (key === 'k') {
                value = value.slice(0, start);
            }

            return;
        }

        if (
            !event.ctrlKey &&
            !event.metaKey &&
            !event.altKey &&
            ['ArrowUp', 'ArrowDown'].includes(event.key)
        ) {
            event.preventDefault();
            resetCompletion();

            if (!history.length) {
                return;
            }

            if (event.key === 'ArrowUp') {
                if (historyIndex === -1) {
                    draft = value;
                    historyIndex = history.length;
                }

                historyIndex = Math.max(0, historyIndex - 1);
                value = history[historyIndex];
            }
            else if (historyIndex !== -1) {
                historyIndex++;

                if (historyIndex >= history.length) {
                    historyIndex = -1;
                    value = draft;
                }
                else {
                    value = history[historyIndex];
                }
            }

            moveCursor(value.length);
        }
    }
</script>

<div class="command-dock">
    {#if suggestions.length}
        <div class="completion-list" role="group" aria-label={s.matches}>
            {#each suggestions as suggestion}
                <button on:click={() => chooseSuggestion(suggestion)}>
                    <code>{suggestion}</code>
                </button>
            {/each}
        </div>
    {/if}

    <form class="command-form" on:submit={submit} aria-label={s.commandMode}>
        <label for="command-input">
            <span class="prompt-host" aria-hidden="true">bruno<span>@portfolio</span></span>

            <span class="prompt-path" aria-hidden="true">{path}</span>
            <span aria-hidden="true">$</span>
            <span class="sr-only">{s.input}</span>
        </label>

        <div class="command-input">
            {#if focused && value.trim() && prediction}
                <div class="command-ghost" aria-hidden="true">
                    <span style={`transform: translateX(-${inputScroll}px)`}><span class="typed-command">{value}</span>{prediction}</span>
                </div>
            {/if}

            <input
                bind:this={input}
                bind:value
                id="command-input"
                type="text"
                autocomplete="off"
                autocapitalize="off"
                autocorrect="off"
                spellcheck="false"
                enterkeyhint="send"
                maxlength="2048"
                placeholder={s.placeholder}
                aria-describedby="command-hint"
                on:keydown={onKey}
                on:keyup={hidePredictionWhenEditing}
                on:input={onInput}
                on:compositionstart={() => {
                    composing = true;
                    resetCompletion();
                }}
                on:compositionend={() => {
                    composing = false;
                    value = input.value;
                    predict();
                }}
                on:focus={() => (focused = true)}
                on:click={predict}
                on:select={hidePredictionWhenEditing}
                on:scroll={() => (inputScroll = input.scrollLeft)}
                on:blur={(event) => {
                    focused = false;
                    completionArmed = false;

                    if (!event.relatedTarget?.closest('.command-dock')) {
                        resetCompletion();
                    }
                }}
            />
        </div>

        <button
            type="button"
            class="icon-button completion-button"
            aria-label={s.complete}
            title={s.complete}
            on:click={() => {
                autocomplete();
                focus();
            }}
        >
            <ListEnd size={19} />
        </button>

        <button class="icon-button submit-command" type="submit" aria-label={s.run} title={s.run}>
            <CornerDownLeft size={19} />
        </button>
    </form>

    <div class="command-hints">
        <span id="command-hint">{s.hint}</span>

        <span class="completion-feedback" aria-live="polite">{feedback ? s[feedback] : ''}</span>
    </div>
</div>
