<script setup lang="ts">
const props = defineProps<{
  value: string;
  label: string;
  onChange: (e: Event) => void;
}>();

const { value, label } = props;
</script>

<template>
  <div class="gap-x-2 gap-y-4 flex items-center text-black">
    <input
      class="form-checkbox focus:ring-2 focus:ring-green-500 focus:border-transparent w-5 h-5 text-green-600 transition duration-150 ease-in-out border-gray-300"
      type="checkbox"
      :id="value"
      :name="value"
      :value="value"
      @input="onChange"
    />
    <label :for="value">{{ label }}</label>
  </div>
</template>