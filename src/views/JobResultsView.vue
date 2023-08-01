<template>
  <div class="flex w-full flex-row flex-nowrap">
    <job-filters-sidebar />
    <job-listings />
  </div>
  <!--1 <button @click="goToHome">Go to Home Page</button> -->
</template>

<script>
import JobFiltersSidebar from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebar.vue';
import JobListings from '@/components/JobResults/JobListings.vue';

export default {
  name: 'JobResultsView',
  components: {
    JobFiltersSidebar,
    JobListings,
  },
  //1 methods: {
  //   goToHome() {
  //     this.$router.push({ name: 'Home' });
  //     //this.$router nos proporciona una colección de methodos que podemos usar para navegar básicamente entre route/rutas, y acepta objetos como configuración, en este ejemplo agregamos un boton que al pulsarlo navega al route llamado "Home", que preconfiguramos en index.js
  //   },
  // },
};
</script>
