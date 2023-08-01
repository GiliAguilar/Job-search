import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';

import JobFiltersSidebarOrganizations from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue';
import { useJobsStore } from '@/stores/jobs';
import { useUserStore } from '@/stores/user';

describe('JobFiltersSidebarOrganizations', () => {
  const renderJobFiltersSidebarOrganizations = () => {
    const pinia = createTestingPinia();
    const userStore = useUserStore();
    const jobsStore = useJobsStore();

    render(JobFiltersSidebarOrganizations, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    return { jobsStore, userStore };
  };

  it('renders unique list of organizations from jobs', async () => {
    const { jobsStore } = renderJobFiltersSidebarOrganizations();

    jobsStore.UNIQUE_ORGANIZATIONS = new Set(['Google', 'Amazon']);

    const button = screen.getByRole('button', { name: /Organization/i });
    //name aquí hace referencia a header del componente JobFiltersSidebarOrganizations.vue, por qué, no se
    await userEvent.click(button);

    const organizationListItems = screen.getAllByRole('listitem');
    const organizations = organizationListItems.map((node) => node.textContent);
    //aquí tenemos que crear un array que contenga solo el texto que extraerémos del listado que genera nuestro componente, osea el lista generado de UNIQUE_ORGANIZATIONS

    expect(organizations).toEqual(['Google', 'Amazon']);
  });

  it('communicates that user has selected checkbos for oganization', async () => {
    const { userStore, jobsStore } = renderJobFiltersSidebarOrganizations();

    jobsStore.UNIQUE_ORGANIZATIONS = new Set(['Google', 'Amazon']);

    const button = screen.getByRole('button', { name: /Organization/i });
    await userEvent.click(button);

    const googleCheckbox = screen.getByRole('checkbox', {
      name: /Google/i,
    });
    await userEvent.click(googleCheckbox);
    //aquí estamos simulando que le hemos dado click al checkbox de google, primero utilizando un fake de click en organization, luego un fake de click en el checkbox de google

    expect(userStore.ADD_SELECTED_ORGANIZATIONS).toHaveBeenCalledWith(['Google']);
  });
});
