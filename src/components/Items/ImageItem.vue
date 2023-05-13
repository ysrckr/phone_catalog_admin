<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  images: string[];
}>();

const selectedImage = ref(0);

const { images } = props;
</script>
<template>
  <div class="flex flex-col gap-2">
    <div>
      <img
        class="w-64 h-64 object-cover"
        :src="images[selectedImage]"
        :alt="images[selectedImage]"
      />
    </div>
    <div class="flex gap-2">
      <button
        v-for="(image, index) in images"
        :key="index"
        @click="selectedImage = index"
      >
        <img
          class="w-16 h-16 object-cover"
          :src="image"
          :alt="image"
        />
      </button>
    </div>
  </div>
</template>