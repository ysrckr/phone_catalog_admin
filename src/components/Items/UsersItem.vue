<script lang="ts" setup>
import { capitalize } from '../../utils/capitilize';
import ButtonWithIcon from '../Utilities/ButtonWithIcon.vue';
import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { remove as removeUser } from '@/api/users/remove';
import { toast } from 'vue3-toastify';
import { json } from 'stream/consumers';

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const queryClient = useQueryClient();

const deleteUserMutation = useMutation({
  mutationFn: (email: string) => removeUser(email),
  onSuccess: () => {
    queryClient.invalidateQueries({
      queryKey: ['users'],
    });
  },
  onError: (error: {error: string}) => {
    toast.error(error.error);
  },
});

const deleteUser = (email: string) => {
  deleteUserMutation.mutate(email);
};
</script>

<template>
  <div
    class="drop-shadow gap-y-2 flex flex-col p-4 mx-auto bg-green-200 rounded-md"
  >
    <h4 class="font-semibold text-center">{{ capitalize(props.name) }}</h4>
    <p class="text-gray-600 cursor-pointer">
      <a :href="`mailto:${props.email}`">{{ props.email }}</a>
    </p>
    <p class="text-center">{{ capitalize(props.role) }}</p>
    <div class="gap-x-2 flex items-center justify-between">
      <ButtonWithIcon
        icon="pencil"
        class="hover:bg-yellow-300 inline-flex items-center gap-2 py-2 pl-2 pr-4 text-gray-600 bg-yellow-400 rounded-md"
      >
        Edit
      </ButtonWithIcon>
      <ButtonWithIcon
        icon="delete"
        class="hover:bg-red-300 inline-flex items-center gap-2 py-2 pl-2 pr-4 text-gray-200 bg-red-400 rounded-md"
        @click="deleteUser(props.email)"
      >
        Delete
      </ButtonWithIcon>
    </div>
  </div>
</template>
