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

<!-- Vue 3.2 -->
<script lang="ts" setup>
import nextElementInList from '@/utils/nextElementInList';
import { ref, computed, onBeforeMount, onMounted, onBeforeUnmount } from 'vue';

const actions = ref(['Build', 'Create', 'Design', 'Code']);
const actionDefault = ref('');
const interval = ref<ReturnType<typeof setInterval>>();
//este es un truco, le decimos que ponga aquí el tipo de variable que regresa de la función setInterval(), que es una función de JavaScript

const actionClasses = computed(() => ({ [actionDefault.value.toLocaleLowerCase()]: true }));
const changeTitle = () => {
  interval.value = setInterval(() => {
    actionDefault.value = nextElementInList(actions.value, actionDefault.value);
  }, 3000);
};

onBeforeMount(() => {
  actionDefault.value = actions.value[0];
});
onMounted(changeTitle);
// onMounted(() => {
//   changeTitle();
// });
onBeforeUnmount(() => {
  clearInterval(interval.value);
});
</script>

<!-- Vue 2 y 3 old form -->
<!-- <script>
import nextElementInList from '@/utils/nextElementInList.ts';

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
</script> -->

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
