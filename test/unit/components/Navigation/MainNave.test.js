import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import { RouterLinkStub } from '@vue/test-utils';
//agregamos la funcionalidad de router-link
import { createTestingPinia } from '@pinia/testing';
//crea un testing para pinia para componentes, o funciones mock para cualquier cosa que tenga que ver con pinia

import MainNav from '@/components/Navigation/MainNav.vue';

import { useUserStore } from '@/stores/user.js';
//esto lo usamos si ponemos stubAction: true

import { useRoute } from 'vue-router';
vi.mock('vue-router');

const renderMainNav = () => {
  const pinia = createTestingPinia({
    stubActions: true,
    //significa que va a sustituir todas las acciones con mocks, pero si ponemos false, usará los datos reales de nuestro archivo que tiene la configuración de pinia
  });

  useRoute.mockReturnValue({ name: 'Home' });
  // const $route = {
  //   name: 'Home',
  // };

  render(MainNav, {
    global: {
      plugins: [pinia],
      //aquí conectamos pinia con render, creo...
      // mocks: {
      //   $route,
      // },
      //Vue 2 y 3
      stubs: {
        FontAwesomeIcon: true,
        //El test no tiene forma de saber que es fontawesome porque es algo global que añadimos, que no conoce, para evitar que de problemas, se utiliza global, lo que recibe un objeto, y dentro de el se utiliza un resguardo, un sustituto ligero dentro del virtual DOM que se crea con render, ese es stubs:, el cual también recibe un objeto... dentro especificamos a que nos referimos y asignamos true, eso en el virutal DOM sustituye (en este caso) el icono por algo más que el entiende y que no necesita renderizar.
        //notese, esto puede simplificarse en una función para no hacer DRY... renderMainNav();
        RouterLink: RouterLinkStub, //agregamos soporte completo a router-link con esto, así podemos pasarle el parametro "to" y el texto que puede recibir router-link
      },
    },
  });
};

describe('MainNav', () => {
  it('displays company name', () => {
    renderMainNav();
    screen.getByText('GoogleClone Jobs');
    const companyName = screen.getByText('GoogleClone Jobs');
    expect(companyName).toBeInTheDocument();
    // screen.debug()
  }),
    it('displays menu items for navigation', () => {
      renderMainNav();
      const listItem = screen.getAllByRole('listitem');
      const listItemTxt = listItem.map((i) => i.textContent);
      expect(listItemTxt).toEqual([
        'Teams',
        'Locations',
        'Life at GoogleClone Corp',
        'How we hire',
        'Students',
        'Jobs',
      ]);
    }),
    it('When the user logs in display profile image', async () => {
      renderMainNav();

      const userStore = useUserStore();
      //esto es para cambiar manualmente los archivos de pinia en test solo, y solo si pusimos stubAction:true

      let profileImage = screen.queryByRole('img', {
        name: /user profile image/i,
      });
      /* según la documentación de Vue, se puede sustituir las comillas con /, 
      la "i" es para que buscar cualquier coincidencia sin casos sensibles, es deicr, 
      que ignore mayusculas y minusculas en este caso insensitive, 
      aquí debemos buscar por su nombre alt, razón por la cual debe tener alt nuestro html (alt = descripción alternativa), 
      porque básicamente no hay otra forma de buscarlo porque aquí las clases son de tailwind no de html...

      extra... queryByRole regresa Null en vez de error si no encuentra lo que pedimos, 
      se usa cuando algo es asincronomo, aunque la busqueda en este testing es sincronomo, 
      osea, querybyrole es sincronomo y si no encuentra la imagen por ser asincronomo 
      regresa null en vez de fallido, lo que permite seguir haciendo testing */
      expect(profileImage).not.toBeInTheDocument();

      const loginButton = screen.getByRole('button', {
        name: /sing in/i,
      });
      //aquí no necesitamos buscar su nombre alt por ser un boton, buscamos directamente su nombre

      userStore.isLoggedIn = true;
      //esto es para cambiar manualmente los archivos de pinia en test solo, y solo si pusimos stubAction:true

      await userEvent.click(loginButton);

      /* userEvent.click es una promesa, y sire para simular eventos que realizará el usuario en el DOM (pagina final), por lo que hay que volver a toda la función a tipo async. Aquí está medio raro... supongo que en este punto Vue Testing Library espera a que la promesa se cumpla para continuar con el código, por eso la siguiente re asignación de profileImage funciona reescribiendo el null original por el objeto encontrado y luego lo pasa por expect y lo encuentra en el DOM porque ya se genero a partir de la promesa completada...
       */

      profileImage = screen.queryByRole('img', {
        name: /user profile image/i,
      });
      expect(profileImage).toBeInTheDocument();
    });
});
