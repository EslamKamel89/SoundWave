<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <a class="text-white font-bold uppercase text-2xl mr-4" href="#">Music</a>

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li v-if="pr(!isUserLoggedIn, '!isUserLoggedIn')">
            <a class="px-2 text-white" @click.prevent="toggleAuthModal">Login / Register</a>
          </li>
          <template v-else>
            <li>
              <a class="px-2 text-white" @click.prevent="userStore.logout">Logout</a>
            </li>
            <li>
              <a v-if="isUserLoggedIn" class="px-2 text-white" href="#">Manage</a>
            </li>
          </template>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { pr } from '@/pr';
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
const { toggleModal } = useModalStore();
const userStore = useUserStore();
const { isUserLoggedIn } = storeToRefs(userStore);
const toggleAuthModal = () => {
  toggleModal();
};
</script>
