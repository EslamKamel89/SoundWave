import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const isUserLoggedIn = ref<boolean>(false);
  return {
    isUserLoggedIn,
  };
});
