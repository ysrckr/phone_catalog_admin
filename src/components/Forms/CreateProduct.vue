<script lang="ts" setup>
import { ref } from 'vue';
import { useMutation, useQueryClient, useQuery } from '@tanstack/vue-query';
import { Category } from '@/types/category';
import { getAllCategories } from '@/api/categories/getAll';
import Checkbox from '@/components/Utilities/Checkbox.vue';
import { createProduct } from '@/api/products/create';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';
import { Product } from '@/types/products';
import { productSchema } from '@/types/products';

const name = ref<string>('');
const description = ref<string>('');
const colors = ref<string>('');
const sizes = ref<string[]>([]);
const price = ref<number>(0);
const quantity = ref<number>(0);
const category = ref<string>('');
const images = ref<File[]>([]);

const router = useRouter();
const queryClient = useQueryClient();

const { data: categories } = useQuery<Category[]>(
  ['categories'],
  getAllCategories,
);

const createProductMutation = useMutation({
  mutationFn: createProduct,
  onSuccess: () => {
    toast.success('Product created');
    // invalidate query to update cache
    queryClient.invalidateQueries({
      queryKey: ['products'],
    });
    // clear form
    name.value = '';
    description.value = '';
    colors.value = '';
    sizes.value = [];
    price.value = 0;
    quantity.value = 0;
    category.value = '';

    router.push('/products');
  },
  onError: () => {
    toast.error('Error creating product');
  },
});

// checkbox change handler
const onCheckboxChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  if (target.checked) {
    sizes.value.push(target.value);
  } else {
    sizes.value = sizes.value.filter(size => size !== target.value);
  }
};

// image change handler
const onImageChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const files = target.files as FileList;
  images.value = [];
  for (let i = 0; i < files.length; i++) {
    images.value.push(files[i]);
  }
};

// category change handler
const onCategoryChange = (e: Event) => {
  const target = e.target as HTMLInputElement;
  category.value = target.value;
};

const onSubmit = () => {
  const isValidProduct = productSchema.safeParse({
    name: name.value,
    description: description.value,
    colors: colors.value.split(',') as string[],
    sizes: sizes.value,
    price: price.value,
    quantity: quantity.value,
    category: category.value,
  }).success;

  if (!isValidProduct) {
    toast.error('Invalid product');
    return;
  }

  const product: Product = {
    name: name.value,
    description: description.value,
    colors: colors.value.split(',') as string[],
    sizes: sizes.value,
    price: price.value,
    quantity: quantity.value,
    category: category.value,
    images: [...images.value],
  };

  const formData = new FormData();
  formData.append('name', product.name);
  formData.append('description', product.description);
  formData.append('colors', JSON.stringify(product.colors));
  formData.append('sizes', JSON.stringify(product.sizes));
  formData.append('price', product.price.toString());
  formData.append('quantity', product.quantity.toString());
  formData.append('category', product.category);
  console.log('images', product.images);
  if (product.images.length > 0) {
    
    product.images.forEach(image => {
      console.log('image', image);
      formData.append('images', image);
    });

    console.log('formData', formData.getAll('images'));
  }

  createProductMutation.mutate(formData);
};
</script>

<template>
  <div class="mx-auto">
    <form
      class="gap-y-6 flex flex-col"
      @submit.prevent="onSubmit"
    >
      <label
        class="sr-only"
        for="product_name"
        >Name</label
      >
      <input
        class="border-1 drop-shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent border-gray-300"
        v-model="name"
        type="text"
        id="product_name"
        name="name"
        autocomplete="true"
        placeholder="Product Name"
      />
      <label
        class="sr-only"
        for="description"
        >Description</label
      >
      <textarea
        class="border-1 drop-shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white border-gray-300"
        v-model="description"
        id="description"
        name="description"
        autocomplete="false"
        placeholder="Product Description"
      />
      <label
        class="sr-only"
        for="colors"
        >Colors</label
      >
      <input
        class="border-1 drop-shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent border-gray-300"
        v-model="colors"
        type="text"
        id="colors"
        name="colors"
        autocomplete="true"
        placeholder="Colors"
      />
      <div class="justify-evenly flex">
        <Checkbox
          value="64"
          label="64GB"
          :onChange="onCheckboxChange"
        />
        <Checkbox
          value="128"
          label="128GB"
          :onChange="onCheckboxChange"
        />
        <Checkbox
          value="256"
          label="256GB"
          :onChange="onCheckboxChange"
        />
      </div>
      <label
        class="sr-only"
        for="price"
        >Price</label
      >
      <input
        v-model="price"
        type="number"
        id="price"
        name="price"
        autocomplete="true"
        placeholder="Price"
      />
      <label
        class="sr-only"
        for="quantity"
        >Quantity</label
      >
      <input
        v-model="quantity"
        type="number"
        id="quantity"
        name="quantity"
        autocomplete="true"
        placeholder="Quantity"
      />
      <label
        class="sr-only"
        for="category"
        >Category</label
      >
      <select
        class="bg-white"
        v-model="category"
        id="category"
        name="category"
        autocomplete="true"
        placeholder="Category"
      >
        <option
          value=""
          disabled
          selected
        >
          Select Category
        </option>
        <option
          v-if="categories?.length !== 0"
          v-for="category in categories"
          :key="category.id"
          :value="category.id"
          @input="onCategoryChange"
        >
          {{ category.name }}
        </option>
      </select>
      <label
        class="sr-only"
        for="images"
        >Images</label
      >
      <input
        type="file"
        id="images"
        name="images"
        autocomplete="true"
        @change="onImageChange"
        multiple
      />
      <button
        class="hover:bg-green-500 px-4 py-2 text-white bg-green-600 rounded-md"
        type="submit"
      >
        Submit
      </button>
    </form>
  </div>
</template>
