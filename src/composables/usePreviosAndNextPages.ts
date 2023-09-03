import { type Ref, computed } from 'vue';

const usePreviousAndNextPages = (currentPage: Ref<number>, maxPage: Ref<number>) => {
  const previousPage = computed(() =>
    currentPage.value - 1 >= 1 ? currentPage.value - 1 : undefined
  );
  const nextPage = computed(() =>
    currentPage.value + 1 <= maxPage.value ? currentPage.value + 1 : undefined
  );

  return { previousPage, nextPage };
};

export default usePreviousAndNextPages;
