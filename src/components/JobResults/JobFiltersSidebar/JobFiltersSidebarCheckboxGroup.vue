<template>
  <collapsible-accordion :header="header">
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
  </collapsible-accordion>
</template>

<script setup>
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  header: {
    type: String,
    required: true,
  },
  uniqueValues: {
    type: Set,
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
});

const selectedValues = ref([]);
const router = useRouter();

const selectValue = () => {
  props.action(selectedValues.value);
  router.push({ name: 'JobResults' });
};
</script>
