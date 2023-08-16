import { render, screen } from '@testing-library/vue';
import SubNav from '@/components/Navigation/SubNav.vue';

import { useJobsStore } from '@/stores/jobs';
import { createTestingPinia } from '@pinia/testing';

import { useRoute } from 'vue-router';
vi.mock('vue-router');

describe('SubNav', () => {
  const renderTheSubNav = () => {
    // const renderTheSubNav = (routeName) => {
    //para Vue 2 y 3, necesitamos pasar el parametro a la función renderTheSubNav, routeName
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();

    render(SubNav, {
      global: {
        plugins: [pinia],
        // mocks: {
        //   $route: {
        //     name: routeName,
        //   },
        // },
        //Vue 2 y 3
        //mocks sirve para reemplazar cualquier .this que sea global. Aquí estamos diciendole a la variable global $route, que no existe en el test pero si en el programa, que tiene una propiedad llamada name y que incluye "JobResults"
        stubs: {
          FontAwesomeIcon: true,
        },
      },
      //El test no tiene forma de saber que es fontawesome porque es algo global que añadimos, que no conoce, para evitar que de problemas, se utiliza global, lo que recibe un objeto, y dentro de el se utiliza un resguardo, un sustituto ligero dentro del virtual DOM que se crea con render, ese es stubs:, el cual también recibe un objeto... dentro especificamos a que nos referimos y asignamos true, eso en el virutal DOM sustituye (en este caso) el icono por algo más que el entiende y que no necesita renderizar.
    });

    //nuestro SubNave.vue busca una variable global $router para verificar si estamos en SubNave, y eso es lo que estamos simulando con mocks

    return { jobsStore };
  };

  describe('When user is on jobs page', () => {
    it('Displays job count', async () => {
      //Vue 3.2
      useRoute.mockReturnValue({ name: 'JobResults' });

      // const routeName = 'JobResults';

      const { jobsStore } = renderTheSubNav();
      // const { jobsStore } = renderTheSubNav(routeName);

      const numberOfJobs = 16;
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});

      const jobCount = await screen.findByText(numberOfJobs);
      expect(jobCount).toBeInTheDocument();
    });
  });

  describe('When user is not on jobs page', () => {
    it('It does NOT displays job count', () => {
      useRoute.mockReturnValue({ name: 'Home' });

      // const routeName = 'Home';
      const { jobsStore } = renderTheSubNav();
      // const { jobsStore } = renderTheSubNav(routeName);

      const numberOfJobs = 16;
      jobsStore.FILTERED_JOBS = Array(numberOfJobs).fill({});

      const jobCount = screen.queryByText(numberOfJobs);
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
