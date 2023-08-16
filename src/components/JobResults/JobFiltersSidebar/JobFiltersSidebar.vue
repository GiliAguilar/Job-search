<template>
  <div class="flex w-96 flex-col border-r border-solid border-brand-gray-1 bg-white p-4">
    <section class="pb-5">
      <div class="flex flex-row justify-between">
        <h3 class="my-4 text-base font-semibold">What do you want to do?</h3>
        <div class="flex items-center text-sm">
          <action-button text="Clear Filters" type="secondary" />
        </div>
      </div>

      <CollapsibleAccordion header="Degree"></CollapsibleAccordion>

      <job-filters-sidebar-checkbox-group
        header="Job types"
        :unique-values="UNIQUE_JOB_TYPES"
        :action="userStore.ADD_SELECTED_JOB_TYPES"
      />
      <job-filters-sidebar-checkbox-group
        header="Organizations"
        :unique-values="UNIQUE_ORGANIZATIONS"
        :action="userStore.ADD_SELECTED_ORGANIZATIONS"
      />

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
<script setup>
import ActionButton from '@/components/Shared/ActionButton.vue';
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue';
import { computed } from 'vue';
import JobFiltersSidebarCheckboxGroup from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue';

import { useUserStore } from '@/stores/user.js';
import { useJobsStore } from '@/stores/jobs.js';

const jobsStore = useJobsStore();
const userStore = useUserStore();

const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS);
const UNIQUE_JOB_TYPES = computed(() => jobsStore.UNIQUE_JOB_TYPES);
</script>
