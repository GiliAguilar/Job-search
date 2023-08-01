<template>
  <main-nav />
  <!-- 
  <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/jobs/results">Job Results</router-link>
    -->
  <!-- router-link es un link/url directo al componente que especifiquemos, con el texto que le asignemos 
    </div>
  -->
  <router-view />
  <!-- forma nueva, con router, ruoter-view es un componente global, porque lo agregamos directamente en nuestro main.js, este va a cargar el componente al que apunte el url, por defecto,  home, que es nuestro HomeView.vue -->

  <!-- 
    //Forma Antigua, agregando manualmente cada componente vue
    <main-nav />
  main-nav es lo mismo que poner MainNav, solo que usar la primera forma es habitual porque se parece más al código html en vez del estilo JavaScript
  <the-hero /> 
  -->
</template>

<script>
import MainNav from '@/components/Navigation/MainNav.vue';
export default {
  name: 'App',
  components: {
    MainNav,
  },
};
</script>
<!-- 
//Forma antigua, que agrega manualmente cada componente vue  
<script>
import MainNav from '@/components/Navigation/MainNav.vue';
import TheHero from '@/components/JobSearch/TheHero.vue';

export default {
  name: 'App',
  components: {
    MainNav: MainNav, //-> solo "MainNav" hace lo mismo
    TheHero,
  },
};
</script> -->
