<template>
  <button :class="buttonClass">
    {{ text }}
  </button>
</template>

<script lang="ts" setup>
import { computed, toRefs } from 'vue';

const props = defineProps({
  text: {
    type: String,
    require: true,
    default: null,
  },
  type: {
    type: String,
    require: false,
    validator(value: string) {
      return ['primary', 'secondary'].includes(value.toLowerCase());
    },
    default: 'primary',
  },
});

const { type } = toRefs(props);
const buttonClass = computed(() => {
  return { [type.value]: true };
});
</script>

<style scoped>
button {
  @apply px-5 py-2 font-medium;
}
.primary {
  @apply rounded bg-brand-blue-1 text-white hover:shadow-blue;
}

.secondary {
  @apply bg-transparent text-brand-blue-1 hover:bg-brand-blue-2 hover:text-white;
}

</style>
