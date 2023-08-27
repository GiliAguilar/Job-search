import type { Mock } from 'vitest';

import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';

import JobFiltersSidebarJobTypes from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarJobTypes.vue';
import { useJobsStore } from '@/stores/jobs';
import { useUserStore } from '@/stores/user';

import { useRouter } from 'vue-router';
vi.mock('vue-router');
const useRouterMock = useRouter as Mock;

describe('JobFiltersSidebarJobTypes', () => {
  const renderJobFiltersSidebarJobTypes = () => {
    const pinia = createTestingPinia();
    const userStore = useUserStore();
    const jobsStore = useJobsStore();

    // const $router = { push: vi.fn() };
    //Vue 2 y 3 mix

    render(JobFiltersSidebarJobTypes, {
      global: {
        // mocks: {
        //   $router,
        // },
        //Vue 2 y 3 mix
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { jobsStore, userStore };
    // return { jobsStore, userStore, $router };
  };

  it('renders unique list of job from jobs', async () => {
    const { jobsStore } = renderJobFiltersSidebarJobTypes();

    jobsStore.UNIQUE_JOB_TYPES = new Set(['Full-time', 'Part-time']);

    const button = screen.getByRole('button', { name: /Job types/i });

    await userEvent.click(button);

    const jobTypesListItems = screen.getAllByRole('listitem');
    const jobTypes = jobTypesListItems.map((node) => node.textContent);

    expect(jobTypes).toEqual(['Full-time', 'Part-time']);
  });

  describe('when user clicks checkbox', () => {
    it('communicates that user has selected checkbos for job types', async () => {
      useRouterMock.mockReturnValue({ push: vi.fn() });
      // useRouter.mockReturnValue({ push: vi.fn() });
      //Vue 3.2

      const { userStore, jobsStore } = renderJobFiltersSidebarJobTypes();

      jobsStore.UNIQUE_JOB_TYPES = new Set(['Full-time', 'Part-time']);

      const button = screen.getByRole('button', { name: /Job types/i });
      await userEvent.click(button);

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /Full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);

      expect(userStore.ADD_SELECTED_JOB_TYPES).toHaveBeenCalledWith(['Full-time']);
    });

    it('navigates user to job results page to see fresh batch of filtered jobs', async () => {
      const push = vi.fn();
      useRouterMock.mockReturnValue({ push });
      // useRouter.mockReturnValue({ push });
      //Vue 3.2

      const { jobsStore } = renderJobFiltersSidebarJobTypes();
      // const { jobsStore, $router } = renderJobFiltersSidebarJobTypes();
      //Vue 2 y 3 mix

      jobsStore.UNIQUE_JOB_TYPES = new Set(['Full-time']);

      const button = screen.getByRole('button', { name: /Job types/i });
      await userEvent.click(button);

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /Full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);

      expect(push).toHaveBeenCalledWith({ name: 'JobResults' });
      //Vue 3.2
      // expect($router.push).toHaveBeenCalledWith({ name: 'JobResults' });
      //Vue 2 y 3 mix
    });
  });
});
