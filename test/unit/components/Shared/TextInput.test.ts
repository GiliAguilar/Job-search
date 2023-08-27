import { render, screen } from '@testing-library/vue';
import userEvent from '@testing-library/user-event';
import TextInput from '@/components/Shared/TextInput.vue';

describe('TextInput', () => {
  it('communicates that user has entered character', async () => {
    const { emitted } = render(TextInput, {
      props: {
        modelValue: '',
      },
    });
    //el objeto emitted contiene todos los eventos que se han emitido, por eso se destructura render buscando emitted
    const input = screen.getByRole('textbox');
    //aquí simplemente guardamos el objeto que encuentre como textbox, básicamente se creará un objeto por cada vez que exista un evento, o por cada letra que pongamos se crea un nuevo evento
    await userEvent.type(input, 'NYC');
    // console.log(emitted());
    //emitted() es un objeto lo que devuelve, dentro de el tenemos nuestros objetos de nuestro componente textInput.vue, asi que vamos a buscar la propiedad que está registrando nuestro texto, el cual es, 'update:modelValue', (emitted()) es un objeto, para buscar en el usamos dot ".", pero como nuestra propiedad tiene caracteres especiales ":", tenemos que usar la sintaxis especial de [] para buscar, osea, emitted()['update:modelValue'], que esto es como si escribieramos (emitted()).'update:modelValue' y esto no es permitido
    const messages = emitted()['update:modelValue'];
    expect(messages).toEqual([['N'], ['NY'], ['NYC']]);
    //se utilizó un array con arrays dentro, porque eso es lo que devolvio nuestra propiedad de nuestro objeto, podeos verlo en el console.log que hicimos
  });
});
