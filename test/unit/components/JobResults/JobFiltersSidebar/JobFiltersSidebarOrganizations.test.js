import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';

import JobFiltersSidebarOrganizations from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarOrganizations.vue';
import { useJobsStore } from '@/stores/jobs';

describe('JobFiltersSidebarOrganizations', () => {
  it('renders unique list of organizations from jobs', async () => {
    const pinia = createTestingPinia();
    const jobsStore = useJobsStore();

    jobsStore.UNIQUE_ORGANIZATIONS = new Set(['Google', 'Amazon']);

    render(JobFiltersSidebarOrganizations, {
      global: {
        plugins: [pinia],
        stubs: {
          FontAwesomeIcon: true,
        },
      },
    });

    const button = screen.getByRole('button', { name: /Organization/i });
    //name aquí hace referencia a header del componente JobFiltersSidebarOrganizations.vue, por qué, no se
    await userEvent.click(button);

    const organizationListItems = screen.getAllByRole('listitem');
    const organizations = organizationListItems.map((node) => node.textContent);
    //aquí tenemos que crear un array que contenga solo el texto que extraerémos del listado que genera nuestro componente, osea el lista generado de UNIQUE_ORGANIZATIONS

    expect(organizations).toEqual(['Google', 'Amazon']);
  });
});
