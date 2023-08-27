import { render, screen } from '@testing-library/vue';
import TheHeadline from '@/components/JobSearch/TheHeadline.vue';
import { vi } from 'vitest'; //no necesario porque es algo global que pre configuramos anteriormente, pero si lo quito deja de darme sugerencias...
import { nextTick } from 'vue'; //esto, por lo que entendí, lo que hace es importar la función nexTick, que lo que hace es mover el tiempo al proximo movimiento de rendering del componente, esta es una función async

describe('TheHeadline', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    //función de vitest (equivalente de jest), para usar un fake timer, así no esperar los timer del programa, esto reemplaza el timer original
  });

  afterEach(() => {
    vi.useRealTimers();
    //función de vitest, restaura el timer de fake a real, creado prevaimente con vi.useFakeTimers();
  });
  //usando beforeEach y afterEach, podemos aplicar globalmente en nuestro test actual funciones que se ejecuten antes de cada prueba (it) y despues de cada prueba, como en este test usamos mucho el fakeTimer, se puede usar globalmente así

  it('displays introductory action verb', () => {
    render(TheHeadline);

    const actionPhrase = screen.getByRole('heading', {
      name: /build for everyon/i,
    });
    expect(actionPhrase).toBeInTheDocument();

    vi.useRealTimers();
  });

  // it('changes action verb function as been called', () => {
  //   const mock = vi.fn();
  //   vi.stubGlobal('setInterval', mock);
  //   //segun entendí, esto nos sirve para buscar explicitamente algo y reemplazarlo, en este caso el timer, que ya se está haciendo con useFakeTimer, pero de esta forma es más explicito, basicamente buscamos de forma global la variable setInterval (que es una función) y la estamos reemplazando con la función mock, que... no hace nada? esto es solo para verificar si efectivamente setInterval fue llamada y ejecutada, no si funciona como se espera, el contenido de setInterval ya se probó de forma independiente con nextElementsInList.test.js

  //   render(TheHeadline);
  //   expect(mock).toHaveBeenCalled();
  // });

  it('swaps action verb after interval', async () => {
    render(TheHeadline);
    vi.advanceTimersToNextTimer();
    vi.advanceTimersToNextTimer();
    vi.advanceTimersToNextTimer();
    //esta función simula el cambio de un intervalo a otro, usado específicamente por nuestra función setInterval(), hará simular la ejecución de esta una vez, por esa razón en la prueba se busca "create for everyone" y funciona, o eso entendi

    await nextTick();
    await nextTick();
    await nextTick();
    //como es async, tenemos que decirle al test que espere a la función nextick, esta espera a que ocurra una actualización en el DOM, generada anteriormente por nuestro advanceTimersToNextTimer().
    const actionPhrase = screen.getByRole('heading', {
      name: /code for everyone/i,
    });

    expect(actionPhrase).toBeInTheDocument();
  });

  it('removes interval when component disappers', () => {
    const clearInterval = vi.fn();
    vi.stubGlobal('clearInterval', clearInterval);

    const { unmount } = render(TheHeadline);
    //aquí, render va a devolver un objeto, el cual es nuestro componente completo en DOM basicamente, en este existen todos los methods que tiene un objeto, y uno de ellos es unmount, el cual es una función que desmonta la app o componente, extraemos esa función con destuctural {}, esto busca, encuentra y devuelve la función unmount() dentro de todo el objeto render(TheHeadline)
    unmount();
    // ejecutar unmount significa que todo lo que se ejecuta antes de esta función habrá ocurrido, es decir, el beforeUnmount que usamos en TheHeadline.vue habrá sido ejecutado ya, por lo cual, clearInterval que está contenido en beforeUnmount ya habrá sido ejecutado
    expect(clearInterval).toHaveBeenCalled();
    vi.unstubAllGlobals();
  });
});
