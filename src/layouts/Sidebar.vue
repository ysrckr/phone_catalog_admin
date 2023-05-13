<script lang="ts" setup>
import { useAuthStore } from '@/stores/authStore';
import { useUiStore } from '@/stores/uiStore';
import { onUpdated } from 'vue';

const authStore = useAuthStore();
const uiStore = useUiStore();
</script>

<template>
  <aside
    v-bind="$attrs"
    v-if="authStore.isAuthenticated"
    class="bg-[#2c8b44f6] absolute top-0 bottom-0 min-h-screen p-20 z-10 md:relative md:h-min-screen transition-all duration-300 md:inset-0 ease-in-out"
    :class="{
      '-left-[70%]': !uiStore.isSidebarOpen,
      'left-0': uiStore.isSidebarOpen,
    }"
  >
    <nav class="flex flex-col items-center">
      <ul
        class="justify-evenly gap-y-10 flex flex-col text-xl font-semibold text-center text-white"
      >
        <li
          v-show="authStore.isAuthenticated"
          class="hover:text-green-200 hover:scale-150 transition-all ease-in-out"
        >
          <router-link
            to="/users"
            :active-class="'text-gray-700 underline'"
            @click="uiStore.closeSidebar"
          >
            Users
          </router-link>
        </li>
        <li
          v-show="authStore.isAuthenticated"
          class="hover:text-green-200 hover:scale-150 transition-all ease-in-out"
        >
          <router-link
            to="/categories"
            :active-class="'text-gray-700 underline'"
            @click="uiStore.closeSidebar"
          >
            Categories
          </router-link>
        </li>
        <li
          v-show="authStore.isAuthenticated"
          class="hover:text-green-200 hover:scale-150 transition-all ease-in-out"
        >
          <router-link
            to="/products"
            :active-class="'text-gray-700 underline '"
            @click="uiStore.closeSidebar"
          >
            Products
          </router-link>
        </li>
      </ul>
    </nav>
    <div
      class="top-1/3 bg-slate-500 left-full md:hidden absolute z-10 w-10 h-20 cursor-pointer"
    >
      <div class="absolute inset-0 text-white cursor-pointer">
        <button
          v-show="!uiStore.isSidebarOpen"
          class="-translate-x-7 absolute px-8 py-4 transform translate-y-1 "
          @click="uiStore.openSidebar"
        >
          <v-icon
            icon="mdi-chevron-left"
            size="2.5rem"
          />
        </button>
        <button
          v-show="uiStore.isSidebarOpen"
          class="-translate-x-7 absolute px-8 py-4 transform translate-y-1 transition-transform duration-300 ease-in-out"
          @click="uiStore.closeSidebar"
        >
          <v-icon
            icon="mdi-chevron-right"
            size="2.5rem"
          />
        </button>
      </div>
    </div>
  </aside>
</template>
