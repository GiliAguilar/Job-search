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

<script lang="ts" setup>
import nextElementInList from '@/utils/nextElementInList';
import { ref, computed, onBeforeMount, onMounted, onBeforeUnmount } from 'vue';

const actions = ref(['Build', 'Create', 'Design', 'Code']);
const actionDefault = ref('');
const interval = ref<ReturnType<typeof setInterval>>();

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
onBeforeUnmount(() => {
  clearInterval(interval.value);
});
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
