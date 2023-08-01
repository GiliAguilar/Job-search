import { render, screen } from '@testing-library/vue';

import ActionButton from '@/components/Shared/ActionButton.vue';

describe('ActionButton', () => {
  it('renders text', () => {
    render(ActionButton, {
      props: {
        text: 'Click me',
        type: 'primary',
      },
    });
    //como ActionButton utiliza props de su componente padre, debemos pasarlos también en el test, como segundo argumento de la función render.
    //básicamente estamos diciendole a ActionButton que cree un botón con el texto "Click me", y tenga la configuración primary de CSS

    const button = screen.getByRole('button', {
      name: /click me/i,
    });
    expect(button).toBeInTheDocument();
  });

  it('applies one of several stles to button', () => {
    render(ActionButton, {
      props: {
        text: 'Click me',
        type: 'primary',
      },
    });
    const button = screen.getByRole('button', {
      name: /click me/i,
    });
    expect(button).toHaveClass('primary');
  });
});
