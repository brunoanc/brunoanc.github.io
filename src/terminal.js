import { projects } from './data/portfolio.js';
import { terminalCopy } from './data/terminal-copy.js';

export const sections = ['about', 'projects', 'open-source', 'experience', 'contact'];
export const categories = ['all', 'backend', 'cloud', 'systems'];
export const editors = { vi: 'vi', vim: 'Vim', nvim: 'Neovim' };

export const commands = [
    'help',
    'whoami',
    'projects',
    'open',
    'experience',
    'skills',
    'education',
    'achievements',
    'oss',
    'contact',
    'cv',
    'ls',
    'cd',
    'pwd',
    'history',
    'echo',
    'clear'
];

const aliases = {
    about: 'whoami',
    work: 'projects',
    background: 'experience',
    'open-source': 'oss'
};

const views = {
    whoami: 'about',
    projects: 'projects',
    experience: 'experience',
    skills: 'skills',
    education: 'education',
    achievements: 'achievements',
    oss: 'open-source',
    contact: 'contact',
    help: 'help'
};

const easterEggArt = {
    sandwich: [
        '     ___________',
        '    /___________\\',
        '    ~~~~~~~~~~~~~',
        '    =============',
        '    \\___________/',
        ''
    ],
    grass: [
        '  \\|/   \\|/  \\|/   \\|/  \\|/',
        '   |  \\|/ |    | \\|/ |    |',
        '___|___|__|____|__|__|____|___',
        ''
    ],
    '67': ['   __   _____', '  / /  |___ /', ' / _ \\    / /', ' \\___/   /_/', ''],
    forkbomb: [
        '               :',
        '       /               \\',
        '       :               :',
        '   /       \\       /       \\',
        '   :       :       :       :',
        ' /   \\   /   \\   /   \\   /   \\',
        ' :   :   :   :   :   :   :   :',
        ''
    ],
    iddqd: [],
    codex: [
        '  .-----------------.',
        '  | >_ codex        |',
        '  |                 |',
        '  | + easter egg    |',
        '  | - free time     |',
        "  '-----------------'",
        ''
    ],
    claude: [
        '     .----------.',
        '  ___|  o    o  |___',
        ' /   |  claude  |   \\',
        "     '----------'",
        '      | |    | |',
        ''
    ],
    coffee: ['   ( (', '    ) )', '  .----.', '  |    |]', "  '----'", ''],
    launch: ['    /\\', '   /  \\', '   |()|', '   |  |', '  /|  |\\', ' /_||||_\\', '    /\\', ''],
    sl: [
        '       (  ) ( ) ( )',
        '      ( )  ( ) ( )',
        '     ____          ______',
        '    _|  |_________|  []  |',
        '   (                 ___|',
        '  /|________________|   |',
        ' /_   O==O==O==O      O |',
        '==========================',
        ''
    ],
    neofetch: [
        '    .--.',
        '   |o_o |',
        '   |:_/ |',
        '  //   \\ \\',
        ' (|     | )',
        "/'\\_   _/`\\",
        '\\___)=(___/',
        ''
    ]
};

const easterEggCommands = {
    'make me a sandwich': 'sandwichDenied',
    'sudo make me a sandwich': 'sandwich',
    exit: 'exit',
    'git blame': 'blame',
    'npm install': 'install',
    ping: 'ping',
    'docker ps': 'docker',
    'chmod 777 /': 'chmod',
    'man woman': 'man',
    'touch grass': 'grass',
    'kill -9 $$': 'kill',
    'git status': 'gitStatus',
    Windows: 'windows',
    windows: 'windows',
    cls: 'windows'
};

const directories = ['projects', 'experience', 'open-source', 'contact'];
const directoryPaths = ['/home/bruno', ...directories.map((dir) => `/home/bruno/${dir}`)];

export const cvPath = (language) =>
    `/Bruno-Ancona-CV-${language === 'es' ? 'Spanish' : 'English'}.pdf`;

export const commandFor = (view) =>
    view === 'about' ? 'whoami' : view === 'open-source' ? 'oss' : view;

