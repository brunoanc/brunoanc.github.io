import stylistic from '@stylistic/eslint-plugin';
import svelte from 'eslint-plugin-svelte';

const declarations = ['const', 'let', 'var'];

const blocks = [
    'block-like',
    'multiline-const',
    'multiline-let',
    'multiline-var',
    'multiline-expression',
    'multiline-return',
    'multiline-export'
];

export default [
    {
        ignores: ['dist/**', '.codex/**', '.vscode/**']
    },
    ...svelte.configs.base,
    {
        files: ['**/*.{js,mjs,cjs,svelte}'],
        plugins: { '@stylistic': stylistic },
        rules: {
            curly: ['error', 'all'],
            '@stylistic/brace-style': ['error', 'stroustrup'],
            '@stylistic/padding-line-between-statements': [
                'error',
                { blankLine: 'always', prev: declarations, next: '*' },
                { blankLine: 'any', prev: declarations, next: declarations },
                { blankLine: 'always', prev: '*', next: blocks },
                { blankLine: 'always', prev: blocks, next: '*' }
            ],
            '@stylistic/padded-blocks': ['error', 'never'],
            '@stylistic/indent': ['error', 4, { SwitchCase: 1 }],
            '@stylistic/quotes': ['error', 'single', { avoidEscape: true }],
            '@stylistic/semi': ['error', 'always'],
            '@stylistic/keyword-spacing': 'error',
            '@stylistic/space-before-blocks': 'error',
            '@stylistic/no-trailing-spaces': 'error',
            '@stylistic/no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
            '@stylistic/eol-last': ['error', 'always']
        }
    },
    {
        files: ['**/*.svelte'],
        rules: {
            '@stylistic/indent': 'off',
            'svelte/indent': ['error', { indent: 4 }],
            'svelte/html-closing-bracket-new-line': 'error'
        }
    }
];
