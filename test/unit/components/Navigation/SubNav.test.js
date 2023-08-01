import { render, screen } from '@testing-library/vue';
import SubNav from '@/components/Navigation/SubNav.vue';

describe('SubNav', () => {
  const renderTheSubNav = (routeName) => {
    render(SubNav, {
      global: {
        mocks: {
          $route: {
            name: routeName,
          },
        },
        //mocks sirve para reemplazar cualquier .this que sea global. Aquí estamos diciendole a la variable global $route, que no existe en el test pero si en el programa, que tiene una propiedad llamada name y que incluye "JobResults"
        stubs: {
          FontAwesomeIcon: true,
        },
      },
      //El test no tiene forma de saber que es fontawesome porque es algo global que añadimos, que no conoce, para evitar que de problemas, se utiliza global, lo que recibe un objeto, y dentro de el se utiliza un resguardo, un sustituto ligero dentro del virtual DOM que se crea con render, ese es stubs:, el cual también recibe un objeto... dentro especificamos a que nos referimos y asignamos true, eso en el virutal DOM sustituye (en este caso) el icono por algo más que el entiende y que no necesita renderizar.
    });

    //nuestro SubNave.vue busca una variable global $router para verificar si estamos en SubNave, y eso es lo que estamos simulando con mocks
  };

  describe('When user is on jobs page', () => {
    it('Displays job count', () => {
      const routeName = 'JobResults';
      renderTheSubNav(routeName);

      const jobCount = screen.getByText('1653');
      expect(jobCount).toBeInTheDocument();
    });
  });
  describe('When user is not on jobs page', () => {
    it('It does not displays job count', () => {
      const routeName = 'Home';
      renderTheSubNav(routeName);

      const jobCount = screen.queryByText('1653');
      expect(jobCount).not.toBeInTheDocument();
    });
  });
});
