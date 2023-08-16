import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';

import JobFiltersSidebarJobTypes from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarCheckboxGroup.vue';

import { useRouter } from 'vue-router';
vi.mock('vue-router');

describe('JobFiltersSidebarCheckboxGroup', () => {
  const createProps = (props = {}) => ({
    header: 'Some header',
    uniqueValues: new Set(['ValueA', 'ValueB']),
    action: vi.fn(),
    ...props,
  });

  const renderJobFiltersSidebarCheckboxGroup = (props) => {
    const pinia = createTestingPinia();

    render(JobFiltersSidebarJobTypes, {
      props: {
        ...props,
      },
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });
  };

  it('renders unique list of values', async () => {
    const props = createProps({
      header: 'Job types',
      uniqueValues: new Set(['Full-time', 'Part-time']),
    });
    renderJobFiltersSidebarCheckboxGroup(props);

    const button = screen.getByRole('button', { name: /Job types/i });

    await userEvent.click(button);

    const jobTypesListItems = screen.getAllByRole('listitem');
    const jobTypes = jobTypesListItems.map((node) => node.textContent);

    expect(jobTypes).toEqual(['Full-time', 'Part-time']);
  });

  describe('when user clicks checkbox', () => {
    it('communicates that user has selected checkbos for value', async () => {
      const push = vi.fn();
      useRouter.mockReturnValue({ push });
      const action = vi.fn();
      const props = createProps({
        header: 'Job types',
        uniqueValues: new Set(['Full-time', 'Part-time']),
        action,
      });
      renderJobFiltersSidebarCheckboxGroup(props);

      useRouter.mockReturnValue({ push: vi.fn() });

      const button = screen.getByRole('button', { name: /Job types/i });
      await userEvent.click(button);

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /Full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);

      expect(action).toHaveBeenCalledWith(['Full-time']);
    });

    it('navigates user to job results page to see fresh batch of filtered jobs', async () => {
      const push = vi.fn();
      useRouter.mockReturnValue({ push });

      const props = createProps({
        header: 'Job types',
        uniqueValues: new Set(['Full-time']),
      });
      renderJobFiltersSidebarCheckboxGroup(props);

      const button = screen.getByRole('button', { name: /Job types/i });
      await userEvent.click(button);

      const fullTimeCheckbox = screen.getByRole('checkbox', {
        name: /Full-time/i,
      });
      await userEvent.click(fullTimeCheckbox);

      expect(push).toHaveBeenCalledWith({ name: 'JobResults' });
    });
  });
});
