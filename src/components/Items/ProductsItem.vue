<script setup lang="ts">
import { Product } from '../../types/products';
import ButtonWithIcon from '../Utilities/ButtonWithIcon.vue';
import ImageItem from './ImageItem.vue';
import { useQueryClient, useMutation } from '@tanstack/vue-query';
import { remove as removeProduct } from '@/api/products/remove';

const queryClient = useQueryClient();

const deleteProductMutation = useMutation({
  mutationFn: (id: string) => removeProduct(id),
  onSuccess: () => {
    console.log('Product deleted');
    queryClient.invalidateQueries({
      queryKey: ['products'],
    });
  },
});

const deleteProduct = (id: string) => {
  deleteProductMutation.mutate(id);
};

const props = defineProps<{
  product: Product;
}>();

const { product } = props;
</script>

<template>
  <div class="drop-shadow gap-y-4 flex flex-col max-w-xs p-4 bg-green-200 rounded-md">
    <div class="flex flex-col items-center justify-center">
      <ImageItem :images="product.images" />
      <div class="flex flex-col items-center justify-center mt-4">
        <h2 class="text-xl font-bold text-center">{{ product.name }}</h2>
        <p class="text-lg font-bold text-center">{{ product.price }}</p>
      </div>
    </div>
    <div class="flex justify-between mt-4">
      <ButtonWithIcon icon="pencil" class="hover:bg-yellow-300 inline-flex items-center gap-2 py-2 pl-2 pr-4 text-gray-600 bg-yellow-400 rounded-md">
        Edit
      </ButtonWithIcon>
      <ButtonWithIcon 
        icon="delete" 
        class="hover:bg-red-300 inline-flex items-center gap-2 py-2 pl-2 pr-4 text-white bg-red-400 rounded-md"
        @click="deleteProduct(product?.id || '')"
      >
        Delete
      </ButtonWithIcon>
    </div>
  </div>
</template>
