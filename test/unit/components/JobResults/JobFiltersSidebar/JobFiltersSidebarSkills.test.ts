import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { createTestingPinia } from '@pinia/testing';

import { useUserStore } from '@/stores/user';
import JobFiltersSidebarSkills from '@/components/JobResults/JobFiltersSidebar/JobFiltersSidebarSkills.vue';

describe('JobFiltersSidebarSkills', () => {
  const renderJobFiltersSidebarSkills = () => {
    const pinia = createTestingPinia();
    const userStore = useUserStore();

    render(JobFiltersSidebarSkills, {
      global: {
        plugins: [pinia],
      },
    });
    return { userStore };
  };

  it('populates search input from store', async () => {
    const { userStore } = renderJobFiltersSidebarSkills();

    userStore.skillsSearchTerm = 'Programmer';
    const input = await screen.findByRole<HTMLInputElement>('textbox');
    expect(input.value).toBe('Programmer');
  });

  it('writes user input to store', async () => {
    const { userStore } = renderJobFiltersSidebarSkills();

    userStore.skillsSearchTerm = '';

    const input = screen.getByRole<HTMLInputElement>('textbox');
    await userEvent.type(input, 'V');
    //no actualiza porque nuestro v-model.lazy está reteniendo todo, hay que simular un enter o algo

    await userEvent.click(document.body);
    //básicamente le estamos diciendo que haga click en cualquier parte del body de nuestro dom

    expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith('V');
  });

  it('removes whitespace from user input', async () => {
    const { userStore } = renderJobFiltersSidebarSkills();

    userStore.skillsSearchTerm = '';

    const input = screen.getByRole<HTMLInputElement>('textbox');
    await userEvent.type(input, '  Vue Developer ');
    //no actualiza porque nuestro v-model.lazy está reteniendo todo, hay que simular un enter o algo

    await userEvent.click(document.body);
    //básicamente le estamos diciendo que haga click en cualquier parte del body de nuestro dom

    expect(userStore.UPDATE_SKILLS_SEARCH_TERM).toHaveBeenCalledWith('Vue Developer');
  });
});
