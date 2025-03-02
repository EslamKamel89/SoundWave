<template>
  <Form :validation-schema="registerSchema" @submit="register" :initial-values="userData">
    <div
      class="text-white text-center font-bold p-4 rounded mb-4 max-w-[200px] sm:max-w-xs mx-auto text-xs"
      v-if="regStatus.showAlert"
      :class="regStatus.alertVariant"
    >
      {{ regStatus.alertMsg }}
    </div>
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">Name</label>
      <Field
        name="name"
        type="text"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Enter Name"
      />
      <ErrorMessage class="text-red-500" name="name" />
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
      <ErrorMessage name="email" class="text-red-500" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">Age</label>
      <Field
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage name="age" class="text-red-500" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Password</label>
      <Field
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Password"
        :bails="false"
      />
      <ErrorMessage name="password" class="text-red-500" />
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">Confirm Password</label>
      <Field
        name="confirm_password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        placeholder="Confirm Password"
      />
      <ErrorMessage name="confirm_password" class="text-red-500" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">Country</label>
      <Field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="PALASTINE">PALASTINE</option>
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
      </Field>
      <ErrorMessage name="country" class="text-red-500" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <Field name="tos" type="checkbox" value="1" class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
      <label class="inline-block">Accept terms of service</label>
      <div>
        <ErrorMessage name="tos" class="text-red-500" />
      </div>
    </div>
    <button
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="regStatus.inSubmission"
    >
      Submit
    </button>
  </Form>
</template>

<script setup lang="ts">
import { fbAuth, userCollection } from '@/includes/firebase';
import { pr } from '@/pr';
import { useUserStore } from '@/stores/user';
import { createUserWithEmailAndPassword, type UserCredential } from 'firebase/auth';
import { addDoc } from 'firebase/firestore';
import { storeToRefs } from 'pinia';
import { ErrorMessage, Field, Form } from 'vee-validate';
import { ref } from 'vue';
import RegisterForm from './RegisterForm.vue';
type RegisterForm = {
  name: string;
  email: string;
  age: number;
  password: string;
  confirm_password: string;
  country: string;
  tos: string;
};
const registerSchema = {
  name: 'required|min:3|max:100|alpha_spaces',
  email: 'required|min:3|max:100|email',
  age: 'required|integer|numeric|min_value:6|max_value:130',
  password: 'required|min:3|max:100',
  confirm_password: 'required|confirmed:@password',
  country: { required: true, one_of: ['USA', 'Mexico', 'Germany', 'PALASTINE'] },
  tos: 'tos',
};
const userData = ref<Partial<RegisterForm>>({
  country: 'PALASTINE',
});

const regStatus = ref({
  inSubmission: false,
  showAlert: false,
  alertVariant: 'transparent',
  alertMsg: '',
});
const userStore = storeToRefs(useUserStore());
const register = async (values: unknown) => {
  const formData = values as RegisterForm;
  pr(formData, 'Register form data');
  regStatus.value.inSubmission = true;
  regStatus.value.showAlert = true;
  regStatus.value.alertVariant = 'bg-blue-500';
  regStatus.value.alertMsg = 'Please Wait you account is being created';
  userStore.isUserLoggedIn.value = false;
  let userCred: UserCredential | null = null;
  try {
    userCred = await createUserWithEmailAndPassword(fbAuth, formData.email, formData.password);
    await addDoc(userCollection, {
      name: formData.name,
      email: formData.email,
      age: formData.age,
      country: formData.country,
    });
    userStore.isUserLoggedIn.value = true;
    regStatus.value.alertVariant = 'bg-green-500';
    regStatus.value.alertMsg = 'Success, your account has been created';
    pr(userCred, 'RegisterForm - Register');
  } catch (error) {
    pr(error, 'RegisterForm - Register');
    regStatus.value.alertVariant = 'bg-red-500';
    regStatus.value.alertMsg = "We're sorry, something went wrong. Please try again in a moment.";
  }
  regStatus.value.inSubmission = false;
  setTimeout(() => {
    regStatus.value.alertVariant = 'transparent';
    regStatus.value.alertMsg = '';
    regStatus.value.inSubmission = false;
    regStatus.value.showAlert = false;
  }, 3000);
  return userCred;
};
</script>
