import './assets/base.css';
import './assets/main.css';

import { createPinia } from 'pinia';
import { createApp, type App as AppType } from 'vue';

import App from './App.vue';
// import validationPlugin from './includes/validation';
import type { User } from 'firebase/auth';
import { fbAuth } from './includes/firebase';
import veeValidateRules from './includes/validation';
import router from './router';
let app: AppType | null = null;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
fbAuth.onAuthStateChanged((user: User | null) => {
  if (app != null) return;
  app = createApp(App);
  app.use(createPinia());
  app.use(router);
  veeValidateRules();
  app.mount('#app');
});
