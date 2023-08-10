<template>
  <collapsible-accordion header="Job types">
    <fieldset>
      <ul class="flex flex-row flex-wrap">
        <li v-for="i in UNIQUE_JOB_TYPES" :key="i" class="h-8 w-1/2">
          <input
            :id="i"
            v-model="selectedJobTypes"
            :value="i"
            type="checkbox"
            class="mr-3"
            @change="selectJobTypes"
          />

          <label :for="i">{{ i }}</label>
        </li>
      </ul>
    </fieldset>
  </collapsible-accordion>
</template>

<script>
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue';
import { mapState, mapActions } from 'pinia';
import { useJobsStore, UNIQUE_JOB_TYPES } from '@/stores/jobs';
import { useUserStore, ADD_SELECTED_JOB_TYPES } from '@/stores/user';

export default {
  name: 'JobFiltersSidebarJobTypes',

  components: {
    CollapsibleAccordion,
  },

  data() {
    return {
      selectedJobTypes: [],
    };
  },

  computed: {
    ...mapState(useJobsStore, [UNIQUE_JOB_TYPES]),
  },

  methods: {
    ...mapActions(useUserStore, [ADD_SELECTED_JOB_TYPES]),
    selectJobTypes() {
      this.ADD_SELECTED_JOB_TYPES(this.selectedJobTypes);
      this.$router.push({ name: 'JobResults' });
      //esta última línea lo que hará es que cada vez que hagamos un checkbox nos va a enviar a la primera página de resultados
    },
  },
};
</script>
