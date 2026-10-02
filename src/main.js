import './app.css';
import { mount } from 'svelte';
import App from './App.svelte';
import { initI18n } from './i18n';

initI18n();

const app = mount(App, {
    target: document.getElementById('app')
});

export default app;
