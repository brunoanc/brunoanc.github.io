<script>
    export let locale = 'en';
    export let ariaLabel = 'Profile summary displayed as code';

    const content = {
        en: {
            title: 'class Me',
            fields: [
                {
                    key: 'focus',
                    values: ['Cloud-native', 'Backend', 'Security', 'Open Source']
                },
                {
                    key: 'languages',
                    values: ['Rust', 'C++', 'Python', 'Go', 'C', 'JavaScript', 'PHP']
                },
                {
                    key: 'tools',
                    values: ['AWS', 'GCP', 'Docker', 'Terraform', 'CI/CD', 'Linux']
                },
                {
                    key: 'msg',
                    values: ['Building software that solves real problems.']
                }
            ]
        },
        es: {
            title: 'class Me',
            fields: [
                {
                    key: 'focus',
                    values: ['Cloud-native', 'Backend', 'Seguridad', 'Open Source']
                },
                {
                    key: 'languages',
                    values: ['Rust', 'C++', 'Python', 'Go', 'C', 'JavaScript', 'PHP']
                },
                {
                    key: 'tools',
                    values: ['AWS', 'GCP', 'Docker', 'Terraform', 'CI/CD', 'Linux']
                },
                {
                    key: 'msg',
                    values: ['Construyendo software para problemas reales.']
                }
            ]
        }
    };

    $: data = content[locale] || content.en;
    $: rows = buildRows(data);

    function quoted(values) {
        return values.map((value) => `"${value}"`).join(', ');
    }

    function buildRows(current) {
        return [
            [
                { type: 'keyword', text: current.title },
                { type: 'plain', text: ' {' }
            ],
            [
                { type: 'type', text: '  string' },
                { type: 'plain', text: ' name' },
                { type: 'plain', text: ' = ' },
                { type: 'string', text: '"Bruno Ancona"' },
                { type: 'plain', text: ';' }
            ],
            [
                { type: 'type', text: '  string' },
                { type: 'plain', text: ` ${current.fields[0].key}[4]` },
                { type: 'plain', text: ' = { ' },
                { type: 'string', text: quoted(current.fields[0].values) },
                { type: 'plain', text: ' };' }
            ],
            [
                { type: 'type', text: '  string' },
                { type: 'plain', text: ` ${current.fields[1].key}[7]` },
                { type: 'plain', text: ' = { ' },
                { type: 'string', text: quoted(current.fields[1].values) },
                { type: 'plain', text: ' };' }
            ],
            [
                { type: 'type', text: '  string' },
                { type: 'plain', text: ` ${current.fields[2].key}[6]` },
                { type: 'plain', text: ' = { ' },
                { type: 'string', text: quoted(current.fields[2].values) },
                { type: 'plain', text: ' };' }
            ],
            [
                { type: 'type', text: '  string' },
                { type: 'plain', text: ` ${current.fields[3].key}` },
                { type: 'plain', text: ' = ' },
                { type: 'string', text: `"${current.fields[3].values[0]}"` },
                { type: 'plain', text: ';' }
            ],
            [{ type: 'plain', text: '};' }]
        ];
    }
</script>

<div class="terminal-shell">
    <div class="terminal-card">
        <div class="terminal-bar" aria-hidden="true">
            <span class="dot red"></span>
            <span class="dot yellow"></span>
            <span class="dot green"></span>
        </div>

        <div class="terminal-code" role="img" aria-label={ariaLabel}>
            {#each rows as row, index}
                <div class="code-row">
                    <span class="line-number">{index + 1}</span>
                    <span class="line-body">
                        {#each row as token}
                            <span class={`token ${token.type}`}>{token.text}</span>
                        {/each}
                    </span>
                </div>
            {/each}
        </div>
    </div>
</div>
