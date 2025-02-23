<template>
  <div>{{ message }}</div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const message = ref('hello world')
</script>
