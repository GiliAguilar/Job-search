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
        <router-link
          to="/jobs/results"
          class="mx-5 flex h-96 w-72 flex-col rounded-lg border bg-brand-gray-2"
        >
          <img :src="img" class="object-contain" />
          <div class="mt-3 h-48 px-6 py-4">
            <h3 class="text-lg font-medium">{{ title }}</h3>
            <p class="mt-3 text-sm">{{ description }}</p>
          </div>
          <router-link to="/jobs/results" class="px-6 pb-4 text-sm text-brand-blue-1"
            >See jobs</router-link
          >
        </router-link>
      </template>
    </spot-light>
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
