<script lang="ts" setup>
import { ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import { createCategory } from '@/api/categories/create';
import { toast } from 'vue3-toastify';
import { useQueryClient } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';

const name = ref<string>();
const image = ref<File>();
const imageName = ref<string>();
const isNameError = ref<boolean>(false);

const router = useRouter();
const queryClient = useQueryClient();
const createCategoryMutation = useMutation({
  mutationFn: createCategory,
  onSuccess: () => {
    toast.success('Category created');
    // invalidate query to update cache
    queryClient.invalidateQueries({
      queryKey: ['categories'],
    });
    // clear form
    name.value = '';

    router.push('/categories');
  },
  onError: () => {
    toast.error('Error creating category');
  },
});

const onFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) {
    target.value = '';
  }

  image.value = file;
};

const onSubmit = () => {
  if (!name.value || name.value.length < 3) {
    isNameError.value = true;
    return;
  }
  const formData = new FormData();
  formData.append('name', name.value as string);
  formData.append('image', image.value as File);
  createCategoryMutation.mutate(formData);
};
</script>

<template>
  <div class="flex flex-col mt-8">
    <form
      class="gap-y-10 relative flex flex-col"
      @submit.prevent="onSubmit"
    >
      <label
        for="title"
        class="sr-only"
        >Name</label
      >
      <input
        type="text"
        v-model="name"
        id="title"
        name="name"
        class="border-1 drop-shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent border-gray-300"
        :class="{ 'border-red-500': isNameError }"
        placeholder="Category Name"
        min="3"
        @input="isNameError = false"
        autocomplete="off"
      />
      <p
        v-if="isNameError"
        class="top-11 absolute left-0 text-xs italic text-red-500"
      >
        Name must be at least 3 characters
      </p>
      <label
        for="image"
        class="sr-only"
        >Image</label
      >
      <input
        type="file"
        @change="onFileChange"
        id="image"
        name="image"
        class="file:bg-green-600 file:text-white file:border-none file:mr-6 file:px-4 file:py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent file:hover:bg-green-500 file:cursor-pointer file:dropshadow-lg file:rounded-md border-gray-300"
        :value="imageName"
      />
      <button
        type="submit"
        class="hover:bg-green-500 px-4 py-2 text-white bg-green-600 rounded-md"
      >
        Create
      </button>
    </form>
  </div>
</template>
