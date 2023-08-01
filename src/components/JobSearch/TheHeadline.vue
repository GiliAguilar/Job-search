<template>
  <section class="mb-16">
    <h1 class="mb-14 text-8xl font-bold tracking-tighter">
      <span :class="actionClasses">{{ actionDefault }}</span>
      <br />
      for everyone
    </h1>
    <h2 class="text-3xl font-light">Find your next job at GoogleClone corp</h2>
  </section>
</template>

<script>
import nextElementInList from '@/utils/nextElementInList.js';

export default {
  name: 'TheHeadline',

  data() {
    return {
      actionDefault: String,
      actions: ['Build', 'Create', 'Design', 'Code'],
      interval: Object,
    };
  },

  computed: {
    actionClasses() {
      return {
        [this.actionDefault.toLowerCase()]: true,
      };
    },
  },

  beforeMount() {
    this.actionDefault = this.actions[0];
  },

  mounted() {
    // console.log(`I'ven been mounted. My data exists. Look: ${this.actions}`);
    this.changeTitle();
  },
  //beforeCreate() función de Vue.js, se ejecuta una función antes de, digamos, crear lo solicitado
  //created() es una función de Vue.js; esta se ejecuta despues de crea todo el componente (en este caso, TheHeadline.vue), de esta forma podemos decirle que ejecute una función después de haberse creado lo observado (TheHeadline.vue)
  //beforeMounted() función de vue.js, esta se ejecuta despues de crear lo solicitado y antes de montarlo (renderizarlo)
  //mounted() función de vue.js, esta se ejecuta despues de haberse creado lo solicitado y haberse renderizado

  beforeUnmount() {
    clearInterval(this.interval);
  },
  //beforeUnmount() ejecuta funciones antes que desmontamos lo solicitado o lo eliminamos, en este caso TheHeadline.vue

  methods: {
    changeTitle() {
      this.interval = setInterval(() => {
        this.actionDefault = nextElementInList(this.actions, this.actionDefault);
      }, 3000);
    },
  },
};
</script>

<style scoped>
.build {
  color: #1a73e8;
}
.create {
  color: #34a853;
}
.design {
  color: #f9ab00;
}
.code {
  color: #d93025;
}
</style>
