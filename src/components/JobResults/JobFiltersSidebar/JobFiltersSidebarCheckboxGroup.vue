<template>
  <!-- <collapsible-accordion :header="header"> -->
  <fieldset>
    <ul class="flex flex-row flex-wrap">
      <li v-for="i in uniqueValues" :key="i" class="h-8 w-1/2">
        <input
          :id="i"
          v-model="selectedValues"
          :value="i"
          type="checkbox"
          class="mr-3"
          @change="selectValue"
        />

        <label :for="i">{{ i }}</label>
      </li>
    </ul>
  </fieldset>
  <!-- </collapsible-accordion> -->
</template>

<script lang="ts" setup>
// import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore, CLEAR_USER_JOB_FILTER_SELECTIONS } from '@/stores/user';

const props = defineProps({
  // header: {
  //   type: String,
  //   required: true,
  // },
  uniqueValues: {
    type: [Set<string>, Array<string>],
    //aquí podemos decirle que considere más de un tipo, usando una sintaxis de array
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
});

const selectedValues = ref<string[]>([]);
const router = useRouter();
const userStore = useUserStore();

const selectValue = () => {
  props.action(selectedValues.value);
  router.push({ name: 'JobResults' });
};
userStore.$onAction(({ after, name }) => {
  after(() => {
    if (name === CLEAR_USER_JOB_FILTER_SELECTIONS) {
      selectedValues.value = [];
    }
  });
});

//este $onAction es un method que utiliza Vue, que viene de Pinia, que sirve para reaccionar después de que es invocado algo... por eso el nombre after, y con name seleccionamos que acción es la que se ha invocado
</script>
