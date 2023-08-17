import { computed } from 'vue';

const usePreviousAndNextPages = (currentPage, maxPage) => {
  const previousPage = computed(() =>
    currentPage.value - 1 >= 1 ? currentPage.value - 1 : undefined
  );
  const nextPage = computed(() =>
    currentPage.value + 1 <= maxPage.value ? currentPage.value + 1 : undefined
  );

  return { previousPage, nextPage };
};

export default usePreviousAndNextPages;
