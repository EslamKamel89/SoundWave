<template>
  <Form :validation-schema="loginSchema" @submit="login">
    <div
      class="text-white text-center font-bold p-4 rounded mb-4 max-w-[200px] sm:max-w-xs mx-auto text-xs"
      v-if="loginStatus.showAlert"
      :class="loginStatus.alertVariant"
    >
      {{ loginStatus.alertMsg }}
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">Email</label>
      <Field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Email"
      />
      <ErrorMessage class="text-red-500" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <Field
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
      />
    </div>
    <ErrorMessage class="text-red-500" name="password" />
    <button
      type="submit"
      class="block w-full mt-2 bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="loginStatus.inSubmission"
    >
      Submit
    </button>
  </Form>
</template>

<script setup lang="ts">
import { pr } from '@/pr';
import { useUserStore } from '@/stores/user';
import type { UserCredential } from 'firebase/auth';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { ref } from 'vue';
import LoginForm from './LoginForm.vue';

type LoginForm = {
  email: string;
  password: string;
};

const loginSchema = {
  email: 'required|min:3|max:100|email',
  password: 'required|min:3|max:100',
};

const loginStatus = ref({
  inSubmission: false,
  showAlert: false,
  alertVariant: 'transparent',
  alertMsg: '',
});
const userStore = useUserStore();

const login = async (values: unknown) => {
  const formData = values as LoginForm;
  pr(formData, 'login form data');
  loginStatusLoading();
  let userCred: UserCredential | null = null;
  try {
    userCred = await userStore.login(formData);
    loginStatusSuccess();
    pr(userCred, 'login');
  } catch (error) {
    loginStatusFailure();
    pr(error, 'login error');
  }
  setTimeout(() => {
    loginStatusInitial();
  }, 3000);
  return userCred;
};
const loginStatusLoading = () => {
  loginStatus.value.inSubmission = true;
  loginStatus.value.showAlert = true;
  loginStatus.value.alertVariant = 'bg-blue-500';
  loginStatus.value.alertMsg = 'Please Wait...';
  return loginStatus;
};
const loginStatusSuccess = () => {
  loginStatus.value.alertVariant = 'bg-green-500';
  loginStatus.value.alertMsg = 'Success, your are logged in';
  loginStatus.value.inSubmission = false;
  return loginStatus;
};
const loginStatusFailure = () => {
  loginStatus.value.alertVariant = 'bg-red-500';
  loginStatus.value.alertMsg = 'Invalid login details';
  loginStatus.value.inSubmission = false;
  return loginStatus;
};
const loginStatusInitial = () => {
  loginStatus.value.alertVariant = 'transparent';
  loginStatus.value.alertMsg = '';
  loginStatus.value.inSubmission = false;
  loginStatus.value.showAlert = false;
  return loginStatus;
};
</script>
