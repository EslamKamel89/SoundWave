import { fbAuth, userCollection } from '@/includes/firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
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
    await setDoc(doc(userCollection, userCred.user.uid), data);
    await updateProfile(fbAuth.currentUser!, { displayName: data.name });
    isUserLoggedIn.value = true;
    return userCred;
  };
  return {
    isUserLoggedIn,
    register,
  };
});
