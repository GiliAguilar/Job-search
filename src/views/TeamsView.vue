<template>
  <header-container>
    <template v-slot:title>
      <hi class="w-full text-4xl font-normal">Teams</hi>
    </template>
    <!-- v-slot:name sirve para decirle al slot en donde incrustar el html, se usa en combinación con <template>; la abreviatura de v-slot: es #name; se puede poner default para sobreescribir el slot default del componente hijo -->
    <template #subtitle>
      <h2 class="my-4 w-full text-base font-light">
        It's awesome working here. Why don't you come join us
      </h2>
    </template>
  </header-container>
</template>

<script>
import HeaderContainer from '@/components/Shared/HeaderContainer.vue';

export default {
  name: 'TeamsView',
  components: {
    HeaderContainer,
  },
};
</script>
