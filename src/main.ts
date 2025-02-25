import './assets/base.css';
import './assets/main.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import validationPlugin from './includes/validation';
import router from './router';

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.use(validationPlugin);

app.mount('#app');
