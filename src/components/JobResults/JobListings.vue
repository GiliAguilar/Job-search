<template>
  <main class="flex-auto bg-brand-gray-2 p-8">
    <ol>
      <job-listing v-for="job in displayedJobs" :key="job.id" :job="job" />
    </ol>
    <div class="mx-auto mt-8">
      <div class="flex flex-row flex-nowrap">
        <p class="flex-grow text-sm">Page {{ currentPage }}</p>

        <div class="flex items-center justify-center">
          <router-link
            v-if="previousPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: previousPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Previous
          </router-link>

          <router-link
            v-if="nextPage"
            role="link"
            :to="{ name: 'JobResults', query: { page: nextPage } }"
            class="mx-3 text-sm font-semibold text-brand-blue-1"
          >
            Next
          </router-link>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
import JobListing from '@/components/JobResults/JobListing.vue';
import { useJobsStore } from '@/stores/jobs';
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import usePreviosAndNextPages from '@/composables/usePreviosAndNextPages';
import { useDegreesStore } from '@/stores/degrees';

const jobsStore = useJobsStore();
const degreesStore = useDegreesStore();
const route = useRoute();

const FILTERED_JOBS = computed(() => jobsStore.FILTERED_JOBS);
const currentPage = computed(() => Number.parseInt((route.query.page as string) || '1'));
const maxPage = computed(() => Math.ceil(FILTERED_JOBS.value.length / 10));
const { previousPage, nextPage } = usePreviosAndNextPages(currentPage, maxPage);

const displayedJobs = computed(() => {
  const pageNumber = currentPage.value;
  const firstJobIndex = (pageNumber - 1) * 10;
  const lastJobIndex =
    pageNumber * 10 < FILTERED_JOBS.value.length ? pageNumber * 10 : FILTERED_JOBS.value.length;
  return FILTERED_JOBS.value.slice(firstJobIndex, lastJobIndex);
});

onMounted(() => {
  jobsStore.FETCH_JOBS();
  degreesStore.FETCH_DEGREES();
});
</script>
