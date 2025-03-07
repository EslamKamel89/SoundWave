import { fbAuth, userCollection } from '@/includes/firebase';
import router, { AppRouteNames } from '@/router';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useModalStore } from './modal';

export const useUserStore = defineStore('user', () => {
  const modalStore = useModalStore();
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
    modalStore.toggleModal();
    return userCred;
  };
  const login = async (data: { email: string; password: string }) => {
    isUserLoggedIn.value = false;
    const userCred = await signInWithEmailAndPassword(fbAuth, data.email, data.password);
    isUserLoggedIn.value = true;
    modalStore.toggleModal();
    return userCred;
  };
  const logout = async () => {
    await signOut(fbAuth);
    isUserLoggedIn.value = false;
    if (router.currentRoute.value.meta?.requireAuth) {
      router.push({ name: AppRouteNames.home });
    }
  };
  return {
    isUserLoggedIn,
    register,
    login,
    logout,
  };
});
