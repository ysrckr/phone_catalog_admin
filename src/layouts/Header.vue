<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { toast } from 'vue3-toastify';
import { useAuthStore } from '@/stores/authStore';




const router = useRouter();
const authStore = useAuthStore();


const onLogout = async () => {
  try {
    await authStore.logout();
    router.push('/login');
  } catch (error) {
    toast.error('Something went wrong');
    return;
  }
};
</script>

<template>
  <header
    class="sticky top-0 flex items-center justify-between px-5 py-5 z-30 bg-green-900 shadow-xl h-1/6"
  >
    <div>
      <router-link to="/">
        <img
          src="@/assets/logo.png"
          alt="logo"
        />
      </router-link>
    </div>
    <div>
      <ul class="flex items-center justify-between gap-3 text-gray-100 text-xs md:text-lg lg:text-lg">
        <li v-show="authStore.isAuthenticated">
          <router-link
            to="/dashboard"
            :active-class="'text-green-200 underline'"
          >
            Dashboard
          </router-link>
        </li>

        <li v-show="authStore.isAuthenticated">
          <button @click="onLogout">Logout</button>
        </li>
      </ul>
    </div>
  </header>
</template>
