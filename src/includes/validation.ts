import { Field as VeeField, Form as VeeForm } from 'vee-validate';
import type { Plugin } from 'vue';
const validationPlugin: Plugin = {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
  },
};
export default validationPlugin;