export function tokenize(line) {
    const words = [];

    let word = '',
        quote = '',
        escaped = false,
        started = false;

    for (const char of line) {
        if (escaped) {
            word += char;
            escaped = false;
        }
        else if (char === '\\' && quote !== "'") {
            escaped = true;
            started = true;
        }
        else if (quote) {
            if (char === quote) {
                quote = '';
            }
            else {
                word += char;
            }
        }
        else if (char === '"' || char === "'") {
            quote = char;
            started = true;
        }
        else if (/\s/.test(char)) {
            if (started) {
                words.push(word);
            }

            word = '';
            started = false;
        }
        else {
            word += char;
            started = true;
        }
    }

    if (quote || escaped) {
        return { error: 'unfinishedQuote' };
    }

    if (started) {
        words.push(word);
    }

    return { words };
}

function resolveDirectory(path, cwd) {
    const absolute = path.startsWith('/')
        ? path
        : path.startsWith('~')
            ? `/home/bruno${path.slice(1)}`
            : `${cwd}/${path}`;

    const parts = [];

    for (const part of absolute.split('/')) {
        if (part === '..') {
            parts.pop();
        }
        else if (part && part !== '.') {
            parts.push(part);
        }
    }

    return `/${parts.join('/')}`;
}

export function execute(line, { cwd = '/home/bruno', language = 'en', history = [] } = {}) {
    const parsed = tokenize(line);

    if (parsed.error) {
        return { error: parsed.error };
    }

    const [raw, ...args] = parsed.words;

    if (!raw) {
        return { empty: true };
    }

    const sixSeven = raw === 'six' && args.length === 1 && args[0] === 'seven';
    const forkbomb = line.replace(/\s/g, '') === ':(){:|:&};:';

    const command = forkbomb
        ? 'forkbomb'
        : sixSeven
            ? '67'
            : Object.hasOwn(aliases, raw)
                ? aliases[raw]
                : raw;

    const usage = (value) => ({ error: 'usage', value });
    const removal = removalAttempt(parsed.words, cwd);
    const phrase = parsed.words.join(' ');

    if (Object.hasOwn(easterEggCommands, phrase)) {
        const egg = easterEggCommands[phrase];
        const text = terminalCopy[language === 'es' ? 'es' : 'en'].easterEggs[egg];

        return { egg, lines: [...(easterEggArt[egg] || []), ...text.split('\n')] };
    }

    if (removal) {
        if (removal.sudo && removal.noPreserveRoot) {
            return { destroy: true };
        }

        const key = !removal.sudo && !removal.noPreserveRoot
            ? 'rmMissingBoth'
            : !removal.sudo
                ? 'rmNoSudo'
                : 'rmProtectedRoot';

        return { lines: [terminalCopy[language === 'es' ? 'es' : 'en'].easterEggs[key]] };
    }

    if (Object.hasOwn(editors, command)) {
        return args.length ? usage(command) : { vim: command };
    }

    if (Object.hasOwn(easterEggArt, command)) {
        if (args.length && !sixSeven && !forkbomb) {
            return usage(command);
        }

        const text = terminalCopy[language === 'es' ? 'es' : 'en'].easterEggs[command];

        return { lines: [...easterEggArt[command], text] };
    }

    if (command === 'projects') {
        if (args.length > 1 || (args[0] && !categories.includes(args[0]))) {
            return usage('projects [all|backend|cloud|systems]');
        }

        return { view: 'projects', filter: args[0] || 'all' };
    }

    if (command === 'open') {
        if (args.length !== 1) {
            return usage('open <project-id>');
        }

        const id = args[0].replace(/^(~\/)?projects\//, '').replace(/\/$/, '');

        return projects.some((p) => p.id === id)
            ? { view: 'project', projectId: id }
            : { error: 'noProject', value: args[0] };
    }

    if (command === 'cv') {
        if (
            args.length &&
            (args.length !== 2 || args[0] !== '--lang' || !['en', 'es'].includes(args[1]))
        ) {
            return usage('cv [--lang en|es]');
        }

        return { view: 'cv', downloadLocale: args[1] || language };
    }

    if (command === 'cd' || command === 'ls') {
        if (args.length > 1) {
            return usage(`${command} [directory]`);
        }

        const path = resolveDirectory(args[0] ?? (command === 'cd' ? '~' : '.'), cwd);
        const relative = path.replace('/home/bruno', '');

        if (!directoryPaths.includes(path)) {
            return { error: 'noDirectory', value: args[0] || path };
        }

        if (command === 'cd') {
            return { cwd: path };
        }

        if (path === '/home/bruno') {
            return { lines: directories.map((dir) => `${dir}/`) };
        }

        return { view: relative.slice(1), filter: 'all' };
    }

    if (command === 'echo') {
        return { lines: [args.join(' ')] };
    }

    if (args.length && commands.includes(command)) {
        return usage(command);
    }

    if (Object.hasOwn(views, command)) {
        return { view: views[command] };
    }

    if (command === 'clear') {
        return { clear: true };
    }

    if (command === 'pwd') {
        return { lines: [cwd] };
    }

    if (command === 'history') {
        return { lines: history.map((item, i) => `${String(i + 1).padStart(3)}  ${item}`) };
    }

    return { error: 'notFound', value: raw };
}

function removalAttempt(words, cwd) {
    const sudo = words[0] === 'sudo';
    const [command, ...args] = sudo ? words.slice(1) : words;

    if (command !== 'rm') {
        return null;
    }

    let recursive = false;
    let force = false;
    let noPreserveRoot = false;
    let options = true;
    const targets = [];

    for (const arg of args) {
        if (options && arg === '--') {
            options = false;
        }
        else if (options && arg.startsWith('-')) {
            if (arg === '--recursive') {
                recursive = true;
            }
            else if (arg === '--force') {
                force = true;
            }
            else if (/^-[rRf]+$/.test(arg)) {
                recursive ||= /[rR]/.test(arg);
                force ||= arg.includes('f');
            }
            else if (arg === '--no-preserve-root') {
                noPreserveRoot = true;
            }
            else {
                return null;
            }
        }
        else if (arg) {
            targets.push(resolveDirectory(arg.replace(/\/\*$/, '/'), cwd));
        }
    }

    return recursive && force && targets.some((path) => ['/', '/home/bruno'].includes(path))
        ? { sudo, noPreserveRoot }
        : null;
}

export function complete(line, cwd = '/home/bruno') {
    const match = line.match(/^(.*\s)?([^\s]*)$/);

    if (!match) {
        return [];
    }

    const prefix = match[1] || '';
    const partial = match[2];
    const args = prefix.trim().split(/\s+/);
    let candidates = [];

    if (!prefix) {
        candidates = commands;
    }
    else if (args.length === 1) {
        const command = Object.hasOwn(aliases, args[0]) ? aliases[args[0]] : args[0];

        if (command === 'open') {
            const pathPrefix = partial.match(/^(~\/)?projects\//)?.[0] || '';

            candidates = projects.map((p) => `${pathPrefix}${p.id}`);
        }

        if (command === 'projects') {
            candidates = categories;
        }

        if (command === 'cv') {
            candidates = ['--lang'];
        }

        if (command === 'cd' || command === 'ls') {
            const pathPrefix = partial.slice(0, partial.lastIndexOf('/') + 1);
            const parent = `${resolveDirectory(pathPrefix || '.', cwd)}/`;

            candidates = directoryPaths
                .filter(
                    (path) => path.startsWith(parent) && !path.slice(parent.length).includes('/')
                )
                .map((path) => `${pathPrefix}${path.slice(parent.length)}/`);

            if (!pathPrefix) {
                candidates.unshift(
                    ...['~/', './', '../'].filter((path) =>
                        directoryPaths.includes(resolveDirectory(path, cwd))
                    )
                );
            }
        }
    }
    else if (args.length === 2 && args[0] === 'cv' && args[1] === '--lang') {
        candidates = ['en', 'es'];
    }

    return candidates
        .filter((value) => value.startsWith(partial))
        .map((value) => `${prefix}${value}`);
}

export function routeFromHash(hash) {
    const id = hash.replace(/^#/, '');
    const [base, filter] = id.split('/');

    if (base === 'projects' && categories.includes(filter)) {
        return { view: 'projects', filter };
    }

    if (projects.some((p) => p.id === id)) {
        return { view: 'project', projectId: id };
    }

    const view =
        { home: 'about', main: 'about', work: 'projects', background: 'experience' }[id] || id;

    if ([...sections, 'skills', 'education', 'achievements', 'cv', 'help'].includes(view)) {
        return { view, filter: 'all' };
    }

    return { view: 'about' };
}

export function hashFor(result) {
    if (result.view === 'projects' && result.filter && result.filter !== 'all') {
        return `#projects/${result.filter}`;
    }

    return `#${result.projectId || result.view}`;
}

export function commandForRoute(route) {
    if (route.projectId) {
        return `open ${route.projectId}`;
    }

    if (route.view === 'projects' && route.filter && route.filter !== 'all') {
        return `projects ${route.filter}`;
    }

    return commandFor(route.view);
}
