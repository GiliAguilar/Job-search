<template>
  <div class="w-full border-b border-solid border-brand-gray-1">
    <div class="mx-auto my-16 text-center">
      <slot name="title"> Title </slot>
      <slot name="subtitle"> Subtitle </slot>
      <!-- se utiliza name= en slot para poder inyectar html en un lugar en específico, osea, en donde esté el nombre en específic, también se puede no asignar nada y se entiende que es name='default' -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'HeaderContainer',
};
</script>
