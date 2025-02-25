// import { Field as VeeField, Form as VeeForm } from 'vee-validate';
// import type { Plugin } from 'vue';
// const validationPlugin: Plugin = {
//   install(app) {
//     app.component('VeeForm', VeeForm);
//     app.component('VeeField', VeeField);
//   },
// };
// export default validationPlugin;
import { alpha_spaces, max, min, required } from '@vee-validate/rules';
import { defineRule } from 'vee-validate';

export default function veeValidateRules() {
  defineRule('required', required);
  defineRule('min', min);
  defineRule('max', max);
  defineRule('alpha_spaces', alpha_spaces);
}
