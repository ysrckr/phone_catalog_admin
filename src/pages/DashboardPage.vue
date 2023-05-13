
<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import Card from '@/components/Utilities/Card.vue';
import CreateUser from "@/components/Forms/CreateUser.vue";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import CreateCategory from "@/components/Forms/CreateCategory.vue";
import CreateProduct from '@/components/Forms/CreateProduct.vue';


const router = useRouter();
const [userId] = useLocalStorage('userId');

onMounted(() => {
  if (!userId) {
    router.push('/login');
  }
});
</script>

<template>
  <h1 class="text-center mt-6 text-xl font-bold">Dashboard</h1>
  <div class="container px-4 mt-12 grid grid-cols-1 gap-y-4 gap-x-8 md:grid-cols-2 lg:grid-cols-2 lg: xl:grid-cols-3 items-center justify-center"
  >
    <Card title="Create A User">
      <CreateUser />
    </Card>
    <Card title="Create A Category">
      <CreateCategory />
    </Card>
    <Card title="Create A Product">
      <CreateProduct />
    </Card>
  </div>
</template>