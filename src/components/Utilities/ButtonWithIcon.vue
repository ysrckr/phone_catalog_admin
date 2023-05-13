<script lang="ts" setup>
const props = defineProps({
  icon: {
    type: String,
    required: true,
  },
  iconSide: {
    type: String,
    default: 'left',
  },
  iconSize: {
    type: Number,
    default: 1.5,
  },
});

const { icon, iconSide, iconSize } = props;
</script>

<template>
  <button
    class="text-center"
    v-bind="$attrs"
  >
    <v-icon
      v-if="iconSide === 'left'"
      :icon="`mdi-${icon}`"
      :size="`${iconSize}rem`"
    />
    <slot />
    <v-icon
      v-if="iconSide === 'right'"
      :icon="`mdi-${icon}`"
      :size="`${iconSize}rem`"
    />
  </button>
</template>
