<script setup lang="ts">
import ProductsItem from '@/components/Items/ProductsItem.vue';
import { useQuery } from '@tanstack/vue-query';
import { getAllProducts } from '@/api/products/getAll';
import { ProductResponse } from '../api/products/getAll';
import Loading from '@/components/Utilities/Loader.vue';
import Error from '@/components/Utilities/Error.vue';

const { data: products, isError, isLoading } = useQuery<ProductResponse[]>(
  ['products'],
  getAllProducts,
);

console.log(products)
</script>

<template>
  <div>
    <h1 class="mt-4 text-xl font-bold text-center">Products</h1>
    <div
      v-if="isLoading"
      class="flex justify-center mt-4"
    >
      <Loading />
    </div>
    <div
      v-if="isError"
      class="flex justify-center mt-4"
    >
      <Error />
    </div>
    <div
      class="gap-x-4 gap-y-6 lg:grid-cols-2 xxl:grid-cols-4 container grid items-center justify-center grid-cols-1 px-4 mt-3"
    >
      <ProductsItem
        v-if="products"
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
  </div>
</template>
