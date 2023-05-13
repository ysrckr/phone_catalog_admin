<script lang="ts" setup>
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="drop-shadow-lg p-4 m-8 font-semibold text-center bg-green-100">
    <h3 class="p-2 mb-5">{{ props.title }}</h3>
    <slot></slot>
  </div>
</template>
