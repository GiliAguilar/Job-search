import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';

import JobSearchForm from '@/components/JobSearch/JobSearchForm.vue';

describe('JobSearchForm', () => {
  describe('When user submit form', () => {
    it("Directs user to job results page with user's search parameters", async () => {
      const push = vi.fn();
      const $router = { push };
      //hacemos un fake de router, que lo llenamos con una función del test ligera, que es vi.fn(); con que lo llena, no sabemos, pero permite hacer los test

      render(JobSearchForm, {
        global: {
          mocks: {
            $router,
            //volvemos a $router una variable global
          },
          stubs: {
            FontAwesomeIcon: true,
          },
        },
      });

      const roleInput = screen.getByRole('textbox', {
        name: /Role/i,
        //si ejecutamos screen.getByRole('textbox'), buscará únicamente por un textbox, pero en nuestro test tenemos dos, el de role y el de location, para poder ubicarlo tenemos que indicarle de alguna forma cual buscar, en este caso, usamos el "lebal", o etiqueta del textbox, para que esto funcione el label tiene que estar linkeado con el textbox, por eso se usa for en label y id en role, estos los enlazan
      });
      await userEvent.type(roleInput, 'Vue Developer');
      //ahora vamos a simular que escribimos en el textbox llamado Role, para eso usamos userEvent, con la propiedad de type (escribir), apuntamos al textbox, que es roleInput, y le pasamos el string "Vue Developer", esto es una promesa, por lo que hay que usar await

      const locationInput = screen.getByRole('textbox', {
        name: /Where?/i,
      });
      await userEvent.type(locationInput, 'Dallas');

      const submitButton = screen.getByRole('button', {
        name: /search/i,
      });
      await userEvent.click(submitButton);

      expect(push).toHaveBeenCalledWith({
        name: 'JobResults',
        query: {
          role: 'Vue Developer',
          location: 'Dallas',
        },
      });
      //Lo que esperamos de JobSearchForm.vue en el test es que se ejecute el push, por eso pasamos en expect un push que contenga la información que le pondremos en los textbox
    });
  });
});
