// import { Field as VeeField, Form as VeeForm } from 'vee-validate';
// import type { Plugin } from 'vue';
// const validationPlugin: Plugin = {
//   install(app) {
//     app.component('VeeForm', VeeForm);
//     app.component('VeeField', VeeField);
//   },
// };
// export default validationPlugin;
import {
  alpha_spaces,
  confirmed,
  email,
  integer,
  is,
  max,
  max_value,
  min,
  min_value,
  numeric,
  one_of,
  required,
} from '@vee-validate/rules';
import { configure, defineRule, ErrorMessage } from 'vee-validate';
type ErrorMessages = {
  required: string;
  min: string;
  max: string;
  alpha_spaces: string;
  email: string;
  min_value: string;
  max_value: string;
  tos: string;
};
export default function veeValidateRules() {
  defineRule('required', required);
  defineRule('tos', required);
  defineRule('min', min);
  defineRule('max', max);
  defineRule('alpha_spaces', alpha_spaces);
  defineRule('email', email);
  defineRule('integer', integer);
  defineRule('numeric', numeric);
  defineRule('min_value', min_value);
  defineRule('max_value', max_value);
  defineRule('confirmed', confirmed);
  defineRule('one_of', one_of);
  defineRule('is', is);
  configure({
    generateMessage(ctx): string {
      const messages: ErrorMessages = {
        required: `The field ${ctx.field} is required`,
        min: `The field ${ctx.field} is too short`,
        max: `The field ${ctx.field} is too long`,
        alpha_spaces: `The field ${ctx.field} might contain only alphapitical charachters and spaces`,
        email: `The field ${ctx.field} must be a valid email`,
        min_value: `The field ${ctx.field} value is too low`,
        max_value: `The field ${ctx.field} value is too high`,
        tos: `You must agree to terms and conditions`,
      };
      if (!ctx.rule || !(ctx.rule.name in ErrorMessage))
        return `the field ${ctx.field} is not valid`;
      if (ctx.rule.name in ErrorMessage) {
        return messages[ctx.rule.name as keyof ErrorMessages];
      }
      return `the field ${ctx.field} is not valid`;
    },
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
  });
}
