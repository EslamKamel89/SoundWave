import { fbAuth, userCollection } from '@/includes/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const isUserLoggedIn = ref<boolean>(false);
  const register = async (data: {
    name: string;
    email: string;
    age: number;
    country: string;
    password: string;
  }) => {
    isUserLoggedIn.value = false;
    const userCred = await createUserWithEmailAndPassword(fbAuth, data.email, data.password);
    await addDoc(userCollection, data);
    isUserLoggedIn.value = true;
    return userCred;
  };
  return {
    isUserLoggedIn,
    register,
  };
});
