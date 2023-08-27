<template>
  <li class="mb-7">
    <router-link
      :to="jobPageLink"
      class="mx-auto block rounded border border-solid border-brand-gray-2 bg-white hover:shadow-gray"
    >
      <div class="mx-8 border-b border-solid border-brand-gray-2 pb-2 pt-5">
        <h2 class="mb-2 text-2xl">{{ job.title }}</h2>
        <div class="flex flex-row align-middle">
          <div class="mr-5">
            <span>{{ job.organization }}</span>
          </div>
          <div>
            <ul>
              <li v-for="location in job.locations" :key="location" class="mr-2 inline-block">
                <span>{{ location }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div class="px-8 py-4">
        <div>
          <h3 class="mb-2 mt-1">Qualifications:</h3>
          <div>
            <ul class="list-disc pl-8">
              <li v-for="qualification in job.minimumQualifications" :key="qualification">
                {{ qualification }}
              </li>
            </ul>
          </div>
        </div>

        <div class="mt-2 text-center">
          <router-link :to="jobPageLink" class="text-brand-blue-1">Expand</router-link>
        </div>
      </div>
    </router-link>
  </li>
</template>

<!-- Vue 2 y 3, mix old form -->
<!-- <script>
export default {
  name: 'JobListing',
  props: {
    job: {
      type: Object,
      require: true,
      default: null,
    },
  },

  computed: {
    jobPageLink() {
      return `/jobs/results/${this.job.id}`;
    },
  },
};
</script> -->

<!-- Vue 3.2 -->
<script lang="ts" setup>
import { computed, type PropType } from 'vue';

import type { Job } from '@/api/types';

const props = defineProps({
  job: {
    type: Object as PropType<Job>,
    //PropType sirve para decirle a un props, que tipo de datos recibirá, básicamente solo sirve para eso, no entiendo por que no usar directamente Job
    // pero ahora con esto, todo el código sabrá que debe recibir, incluyendo el template, la idea de TS es que nos corrija, para eso debemos ir configurando paso a paso
    require: true,
    default: null,
  },
});
const jobPageLink = () => `/jobs/results/${props.job.id}`;
</script>
