import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Degree } from '@/api/types';
import getDegrees from '@/api/getDegrees';

export const useDegreesStore = defineStore('degrees', () => {
  const degrees = ref<Degree[]>([]);

  const FETCH_DEGREES = async () => {
    const received = await getDegrees();
    degrees.value = received;
  };

  const UNIQUE_DEGREES = computed(() => degrees.value.map((i) => i.degree));
  return { degrees, FETCH_DEGREES, UNIQUE_DEGREES };
});
