<template>
  <div class="bg-white rounded border border-gray-200 relative flex flex-col">
    <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
      <span class="card-title">Upload</span>
      <i class="fas fa-upload float-right text-green-400 text-2xl"></i>
    </div>
    <div class="p-6">
      <!-- Upload Dropbox -->
      <div
        class="w-full px-10 py-20 rounded text-center cursor-pointer border border-dashed border-gray-400 text-gray-400 transition duration-500 hover:text-white hover:bg-green-400 hover:border-green-400 hover:border-solid"
        :class="{
          'border-green-400 bg-green-400 border-solid text-white': isDragOver,
        }"
        @drag.prevent.stop=""
        @dragstart.prevent.stop="isDragOver = true"
        @dragend.prevent.stop="isDragOver = false"
        @dragover.prevent.stop="isDragOver = true"
        @dragenter.prevent.stop="isDragOver = true"
        @dragleave.prevent.stop="isDragOver = false"
        @drop.prevent.stop="upload"
      >
        <h5>Drop your files here</h5>
      </div>
      <hr class="my-6" />
      <!-- Progess Bars -->
      <div class="mb-4">
        <!-- File Name -->
        <div class="font-bold text-sm">Just another song.mp3</div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <!-- Inner Progress Bar -->
          <div class="transition-all progress-bar bg-blue-400" style="width: 75%"></div>
        </div>
      </div>
      <div class="mb-4">
        <div class="font-bold text-sm">Just another song.mp3</div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <div class="transition-all progress-bar bg-blue-400" style="width: 35%"></div>
        </div>
      </div>
      <div class="mb-4">
        <div class="font-bold text-sm">Just another song.mp3</div>
        <div class="flex h-4 overflow-hidden bg-gray-200 rounded">
          <div class="transition-all progress-bar bg-blue-400" style="width: 55%"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { pr } from '@/pr';
import { ref } from 'vue';

const isDragOver = ref(false);
const upload = (e: DragEvent) => {
  isDragOver.value = false;
  if (!e.dataTransfer || !e.dataTransfer.files) return;
  pr(e, 'upload file');
  pr(e.dataTransfer.files, 'files raw');
  const files = Object.values(e.dataTransfer.files);
  files.forEach((file) => {
    pr(file, 'Single file');
    if (file.type !== 'audio/mpeg') {
      return;
    }
  });
};
</script>
