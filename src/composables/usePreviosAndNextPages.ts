import { type Ref, computed } from 'vue';

const usePreviousAndNextPages = (currentPage: Ref<number>, maxPage: Ref<number>) => {
  //currentPage y maxPage son objectos reactivos de Vue, por lo que hay que indicarle a TS como reconocer esto, para eso tenemos que usar Ref, pero para typo de datos, entonces tenemos que importar "type Ref" desde Vue. para usarlo, declaramos Ref, lo que por default declara como typo genérico, pero podemos especificar el tipo y que no sea genérico, con <>, por lo que ahora le estamos diciendo a currentPage que va a apuntar a un objeto reactivo de tipo number
  // const usePreviousAndNextPages = (currentPage, maxPage) => {
  const previousPage = computed(() =>
    currentPage.value - 1 >= 1 ? currentPage.value - 1 : undefined
  );
  const nextPage = computed(() =>
    currentPage.value + 1 <= maxPage.value ? currentPage.value + 1 : undefined
  );

  return { previousPage, nextPage };
};

export default usePreviousAndNextPages;
