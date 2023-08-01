import { render, screen } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';
import { createTestingPinia } from '@pinia/testing';

// import axios from 'axios';

import JobListings from '@/components/JobResults/JobListings.vue';

// vi.mock('axios');
//esto hará que cada vez que llamemos a axios, todas sus propiedades sean reemplazadas con funciones vi mock, osea, falsas, para simular su funcionamiento

import { useJobsStore } from '@/stores/jobs';

describe('JobListings', () => {
  const renderJobListing = (queryParams = {}) => {
    const pinia = createTestingPinia();

    render(JobListings, {
      global: {
        plugins: [pinia],

        mocks: {
          $route: {
            query: {
              page: '2',
              ...queryParams,
            },
          },
        },
        stubs: {
          'router-link': RouterLinkStub,
        },
      },
    });
  };

  it('fetches jobs', () => {
    // axios.get.mockResolvedValue({ data: [] });
    //axios.get.mockResolvedValue() lo que hará el mockResolvedValue es simular una respuesta de nuestro API, osea, el contenido que le pasamos va a simular que es la respuesta de nuestro API que se obtuvo a través de get

    renderJobListing();

    const jobsStore = useJobsStore();

    // expect(axios.get).toHaveBeenCalledWith('http://myfakeapi.com/jobs');
    //este url es el que se crea siempre con axios, siempre... y termina con jobs porque eso es lo que va a montar la función mounted()

    expect(jobsStore.FETCH_JOBS).toHaveBeenCalled();
  });

  it('displays maximum of 10 jobs', async () => {
    // axios.get.mockResolvedValue({ data: Array(15).fill({}) });
    //Array(#).fill() lo que hace es que crea un array, o varios array, en este caso 15, y luego con fill los llena con lo mismo a todos, en este caso, un objeto vacío.

    renderJobListing();

    const jobsStore = useJobsStore();
    jobsStore.jobs = Array(15).fill({});

    const JobListings = await screen.findAllByRole('listitem');
    //aquí el test está medio raro medio laboroso medio rebuscado... hay que utilizar findAllByRole en vez de getAllByRole, porque get es una operación sincronoma, mientras que find es asincronoma, y pasa que si no se maneja con await, el test busca un listado de items de 15 objetos, y no encuentra nada, porque aún no se han escrito en el html del dom virtual del test, al usar find, que es asincronomo, y al usar await, hacemos que la ejecución de la siguiente linea de expect espere a que se escriba en html lo que necesitamos para que lo busque y evalue...

    expect(JobListings).toHaveLength(5);
  });

  describe('when params exclude page number', () => {
    it('displays page number 1', () => {
      renderJobListing({ page: undefined });

      expect(screen.getByText('Page 1')).toBeInTheDocument();
    });

    it('displays page number 3', () => {
      renderJobListing({ page: '3' });

      expect(screen.getByText('Page 3')).toBeInTheDocument();
    });
  });

  describe('when user is on first page', () => {
    it('does not show link to previous page', async () => {
      // axios.get.mockResolvedValue({ data: Array(15).fill({}) });

      renderJobListing({ page: '1' });

      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});

      await screen.findAllByRole('listitem');

      const previousLink = screen.queryByRole('link', { name: /previous/i });
      //queryByRole se usa para saber si está o no un elemento... en este caso, si no está devuelve "undefined/null"
      expect(previousLink).not.toBeInTheDocument();
    });

    it('shows link to next page', async () => {
      // axios.get.mockResolvedValue({ data: Array(15).fill({}) });

      renderJobListing({ page: '1' });

      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});

      await screen.findAllByRole('listitem');
      const nextLink = screen.queryByRole('link', { name: /next/i });
      //para que el test funcione, hay que agregarle al router-link que estemos probando un role="", en este caso el role sería "link" porque eso estamos buscando, un link que se llame Next, pero VueTestingLibrary no reconoce route-link como se ha dicho, por eso si le asignamos un role, el test lo buscará con el role="link"
      expect(nextLink).toBeInTheDocument();
    });
  });

  describe('when user is on last page', () => {
    it('does not show link to next page', async () => {
      // axios.get.mockResolvedValue({ data: Array(15).fill({}) });

      renderJobListing({ page: '2' });

      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});

      await screen.findAllByRole('listitem');

      const nextLink = screen.queryByRole('link', { name: /next/i });
      //queryByRole se usa para saber si está o no un elemento... en este caso, si no está devuelve "undefined/null"
      expect(nextLink).not.toBeInTheDocument();
    });

    it('shows link to previous page', async () => {
      // axios.get.mockResolvedValue({ data: Array(15).fill({}) });

      renderJobListing({ page: '2' });

      const jobsStore = useJobsStore();
      jobsStore.jobs = Array(15).fill({});

      await screen.findAllByRole('listitem');
      const previousLink = screen.queryByRole('link', { name: /previous/i });
      //para que el test funcione, hay que agregarle al router-link que estemos probando un role="", en este caso el role sería "link" porque eso estamos buscando, un link que se llame Next, pero VueTestingLibrary no reconoce route-link como se ha dicho, por eso si le asignamos un role, el test lo buscará con el role="link"
      expect(previousLink).toBeInTheDocument();
    });
  });
});
