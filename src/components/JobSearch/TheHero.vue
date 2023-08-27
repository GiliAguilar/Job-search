<template>
  <main class="flex h-screen flex-col">
    <section class="pb-20 pt-10">
      <div class="grid grid-cols-12">
        <div class="col-span-1 col-start-1"></div>
        <div class="col-span-5 col-start-2">
          <the-headline />
          <job-search-form />
        </div>
        <div class="selft-center col-span-5 col-start-7 justify-self-center">
          <img :src="imgDefault" class="h-auto w-80 object-fill" />
        </div>
        <div class="col-span-1 col-start-12"></div>
      </div>
    </section>

    <spot-light class="flex flex-row justify-center pb-16">
      <template #default="{ img, title, description }">
        <!-- <template #default="slotProps"> -->
        <!-- v-slot:default="slotProps" es simplemente como recibimos la información del hijo, en forma de objeto... v-slot:default apunta al slot de nuestro hijo, y cuando hacemos v-slot:default="cualquierNombre", se crea un objeto con nombre "cualquierNombre" que recibe todo lo que el hijo esté mandando con v-bind="", así que basicamente tenemos un objeto aquí en estas lineas llamado 
          slotProps{
            spotlight: {
              id..., 
              img..., 
              etc...,
            }, 
          };
        objeto disponible para este template según entiendo
        -->
        <router-link
          to="/jobs/results"
          class="mx-5 flex h-96 w-72 flex-col rounded-lg border bg-brand-gray-2"
        >
          <img :src="img" class="object-contain" />
          <!-- <img :src="slotProps.img" class="object-contain" /> -->
          <!-- <img :src="slotProps.spotlight.img" class="object-contain" /> -->
          <!-- aquí hay que usar v-bind:src porque la imagen que recibe es dinámica, osea que vue tiene que observar si hay cambios, si no se pone v-bind: no hará nada porque recibe todo como texto digamos, recibe como texto toda la cadena de slotProps.spotlight.img. -->
          <div class="mt-3 h-48 px-6 py-4">
            <h3 class="text-lg font-medium">{{ title }}</h3>
            <!-- <h3 class="text-lg font-medium">{{ slotProps.title }}</h3> -->
            <!-- <h3 class="text-lg font-medium">{{ slotProps.spotlight.title }}</h3> -->
            <p class="mt-3 text-sm">{{ description }}</p>
            <!-- <p class="mt-3 text-sm">{{ slotProps.description }}</p> -->
            <!-- <p class="mt-3 text-sm">{{ slotProps.spotlight.description }}</p> -->
          </div>
          <router-link to="/jobs/results" class="px-6 pb-4 text-sm text-brand-blue-1"
            >See jobs</router-link
          >
        </router-link>
      </template>
    </spot-light>
    <!--     la idea de mandar información del hijo al padre, es para que podamos usar el hijo para conseguir la información, incluso hacer las iteraciones y mandar mucha información, y con el componente padre darle un formato a cada dato que se obtiene, sin modificar al hijo, de forma que, podemos utilizar al hijo como fuente de información y poner condiciones CSS en el padre, algo así... -->
  </main>
</template>

<script lang="ts" setup>
import TheHeadline from '@/components/JobSearch/TheHeadline.vue';
import JobSearchForm from '@/components/JobSearch/JobSearchForm.vue';
import nextElementInList from '@/utils/nextElementInList';
import SpotLight from '@/components/JobSearch/SpotLight.vue';
import { ref, onBeforeMount, onBeforeUnmount } from 'vue';

const imgDefault = ref('');
const imgsSource = [
  'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png',
  'https://careers.google.com/jobs/dist/img/assets/hero-01_2x.c2fe6113bb7d49f4a88f61d357d12c5f.png',
  'https://careers.google.com/jobs/dist/img/assets/hero-02_2x.f60a10f602717bcaed45a9b410214f2e.png',
  'https://careers.google.com/jobs/dist/img/assets/hero-03_2x.72ad08e961e00459fc72fa7bb7c121d6.png',
  'https://careers.google.com/jobs/dist/img/assets/hero-04_2x.b2bd827dc40d5593846a2bc1a8b5ad4e.png',
];
const interval = ref<ReturnType<typeof setInterval>>();

onBeforeMount(() => {
  imgDefault.value = imgsSource[0];
  imgSlice();
});

onBeforeUnmount(() => {
  clearInterval(interval.value);
});

const imgSlice = () => {
  interval.value = setInterval(() => {
    imgDefault.value = nextElementInList(imgsSource, imgDefault.value);
  }, 4000);
};
</script>

<!-- Vue 2 y 3, old form
<script lang="ts" setup>
import TheHeadline from '@/components/JobSearch/TheHeadline.vue';
import JobSearchForm from '@/components/JobSearch/JobSearchForm.vue';
import nextElementInList from '@/utils/nextElementInList';
import SpotLight from '@/components/JobSearch/SpotLight.vue';

export default {
  name: 'TheHero',
  components: {
    TheHeadline,
    JobSearchForm,
    SpotLight,
  },
  data() {
    return {
      imgDefault: String,
      imgsSource: [
        'https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Vue.js_Logo_2.svg/2367px-Vue.js_Logo_2.svg.png',
        'https://careers.google.com/jobs/dist/img/assets/hero-01_2x.c2fe6113bb7d49f4a88f61d357d12c5f.png',
        'https://careers.google.com/jobs/dist/img/assets/hero-02_2x.f60a10f602717bcaed45a9b410214f2e.png',
        'https://careers.google.com/jobs/dist/img/assets/hero-03_2x.72ad08e961e00459fc72fa7bb7c121d6.png',
        'https://careers.google.com/jobs/dist/img/assets/hero-04_2x.b2bd827dc40d5593846a2bc1a8b5ad4e.png',
      ],
      interval: Object,
    };
  },
  /*
  beforeCreate() {
    console.log('component is about to be created');
  },
  created() {
    console.log('component has been created');
  },
  beforeMount() {
    console.log('component is about to be mounted');
  },
  mounted() {
    console.log('component has been mounted in the DOM');
  },
  //estas cuatro funciones sirven para insertar código en los diferentes estados de una operación que esté haciendo vue, especialmente cuando se utilizan api y funciones async
  */
  beforeMount() {
    this.imgDefault = this.imgsSource[0];
    this.imgSlice();
  },
  beforeUnmount() {
    clearInterval(this.interval);
  },

  methods: {
    imgSlice() {
      this.interval = setInterval(() => {
        this.imgDefault = nextElementInList(this.imgsSource, this.imgDefault);
      }, 4000);
    },
  },
};
</script>
 -->
