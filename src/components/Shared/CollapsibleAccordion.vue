<template>
  <div class="border-b border-solid border-brand-gray-2 pb-2 pt-5">
    <div
      class="flex cursor-pointer flex-wrap items-center justify-between"
      role="button"
      @click="open"
    >
      <h3 class="text-base font-semibold">{{ header }}</h3>
      <font-awesome-icon :icon="caretIcon" />
    </div>

    <div v-if="isOpen" class="mt-5 w-full">
      <slot>
        <p>Nothing has been passed</p>
      </slot>
    </div>
    <!-- slot sirve para inyectar código HTML de nuestro padre a nuestro hijo, y en nuestro padre solo debemos llamar al componente hijo, sin usar el metodo abreviado de cerrado "<collapsible-accordion> hola </collapsible-accordion>", lo que se inyectará en nuestro slot será "hola", si el padre NO pasa nada, se inyecta lo que se escribe en slot "<slot> Nada </slot>" -->
  </div>
</template>

<!-- Antigua forma de escribir en Vue 2 y Vue 3 -->
<!-- <script>
//Vue 3
import { ref, computed } from 'vue';

export default {
  name: 'CollapsibleAccordion',
  //Vue 3
  //Vue 2 utiliza básicamente los componentes que lo conforman por separado en el script, osea, props, data, computed, methods, etc, con Vue 3 utilizamos un solo archivo de configuración para todo, llamado setup() {}, el cual siempre debe regresar la información que será utiliada por la sección de template y contiene básicamente todo lo que contiene Vue2 pero en un entorno identico a JavaScript, sin embargo, props y algunas otras funciones siempre deben mantenerse fuera de setup
  props: {
    header: {
      type: String,
      required: true,
    },
  },
  setup() {
    const isOpen = ref(false);

    const open = () => {
      isOpen.value = !isOpen.value;
    };
    const caretIcon = computed(() => (isOpen.value ? 'fa-angle-up' : 'fa-angle-down'));

    return { isOpen, open, caretIcon };
    //en return, realmente estamos devolviendo objeto header, sin embargo, Vue reconoce que es un objeto reactive, por lo que no requiere que en <template> necesitemos tuilizar header.value, automáticamente reconoce el valor del objeto, por lo que podemos llamar directamente como header en template
  },

  //Vue 2, optional method
  // props: {
  //   header: {
  //     type: String,
  //     required: true,
  //   },
  // },

  // data() {
  //   return {
  //     isOpen: false,
  //   };
  // },

  // computed: {
  //   caretIcon() {
  //     return this.isOpen ? 'fa-angle-up' : 'fa-angle-down';
  //   },
  // },

  // methods: {
  //   open() {
  //     this.isOpen = !this.isOpen;
  //   },
  // },
};
</script> -->

<!-- Nueva forma de escribir con Vue 3.2 -->
<script lang="ts" setup>
import { computed, ref } from 'vue';

defineProps({
  header: {
    type: String,
    required: true,
  },
});

const isOpen = ref(false);

const open = () => {
  isOpen.value = !isOpen.value;
};

const caretIcon = computed(() => (isOpen.value ? 'fa-angle-up' : 'fa-angle-down'));
</script>
