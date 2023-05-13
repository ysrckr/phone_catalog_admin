<script lang="ts" setup>
import Header from './Header.vue';
import Sidebar from './Sidebar.vue';
import { useAuthStore } from '@/stores/authStore';

const authStore = useAuthStore();
</script>
<template>
  <Header />
  <div class="flex flex-col" :class="{
    'items-center': !authStore.isAuthenticated,
    'justify-center': !authStore.isAuthenticated,
    'mx-auto': !authStore.isAuthenticated,
  }">
    <div class="relative md:grid md:grid-cols-4 md:mr-4">
      <Sidebar />
      <main class="col-span-3 mt-10 mx-auto">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
