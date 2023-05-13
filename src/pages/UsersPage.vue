<script setup lang="ts">
import UsersItem from '@/components/Items/UsersItem.vue';
import { useQuery } from '@tanstack/vue-query';
import { getAllUsers } from '@/api/users/getAll';
import Error from '@/components/Utilities/Error.vue';
import Loader from '@/components/Utilities/Loader.vue';

const {
  data: users,
  isError,
  isLoading,
  refetch,
} = useQuery(['users'], {
  queryFn: () => getAllUsers(),
});
</script>

<template>
  <div class="container flex flex-col items-center justify-center mx-auto mt-4">
    <h1 class="m-6 text-xl font-bold text-center">Users</h1>
    <Loader v-if="isLoading" />
    <Error
      v-if="isError"
      @refresh="refetch"
    />
    <div
      class="gap-x-4 gap-y-6 lg:grid-cols-3 sm:grid-cols-2 md:grid-cols-2 container grid items-center justify-center grid-cols-1 px-4 mt-3"
    >
      <UsersItem
        v-if="users"
        v-for="user in users"
        :key="user.id"
        :name="user.name"
        :email="user.email"
        :role="user.role"
      />
    </div>
  </div>
</template>
