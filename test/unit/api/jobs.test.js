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

  describe('UNIQUE_JOB_TYPES', () => {
    it('finds unique job types from list of jobs', () => {
      const store = useJobsStore();
      store.jobs = [{ jobType: 'Full-time' }, { jobType: 'Temporary' }, { jobType: 'Full-time' }];

      const result = store.UNIQUE_JOB_TYPES;
      expect(result).toEqual(new Set(['Full-time', 'Temporary']));
    });
  });

  describe('INCLUDE_JOB_BY_ORGANIZATION', () => {
    describe('when the user has not selected any organizations', () => {
      it('includes job', () => {
        const userStore = useUserStore();
        userStore.selectedOrganizations = [];

        const store = useJobsStore();
        const job = { organization: 'Google' };

        const result = store.INCLUDE_JOB_BY_ORGANIZATION(job);

        expect(result).toBe(true);
      });
    });
    it('identifies if job is associated with given organizations', () => {
      const userStore = useUserStore();
      userStore.selectedOrganizations = ['Google', 'Microsoft'];

      const store = useJobsStore();
      const job = { organization: 'Google' };

      const result = store.INCLUDE_JOB_BY_ORGANIZATION(job);

      expect(result).toBe(true);
    });
  });

  describe('INCLUDE_JOB_BY_JOB_TYPE', () => {
    describe('when the user has not selected any organizations', () => {
      it('includes job', () => {
        const userStore = useUserStore();
        userStore.selectedJobTypes = [];

        const store = useJobsStore();
        const job = { jobType: 'Full-time' };

        const result = store.INCLUDE_JOB_BY_JOB_TYPE(job);

        expect(result).toBe(true);
      });
    });
    it('identifies if job is associated with given Job Types', () => {
      const userStore = useUserStore();
      userStore.selectedJobTypes = ['Full-time', 'Part-time'];

      const store = useJobsStore();
      const job = { jobType: 'Part-time' };

      const result = store.INCLUDE_JOB_BY_JOB_TYPE(job);

      expect(result).toBe(true);
    });
  });

  // describe('FILTERED_JOBS_BY_ORGANIZATIONS', () => {
  //   beforeEach(() => {
  //     setActivePinia(createPinia());
  //   });

  //   it('identifies jobs that are associated with the given organizations', () => {
  //     const jobsStore = useJobsStore();
  //     jobsStore.jobs = [
  //       { organization: 'Google' },
  //       { organization: 'Amazon' },
  //       { organization: 'Microsoft' },
  //     ];
  //     const userStore = useUserStore();
  //     userStore.selectedOrganizations = ['Google', 'Microsoft'];

  //     const result = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS;

  //     expect(result).toEqual([{ organization: 'Google' }, { organization: 'Microsoft' }]);
  //   });

  //   describe('when the user has not selected any organizations', () => {
  //     it('returns all jobs', () => {
  //       const jobsStore = useJobsStore();
  //       jobsStore.jobs = [
  //         { organization: 'Google' },
  //         { organization: 'Amazon' },
  //         { organization: 'Microsoft' },
  //       ];
  //       const userStore = useUserStore();
  //       userStore.selectedOrganizations = [];

  //       const result = jobsStore.FILTERED_JOBS_BY_ORGANIZATIONS;

  //       expect(result).toEqual([
  //         { organization: 'Google' },
  //         { organization: 'Amazon' },
  //         { organization: 'Microsoft' },
  //       ]);
  //     });
  //   });
  // });

  // describe('FILTERED_JOBS_BY_JOB_TYPES', () => {
  //   beforeEach(() => {
  //     setActivePinia(createPinia());
  //   });

  //   it('identifies jobs that are associated with the given job type', () => {
  //     const jobsStore = useJobsStore();
  //     jobsStore.jobs = [
  //       { jobType: 'Full-time' },
  //       { jobType: 'Temporary' },
  //       { jobType: 'Part-time' },
  //     ];

  //     const userStore = useUserStore();
  //     userStore.selectedJobTypes = ['Full-time', 'Part-time'];

  //     const result = jobsStore.FILTERED_JOBS_BY_JOB_TYPES;

  //     expect(result).toEqual([{ jobType: 'Full-time' }, { jobType: 'Part-time' }]);
  //   });

  //   describe('when the user has not selected any job types', () => {
  //     it('returns all jobs', () => {
  //       const jobsStore = useJobsStore();
  //       jobsStore.jobs = [
  //         { jobType: 'Full-time' },
  //         { jobType: 'Temporary' },
  //         { jobType: 'Part-time' },
  //       ];
  //       const userStore = useUserStore();
  //       userStore.selectedJobTypes = [];

  //       const result = jobsStore.FILTERED_JOBS_BY_JOB_TYPES;

  //       expect(result).toEqual([
  //         { jobType: 'Full-time' },
  //         { jobType: 'Temporary' },
  //         { jobType: 'Part-time' },
  //       ]);
  //     });
  //   });
  // });
});
