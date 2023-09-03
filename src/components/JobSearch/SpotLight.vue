<template>
  <ul>
    <li v-for="i in spotlights" :key="i.id">
      <slot :img="i.img" :title="i.title" :description="i.description"></slot>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';

interface SpotLight {
  id: number;
  img: string;
  title: string;
  description: string;
}

const spotlights = ref<SpotLight[]>([]);
const getSpotlights = async () => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;
  const url = `${baseUrl}/spotlights`;
  const response = await axios.get<SpotLight[]>(url);
  spotlights.value = response.data;
};
onMounted(getSpotlights);
</script>
