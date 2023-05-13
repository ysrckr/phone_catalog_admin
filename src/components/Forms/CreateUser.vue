<script lang="ts" setup>
import { ref } from 'vue';
import { useMutation } from '@tanstack/vue-query';
import { createUser } from '@/api/users/create';
import { CreateUserSchema, CreateUser } from '@/types/user';
import { useQueryClient } from '@tanstack/vue-query';
import { toast } from 'vue3-toastify';
import { useRouter } from 'vue-router';

const name = ref<string>();
const email = ref<string>();
const password = ref<string>();
const confirmPassword = ref<string>();
const role = ref<'USER' | 'ADMIN' | 'Choose A Role'>('Choose A Role');
const isNameValid = ref<boolean>(true);
const isEmailValid = ref<boolean>(true);
const isPasswordValid = ref<boolean>(true);
const isPassworsMatch = ref<boolean>(true);

const router = useRouter();

const queryClient = useQueryClient();

const { mutate } = useMutation({
  mutationFn: (user: CreateUser) => createUser(user),
  onSuccess: () => {
    queryClient.invalidateQueries(['users']);
    name.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    role.value = 'Choose A Role';

    toast.success('User created successfully');

    router.push('/users');
  },
});

const onSubmit = () => {
  if (role.value === 'Choose A Role') {
    role.value = 'USER';
  }

  const user: CreateUser = {
    name: name.value as string,
    email: email.value as string,
    password: password.value as string,
    confirmPassword: confirmPassword.value as string,
    role: role.value || 'USER',
  };

  const userResult = CreateUserSchema.safeParse(user);
  if (!userResult.success) {
    const errors = userResult.error.issues;
    const errorMessages = errors.reduce((acc, error) => {
      acc[error.path[0]] = error.message;
      return acc;
    }, {} as Record<string, string>);

    if (errorMessages.name) {
      isNameValid.value = false;
    } else if (errorMessages.email) {
      isEmailValid.value = false;
    } else if (errorMessages.password) {
      isPasswordValid.value = false;
    } else if (password.value !== confirmPassword.value) {
      toast.error('Passwords do not match');
      isPassworsMatch.value = false;
    }

    return;
  }

  mutate(user);
};

const onPasswordChange = () => {
  isPasswordValid.value = true;
  if (password.value === confirmPassword.value) {
    isPassworsMatch.value = true;
  }
};
</script>

<template>
  <div class="container px-4 pb-5">
    <form
      class="gap-x-4 gap-y-6 lg:grid-cols-2 xxl:grid-cols-4 flex flex-col items-center justify-center"
      @submit.prevent="onSubmit"
    >
      <div class="relative">
        <label
          class="sr-only"
          for="name"
        >
          Name
        </label>
        <input
          type="text"
          placeholder="Name"
          autocomplete="true"
          id="name"
          v-model="name"
          class="border-1 drop-shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent border-gray-300"
          :class="{ 'border-red-500': !isNameValid }"
          @input="isNameValid = true"
        />
        <p
          v-show="!isNameValid"
          class="text-xs italic text-red-500 absolute bottom-[-3] left-0"
        >
          Name is required.
        </p>
      </div>

      <div class="relative">
        <label
          class="sr-only"
          for="email"
          >Email</label
        >
        <input
          type="email"
          placeholder="Email"
          autocomplete="true"
          id="email"
          v-model="email"
          class="border-1 drop-shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent border-gray-300"
          :class="{ 'border-red-500': !isEmailValid }"
          @input="isEmailValid = true"
        />
        <p
          v-show="!isEmailValid"
          class="text-xs italic text-red-500 absolute bottom-[-3] left-0"
        >
          Email is required.
        </p>
      </div>
      <div class="relative">
        <label
          class="sr-only"
          for="password"
          >Password</label
        >
        <input
          type="password"
          placeholder="Password"
          id="password"
          autocomplete="false"
          v-model="password"
          class="border-1 drop-shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent border-gray-300"
          :class="{ 'border-red-500': !isPasswordValid }"
          @input="onPasswordChange"
        />
        <p
          v-show="!isPasswordValid"
          class="text-xs italic text-red-500 absolute bottom-[-3] left-0"
        >
          Password is required.
        </p>
      </div>
      <label
        class="sr-only"
        for="confirm-password"
        >Confirm Password</label
      >
      <input
        type="password"
        placeholder="Confirm Password"
        autocomplete="false"
        id="confirm-password"
        v-model="confirmPassword"
        class="border-1 drop-shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent border-gray-300"
      />
      <label
        class="sr-only"
        for="role"
        >Role</label
      >
      <select
        id="role"
        v-model="role"
        class="border-1 drop-shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white border-gray-300"
      >
        <option
          disabled
          value="Choose A Role"
        >
          Choose A Role
        </option>
        <option value="ADMIN">Admin</option>
        <option value="USER">User</option>
      </select>
      <button
        type="submit"
        class="drop-shadow hover:bg-green-500 w-20 p-2 mx-auto text-sm text-center text-white bg-green-600 rounded"
      >
        Create
      </button>
    </form>
  </div>
</template>
