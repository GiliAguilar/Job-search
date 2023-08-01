import { createPinia, setActivePinia } from 'pinia';
import axios from 'axios';

vi.mock('axios');

import { useJobsStore } from '@/stores/jobs';
import { useUserStore } from '@/stores/user';

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('stores job listings', () => {
    const store = useJobsStore();

    expect(store.jobs).toEqual([]);
  });
});

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('FETCH_JOBS', () => {
    it('makes API request and stores received jobs', async () => {
      axios.get.mockResolvedValue({ data: ['job 1', 'job 2'] });
      const store = useJobsStore();
      await store.FETCH_JOBS();
      //si se coloca await con useJobsStore(), por alguna razón regresa undefined... no se... por eso se coloca el await con store.FETCH_JOBS();

      expect(store.jobs).toEqual(['job 1', 'job 2']);
    });
  });
});

describe('getters', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('UNIQUE_ORGANIZATIONS', () => {
    it('finds unique organizations from list of jobs', () => {
      const store = useJobsStore();
      store.jobs = [
        { organization: 'Google' },
        { organization: 'Google' },
        { organization: 'Amazon' },
      ];
      //como getters necesita que state cambie para que se ejecute, para simular el cambio de store simplemente sobreescribimos o ponemos cualquier cosa en nuestro store, y getters debería auto ejecutarse
      const result = store.UNIQUE_ORGANIZATIONS;
      expect(result).toEqual(new Set(['Google', 'Amazon']));
    });
  });

  describe('FILTERED_JOBS_BY_ORGANIZATIONS', () => {
    it('identifies jobs that are associated with the given organizations', () => {
      const jobsStore = useJobsStore();
      jobsStore.jobs = [
        { organization: 'Google' },
        { organization: 'Amazon' },
        { organization: 'Microsoft' },
      ];
      const userStore = useUserStore();
      userStore.selectedOrganizations = ['Google', 'Microsoft'];

      const result = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS;

      expect(result).toEqual([{ organization: 'Google' }, { organization: 'Microsoft' }]);
    });
  });
});