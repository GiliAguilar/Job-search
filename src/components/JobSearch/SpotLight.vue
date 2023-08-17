<template>
  <ul>
    <li v-for="i in spotlights" :key="i.id">
      <slot :img="i.img" :title="i.title" :description="i.description"></slot>
      <!-- <slot :spotlight="i"> </slot> -->
      <!-- aquí, al utilizar v-bind:nombre="i", lo que estamos haciendo es mandar la información del hijo al padre, inverson a lo normalmente usado, y para recibirlo en el padre usamos v-slot:default="nombreQueQuerramos". El padre recibe un objeto con los nombre que definimos con v-bind, si definimos varios v-bind recibe todos bajo el nombre "nombreQueQuerramos", y obviamente usamos v-slot:default porque no definimos name=""-->
    </li>
  </ul>
</template>

<!-- Vue 2 y 3, old form -->
<!-- <script>
import axios from 'axios';

export default {
  name: 'SpotLight',
  data() {
    return {
      spotlights: [],
    };
  },

  async mounted() {
    const baseUrl = import.meta.env.VITE_APP_API_URL;
    const url = `${baseUrl}/spotlights`;
    const response = await axios.get(url);
    this.spotlights = response.data;
  },
};
</script> -->

<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
//básicamente, todas nuestras funciones de Vue Cicling Hook, o del ciclo de Vue, están disponiebles como funciones, utilizando el prefijo "on" de primero, onMounted, onCreate, etc...

const spotlights = ref([]);
const getSpotlights = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/spotlights`;
  const response = await axios.get(url);
  spotlights.value = response.data;
};
onMounted(getSpotlights);
//onMounted es el equivalente de mounted() básicamente, este recibe funciones como parametros, la cuales se van a ejecutar cuando el DOM esté montado
</script>
