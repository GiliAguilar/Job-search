import type { Mock } from 'vitest';

import { createPinia, setActivePinia } from 'pinia';

import axios from 'axios';
import type { Job } from '@/api/types';

import { useJobsStore } from '@/stores/jobs';
import { useUserStore } from '@/stores/user';

vi.mock('axios');

const axiosGetMock = axios.get as Mock;

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('stores job listing', () => {
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
      axiosGetMock.mockResolvedValue({ data: ['Job 1', 'Job 2'] });
      // axios.get.mockResolvedValue({ data: ['Job 1', 'Job 2'] });
      const store = useJobsStore();
      await store.FETCH_JOBS();
      expect(store.jobs).toEqual(['Job 1', 'Job 2']);
    });
  });
});

describe('getters', () => {
  const createJob = (job: Partial<Job> = {}): Job => ({
    id: 1,
    title: 'Angular Developer',
    organization: 'Vue and Me',
    degree: "Master's",
    jobType: 'Intern',
    locations: ['Lisbon'],
    minimumQualifications: [
      'Mesh granular deliverables, engineer enterprise convergence, and synergize B2C initiatives',
    ],
    preferredQualifications: [
      'Mesh wireless metrics, syndicate innovative markets, and disintermediate intuitive niches',
    ],
    description: ['Away someone forget effect wait land.'],
    dateAdded: '2021-07-04',
    ...job,
  });
  //job: Partial<Job> lo que hace es que le damos forma o formato a los datos que ingresarán, pero a su vez le decimos que no es necesario que ingresen todas las configuraciones que le hemos dados, que todas son opcionales, pero que no pueden agregarse más de las que le hemos dado, pueden faltar si, pero no agregar nuevas configuraciones, si le decimos que solo hará a: string y b: string; no podemos agregarle luego un c: number por ejemplo, pero si puede faltar a o b.

  beforeEach(() => {
    setActivePinia(createPinia());
  });
  describe('UNIQUE_ORGANIZATIONS', () => {
    it('finds unique organiztions from list of jobs', () => {
      const store = useJobsStore();
      store.jobs = [
        createJob({ organization: 'Google' }),
        createJob({ organization: 'Amazon' }),
        createJob({ organization: 'Google' }),
      ];
      // store.jobs = [
      //   { organization: 'Google' },
      //   { organization: 'Amazon' },
      //   { organization: 'Google' },
      // ];

      const result = store.UNIQUE_ORGANIZATIONS;
      expect(result).toEqual(new Set(['Google', 'Amazon']));
    });
  });

  describe('UNIQUE_JOB_TYPES', () => {
    it('finds unique job types from listo of jobs', () => {
      const store = useJobsStore();
      store.jobs = [
        createJob({ jobType: 'Full-time' }),
        createJob({ jobType: 'Temporary' }),
        createJob({ jobType: 'Full-time' }),
      ];
      // store.jobs = [
      //   { jobType: 'Full-time' },
      //   { jobType: 'Temporary' },
      //   { jobType: 'Full-time' },
      // ];

      const result = store.UNIQUE_JOB_TYPES;
      expect(result).toEqual(new Set(['Full-time', 'Temporary']));
    });
  });

  describe('INCLUDE_JOB_BY_ORANIZATION', () => {
    describe('when the user has not selected any organizations', () => {
      it('includes job', () => {
        const userStore = useUserStore();
        userStore.selectedOrganizations = [];
        const store = useJobsStore();
        const job = createJob({ organization: 'Google' });
        // const job = { organization: 'Google' };

        const result = store.INCLUDE_JOB_BY_ORGANIZATION(job);

        expect(result).toBe(true);
      });
    });

    it('identifies if job is associated with given organiations', () => {
      const userStore = useUserStore();
      userStore.selectedOrganizations = ['Google', 'Microsoft'];
      const store = useJobsStore();
      const job = createJob({ organization: 'Google' });
      // const job = { organization: 'Google'};

      const result = store.INCLUDE_JOB_BY_ORGANIZATION(job);

      expect(result).toBe(true);
    });
  });

  describe('INCLUDE_JOB_BY_JOB_TYPE', () => {
    describe('when the user has not selected any job types', () => {
      it('includes job', () => {
        const userStore = useUserStore();
        userStore.selectedJobTypes = [];
        const store = useJobsStore();
        const job = createJob({ jobType: 'Full-time' });
        // const job = { jobType: 'Full-time' };

        const result = store.INCLUDE_JOB_BY_JOB_TYPE(job);

        expect(result).toBe(true);
      });
    });

    it('identifies if job is associated with given job types', () => {
      const userStore = useUserStore();
      userStore.selectedJobTypes = ['Full-time', 'Part-time'];
      const store = useJobsStore();
      const job = createJob({ jobType: 'Full-time' });
      // const job = { jobType: 'Full-time' };

      const result = store.INCLUDE_JOB_BY_JOB_TYPE(job);

      expect(result).toBe(true);
    });
  });
});
