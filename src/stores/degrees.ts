import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { Degree } from '@/api/types';
import getDegrees from '@/api/getDegrees';

//nuevo método, diferente a los otros stores, en esta en vez de pasar un objeto como segundo argumento, pasaremos una función que devuelve el contenido que tendría state, actions y getters, utilizando ref, de modo que ya no habría la necesidad de utilizar una doble declaración de variables (es decir, la que se hacía fuera de defineStore con letras mayusculas)
export const useDegreesStore = defineStore('degrees', () => {
  //nuestro State, usamos ref para que este cambie cada vez que se actualiza algo
  const degrees = ref<Degree[]>([]);

  //nuestro Actions
  const FETCH_DEGREES = async () => {
    const received = await getDegrees();
    degrees.value = received;
  };

  //nuestro Getters, como realmente en Vue 2 y 3 es un computed de Vue, usamos computed aquí también
  const UNIQUE_DEGREES = computed(() => degrees.value.map((i) => i.degree));

  return { degrees, FETCH_DEGREES, UNIQUE_DEGREES };
});
