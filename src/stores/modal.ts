import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

export const useModalStore = defineStore('modal', () => {
  const isOpen = ref(false);
  const toggleModal = () => {
    isOpen.value = !isOpen.value;
  };
  const hiddenClass = computed(() => (isOpen.value ? '' : 'hidden'));
  return { isOpen, toggleModal, hiddenClass };
});
