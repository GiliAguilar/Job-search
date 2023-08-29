<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>
    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Previous
          </router-link>
          <!-- aquí lo que está ocurriendo es que, ponemos una condición de, si previousPage no da resultado de undefined, va a llamar a una url que va a tener las key de page:"" -->

          <router-link
            v-if="nextPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Next
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<!-- Vue 2 y 3 mix, old form -->
<!-- <script>
// import axios from 'axios';
import JobListing from '@/components/JobResults/JobListing.vue';

import { mapActions, mapState } from 'pinia';
import {
  useJobsStore,
  FETCH_JOBS,
  // FILTERED_JOBS_BY_ORGANIZATIONS,
  // FILTERED_JOBS_BY_JOB_TYPE,
  FILTERED_JOBS,
} from '@/stores/jobs.js';

export default {
  name: 'JobListings',
  components: {
    JobListing,
  },
  // data() {
  //   return {
  //     jobs: [],
  //   };
  // },
  computed: {
    ...mapState(useJobsStore, [FILTERED_JOBS]),
    // ...mapState(useJobsStore, ['jobs']),
    //también se puede pasar un segundo argumento que sea un objeto y no un array, lo único es que dentro del objeto habrá que definir un nombre de method/propertie y a ese asignarle el nombre en string de que state estará apuntando, osea { cualquierNombre: 'jobs'}, entonces ahora tendríamos this.cualquierNombre, el cual devuelve el state de jobs de nuestro store "jobs" de nuestro archivo "jobs.js"

    currentPage() {
      return Number.parseInt(this.$route.query.page || '1');
    },
    previousPage() {
      return this.currentPage - 1 >= 1 ? this.currentPage - 1 : undefined;
    },
    nextPage() {
      // return this.currentPage + 1 <= Math.ceil(this.jobs.length / 10)
      return this.currentPage + 1 <= Math.ceil(this.FILTERED_JOBS.length / 10)
        ? this.currentPage + 1
        : undefined;
    },

    displayedJobs() {
      const pageNumber = this.currentPage;
      //no necesita ser llamada la función, Vue lo hará al estar en computed
      // const lengthJobIndex = this.jobs.length;
      const firstJobIndex = (pageNumber - 1) * 10;
      const lastJobIndex =
        pageNumber * 10 < this.FILTERED_JOBS.length ? pageNumber * 10 : this.FILTERED_JOBS.length;
      // const lastJobIndex = pageNumber * 10 < this.jobs.length ? pageNumber * 10 : this.jobs.length;
      return this.FILTERED_JOBS.slice(firstJobIndex, lastJobIndex);
      // return this.jobs.slice(firstJobIndex, lastJobIndex);
    },
  },

  async mounted() {
    // // const baseUrl = import.meta.env.VITE_APP_API_URL;
    // const response = await axios.get(`${import.meta.env.VITE_APP_API_URL}/jobs`);
    // this.jobs = response.data;
    // // console.log(response.data);
    this.FETCH_JOBS();
  },

  methods: {
    ...mapActions(useJobsStore, [FETCH_JOBS]),
    //aquí podríamos cometer errores de typing, podríamos poner por error FETCH_JOS por ejemplo, y pinia simplemente ignoraria todo y nos costaría encontrar que pasó, por eso razón importamos la variable FETCH_JOBS de nuestro archivo jobs.js, para que nos ayude VSCode a referenciarlo sin errores
    //mapActions a su vez va a llamar correctamente el actions correspondiente y ponerlo en this, osea, ahora podemos llamar en cualquier parte a this.FETCH_JOBS(), que actualizará nuestro state de jobs de nuestro archivo jobs.js con la respuesta de la API... como nuestro state jobs habrá sido modificado, computed se ejecuta, por lo que mapState nos va a devolver el array que contiene el listado de información del API (nuestro array que contiene nuestros trabajos) y lo pondrá disponible en this también, osea que tendremos disponible this.jobs, y por consiguiente se ejecta también todo lo que restaría actualizar contenido en computed, simple verdad?.
  },
};
</script> -->

<script lang="ts" setup>
import JobListing from '@/components/JobResults/JobListing.vue';
import { useJobsStore } from '@/stores/jobs';
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import usePreviosAndNextPages from '@/composables/usePreviosAndNextPages';
import { useDegreesStore } from '@/stores/degrees';

const jobsStore = useJobsStore();
const degreesStore = useDegreesStore();
const route = useRoute();

const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS);

const currentPage = computed(() => Number.parseInt((route.query.page as string) || '1'));
//aquí le debemos decir que route.query.page será un string siempre
const maxPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10));
const { previousPage, nextPage } = usePreviosAndNextPages(currentPage, maxPage);
//no se necestia usar ref o toRef porque usePreviosAndNExtPages devuelve dos funciones ya reactivas que no vamos a sobreescribir

const displayedJobs = computed(() => {
  const pageNumber = currentPage.value;
  const firstJobIndex = (pageNumber - 1) * 10;
  const lastJobIndex =
    pageNumber * 10 < FILTERED_JOBS.value.length ? pageNumber * 10 : FILTERED_JOBS.value.length;
  // const lastJobIndex = pageNumber * 10 < this.jobs.length ? pageNumber * 10 : this.jobs.length;
  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex);
});

onMounted(() => {
  jobsStore.FETCH_JOBS();
  degreesStore.FETCH_DEGREES();
});
</script>
