<template>
  <div class="h-16 w-full border-b border-solid border-brand-gray-1 bg-white">
    <div class="flex h-full items-center px-8">
      <div v-if="onJobResultsPage">
        <font-awesome-icon icon="fa-solid fa-search" class="mr-3" />
        <!-- para importar iconos, como estos ya fueron importados en main.js de forma global, aquí solo debemos escribir la sintaxis que usamos, en este caso fue font-awesome-icon, para usar el icono como tal usamos icon="" y pasamos el nombre del icono con fa (fontAwesome), como inicialmente importamos un solid, debemos indicarlo tambien con fa-solid, quedando icon="fa-solid fa-search" -->
        <span
          ><span class="text-brand-green-1">{{ FILTERED_JOBS.length }}</span> jobs matched</span
        >
        <!-- span es como div, pero no crea saltos de linea, básicamentes... -->
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'pinia';
import { useJobsStore, FILTERED_JOBS } from '@/stores/jobs';

export default {
  name: 'SubNav',
  computed: {
    ...mapState(useJobsStore, [FILTERED_JOBS]),
    onJobResultsPage() {
      return this.$route.name === 'JobResults';
      //con this.$route accedemos al objeto de route, que nos da información sobre la ruta en la que estamos, dentro de este tenemos propiedades que hemos definido previamente en indes.js, entre ellas "name", así que si accedemos a this.$route.name nos indicará en que route estamos (página en cristiano), y comparamos para saber si estamos en JobResults que es el que nos interesa que estemos para que se muestre realmente nuestro SubNave
    },
  },
};
</script>
