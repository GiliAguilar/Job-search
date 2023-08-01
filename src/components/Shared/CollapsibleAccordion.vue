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

<script>
export default {
  name: 'CollapsibleAccordion',

  props: {
    header: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      isOpen: false,
    };
  },

  computed: {
    caretIcon() {
      return this.isOpen ? 'fa-angle-up' : 'fa-angle-down';
    },
  },

  methods: {
    open() {
      this.isOpen = !this.isOpen;
    },
  },
};
</script>
