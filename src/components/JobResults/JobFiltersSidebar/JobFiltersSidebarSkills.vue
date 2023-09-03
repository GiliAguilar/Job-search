<template>
  <div class="mt-2">
    <input
      v-model.lazy.trim="skillsSearchTerm"
      type="text"
      class="h-12 w-full rounded border-solid border-brand-gray-1 p-3 text-base shadow-gray"
      placeholder="Computer programming, Finance degree"
    />
    <!-- v-model.lazy sirve para que ejecute la acción solo hasta que dejemos de ingresar información (osea, cuando hagamos click en otro lado en el dom) o hagamos un enter -->
    <!-- v-model.trim elimina los espacios al inicio y final de lo introducido -->
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/stores/user';
import { computed } from 'vue';

const userStore = useUserStore();

const skillsSearchTerm = computed({
  get() {
    return userStore.skillsSearchTerm;
  },
  //get consigue la información, osea, lee lo que tenemos en Pinia
  set(value: string) {
    userStore.UPDATE_SKILLS_SEARCH_TERM(value);
  },
  //sobreescribe a Pinia con lo que ingresamos aquí como value
});
</script>
