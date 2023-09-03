<template>
  <div class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4">
    <section class="pb-5">
      <job-filters-sidebar-prompt />
      <!-- <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <action-button
            text="Clear Filters"
            type="secondary"
            @click="userStore.CLEAR_USER_JOB_FILTER_SELECTIONS"
          />
        </div>
      </div> -->

      <!-- <CollapsibleAccordion header="Degree"></CollapsibleAccordion> -->

      <job-filters-sidebar-skills />

      <collapsible-accordion header="Degrees">
        <job-filters-sidebar-degrees />
      </collapsible-accordion>

      <!-- <job-filters-sidebar-checkbox-group
        header="Degrees"
        :unique-values="UNIQUE_DEGREES"
        :action="userStore.ADD_SELECTED_DEGREES"
      /> -->
      <!-- aquí unique_values daba error de tipo, porque UNIQUE_DEGREES es un array, y esperaba originalmente un Set, por lo que se modifica el tipo de lo que se espera, en el componente que se está llamando, en este caso JobFiltersSidebarCheckboxGroup -->

      <collapsible-accordion header="Job types">
        <job-filters-sidebar-job-types />
      </collapsible-accordion>

      <collapsible-accordion header="Organizations">
        <job-filters-sidebar-organizations />
      </collapsible-accordion>

      <!-- <job-filters-sidebar-job-types />
      <job-filters-sidebar-organizations /> -->
    </section>
  </div>
</template>

<!-- Vue 2 y 3, old mix -->
<!-- <script>
import ActionButton from '@/components/Shared/ActionButton.vue';
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue';
import JobFiltersSidebarOrganizations from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue';
import JobFiltersSidebarJobTypes from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue';

export default {
  name: 'JobFiltersSidebar',
  components: {
    ActionButton,
    CollapsibleAccordion,
    JobFiltersSidebarOrganizations,
    JobFiltersSidebarJobTypes,
  },
};
</script> -->

<!-- Vue 3.2, new form, replacing old jobFilterSidebard -->
<script lang="ts" setup>
import ActionButton from '@/components/Shared/ActionButton.vue';
// import { computed } from 'vue';
// import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue';
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue';
import JobFiltersSidebarDegrees from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarDegrees.vue';
import JobFiltersSidebarJobTypes from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue';
import JobFiltersSidebarOrganizations from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue';
import JobFiltersSidebarPrompt from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarPrompt.vue';

import JobFiltersSidebarSkills from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarSkills.vue';

import { onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useUserStore } from '@/stores/user';

// import { useUserStore } from '@/stores/user';
// import { useJobsStore } from '@/stores/jobs';
// import { useDegreesStore } from '@/stores/degrees';

// const userStore = useUserStore();
// const jobsStore = useJobsStore();
// const degreesStore = useDegreesStore();

// const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS);
// const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES);
// const UNIQUE_DEGREES = computed(() => degreesStore.UNIQUE_DEGREES);

const route = useRoute();
const userStore = useUserStore();

onMounted(() => {
  const role = (route.query.role as string) || '';
  userStore.UPDATE_SKILLS_SEARCH_TERM(role);
});
//aquí lo que estamos haciendo es decirle que lea nuestra key de nuestro url, si tiene información en la key role, que la ponga directamente en nuestro userStore
</script>
