<script>
    import { onMount } from 'svelte';
    import { terminalCopy } from '../data/terminal-copy.js';
    import { editors } from '../terminal.js';

    export let language;
    export let editor;
    export let exit;
    let dialog;
    let input;
    let command = '';
    let message = '';

    const replies = {
        ':w': 'write',
        ':w!': 'write',
        ':help': 'help',
        ':h': 'help',
        ':undo': 'undo',
        ':u': 'undo',
        ':redo': 'redo',
        ':set number': 'numbers',
        ':set nu': 'numbers',
        ':set nonumber': 'noNumbers',
        ':set nonu': 'noNumbers',
        ':syntax on': 'syntax',
        ':syntax off': 'noSyntax',
        ':version': 'version',
        ':ver': 'version',
        ':ls': 'files',
        ':buffers': 'files',
        ':!ls': 'shell',
        ':terminal': 'terminal',
        ':e': 'edit',
        ':edit': 'edit'
    };

    $: s = terminalCopy[language];
    $: name = editors[editor];

    function escape(event) {
        event?.preventDefault();
        command = '';
        message = s.vimEscape;
        input.focus();
    }

    function submit(event) {
        event.preventDefault();
        const value = command.trim().replace(/\s+/g, ' ');

        if ([':q', ':q!', ':wq', ':wq!', ':x', ':x!', ':qa', ':qa!'].includes(value)) {
            exit();
            return;
        }

        const reply = Object.hasOwn(replies, value) ? replies[value] : null;

        message = reply
            ? s.vimReplies[reply]
            : value
            ? `${s.vimUnknown}: ${value}`
            : s.vimEscape;

        command = '';
        input.focus();
    }

    onMount(() => {
        dialog.showModal();
        input.focus();
    });
</script>

<dialog class="vim-window" bind:this={dialog} aria-labelledby="vim-title" on:cancel={escape}>
    <header class="vim-titlebar">
        <h2 id="vim-title">{editor === 'vim' ? 'VIM - Vi IMproved' : name}</h2>
        <span>[No Name]</span>
    </header>

    <div class="vim-buffer">
        <div class="vim-tildes" aria-hidden="true">{'~\n'.repeat(16)}</div>
        <p>{s.easterEggs.vim}</p>
    </div>

    <div class="vim-statusline">
        <span>[No Name] 0L, 0B</span>
        <span>{s.vimHint}</span>
    </div>

    <p class="vim-message" role="status" aria-live="polite">{message}</p>

    <form class="vim-command" on:submit={submit}>
        <button type="button" class="button" on:click={escape}>Esc</button>

        <label class="sr-only" for="vim-command">{s.vimCommand.replace('{editor}', name)}</label>
        <input
            id="vim-command"
            bind:this={input}
            bind:value={command}
            aria-label={s.vimCommand.replace('{editor}', name)}
            autocomplete="off"
            autocapitalize="off"
            autocorrect="off"
            spellcheck="false"
            maxlength="100"
            enterkeyhint="go"
        />

        <button class="button" type="submit">Enter</button>
    </form>
</dialog>

<style>
    .vim-window {
        width: min(820px, calc(100% - 24px));
        height: min(560px, calc(100dvh - 48px));
        max-height: calc(100dvh - 24px);
        padding: 0;
        border: 1px solid var(--line);
        background: var(--paper);
        color: var(--ink);
        font-family: var(--mono);
    }

    .vim-window[open] {
        display: flex;
        flex-direction: column;
    }

    .vim-window::backdrop {
        background: rgb(0 0 0 / 75%);
    }

    .vim-titlebar,
    .vim-statusline {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 12px 16px;
        background: var(--surface);
        font-size: 12px;
    }

    .vim-titlebar h2 {
        font-size: 14px;
    }

    .vim-buffer {
        display: flex;
        flex: 1;
        min-height: 0;
        overflow: auto;
        gap: 24px;
        padding: 16px;
        font-size: 14px;
    }

    .vim-tildes {
        color: var(--accent);
        white-space: pre;
        line-height: 1.65;
    }

    .vim-message {
        min-height: 44px;
        padding: 8px 16px;
        overflow-wrap: anywhere;
        color: var(--accent);
        font-size: 12px;
    }

    .vim-command {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 8px 16px 16px;
    }

    .vim-command input {
        flex: 1;
        min-width: 0;
        padding: 8px;
        border: 1px solid var(--line);
        background: var(--paper);
        color: var(--ink);
        font-size: 16px;
    }

    .vim-command .button {
        font-family: var(--mono);
    }
</style>
