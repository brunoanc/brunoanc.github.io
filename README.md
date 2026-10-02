# My portfolio

[🌐 brunoancona.me](https://brunoancona.me)

Terminal-style portfolio built with Svelte and Vite.

## Local development

```sh
npm ci
npm run dev
```

## Checks and production build

```sh
npm run lint
npm run check
npm run build
npm run preview
```

`npm run deploy` publishes the build to GitHub Pages. Run it only when the changes are ready to go live. `CNAME` and `sitemap.xml` are copied to the build by the existing postbuild script.

Run `npm run format` to format the active code, and `npm run lint` to check it.

## Editing

- `src/data/portfolio.js`: English and Spanish copy, project case studies, public source links, contributions and skills. Keep both languages in sync.
- `src/App.svelte`: terminal session, navigation, downloads and output history.
- `src/terminal.js`: command parser, virtual directories, completion and shareable routes.
- `src/components/CommandLine.svelte`: input editing, keyboard history and completion controls.
- `src/components/PortfolioView.svelte`: shared content views for commands and navigation.
- `src/data/terminal-copy.js`: English and Spanish terminal instructions and error messages.
- `src/app.css`: responsive presentation and reduced-motion behavior.
- `src/i18n.js`: locale selection.

## Terminal behavior

`help` lists all commands and keyboard shortcuts. Examples:

```sh
whoami
projects cloud
open eternal-mod-manager
experience
skills
education
achievements
oss
contact
cv --lang es
cd projects
ls
pwd
history
clear
```
