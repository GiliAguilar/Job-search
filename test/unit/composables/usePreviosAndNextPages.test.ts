import usePreviousAndNextPages from '@/composables/usePreviosAndNextPages';

import { ref } from 'vue';

describe('usePreviosAndNextPages', () => {
  it('calculates page before current one', () => {
    const currentPage = ref(8);
    //aquí en vez de usar {value:8}, pasamos ref(8), porque es lo que nuestro test espera, una referenca que contenga un number.
    // const currentPage = { value: 8 };
    const maxPage = ref(10);
    // const maxPage = { value: 10 };

    const { previousPage } = usePreviousAndNextPages(currentPage, maxPage);
    expect(previousPage.value).toBe(7);
  });
  describe('when current page is the first page', () => {
    it('does not provide previous page', () => {
      const currentPage = ref(1);
      const maxPage = ref(1);

      const { previousPage } = usePreviousAndNextPages(currentPage, maxPage);
      expect(previousPage.value).toBeUndefined();
    });
  });
  it('calculates page after current one', () => {
    const currentPage = ref(8);
    const maxPage = ref(10);

    const { nextPage } = usePreviousAndNextPages(currentPage, maxPage);
    expect(nextPage.value).toBe(9);
  });
  describe('when current page is the last page', () => {
    it('does not provide next page', () => {
      const currentPage = ref(8);
      const maxPage = ref(8);

      const { nextPage } = usePreviousAndNextPages(currentPage, maxPage);
      expect(nextPage.value).toBeUndefined();
    });
  });
});
