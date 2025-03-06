<template>
  <!-- Header -->
  <header id="header" class="bg-gray-700">
    <nav class="container mx-auto flex justify-start items-center py-5 px-4">
      <!-- App Name -->
      <RouterLink
        class="text-white font-bold uppercase text-2xl mr-4"
        :to="{ name: 'home' }"
        exactActiveClass="!text-white"
        >Music</RouterLink
      >

      <div class="flex flex-grow items-center">
        <!-- Primary Navigation -->
        <ul class="flex flex-row mt-1">
          <!-- Navigation Links -->
          <li v-if="!isUserLoggedIn">
            <a class="px-2 text-white" @click.prevent="toggleAuthModal">Login / Register</a>
          </li>
          <template v-else>
            <li>
              <a class="px-2 text-white" @click.prevent="userStore.logout">Logout</a>
            </li>
            <li>
              <RouterLink v-if="isUserLoggedIn" class="px-2 text-white" :to="{ name: 'manage' }"
                >Manage</RouterLink
              >
            </li>
          </template>
          <li>
            <RouterLink class="px-2 text-white" :to="{ name: 'about' }">About</RouterLink>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { useModalStore } from '@/stores/modal';
import { useUserStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
import { RouterLink } from 'vue-router';
const { toggleModal } = useModalStore();
const userStore = useUserStore();
const { isUserLoggedIn } = storeToRefs(userStore);
const toggleAuthModal = () => {
  toggleModal();
};
</script>
