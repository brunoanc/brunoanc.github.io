import './app.css';
import { mount } from 'svelte';
import App from './App.svelte';
import { initI18n } from './i18n';

initI18n();

const app = mount(App, {
    target: document.getElementById('app')
});

if (window.location.hash) {
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            const id = decodeURIComponent(window.location.hash.slice(1));
            const target = document.getElementById(id);

            if (target) {
                const previousScrollBehavior = document.documentElement.style.scrollBehavior;
                document.documentElement.style.scrollBehavior = 'auto';
                target.scrollIntoView();
                document.documentElement.style.scrollBehavior = previousScrollBehavior;
            }
        });
    });
}

export default app;
