import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/vue';

import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue';

describe('CollapsibleAccordion', () => {
  const renderCollapsibleAccordion = (config = {}) => {
    render(CollapsibleAccordion, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
        },
      },
      props: {
        header: 'My Category',
      },
      //con props hacemos el fake que esta recibiendo de su padre datos, en este caso el dato es header
      slots: {
        default: '<h3>My nested child</h3>',
      },
      //con slots hacemos el fake que está recibiendo codigo html del padre, como no se especificó ninguna key (porque pueden haber varios slots en un componente), usamos default
      ...config,
    });
  };

  it('renders childs content', async () => {
    const props = {
      header: 'My Category',
    };
    const slots = {
      default: '<h3>My nested child</h3>',
    };
    const config = { props, slots };
    renderCollapsibleAccordion(config);

    expect(screen.queryByText('My nested child')).not.toBeInTheDocument();

    const button = screen.getByRole('button', { name: /my category/i });
    await userEvent.click(button);
    expect(screen.getByText('My nested child')).toBeInTheDocument();
  });

  describe('when parent does not provide custom child content', () => {
    it('render default content', async () => {
      const props = {
        header: 'My Category',
      };
      const slots = {};
      const config = { props, slots };
      renderCollapsibleAccordion(config);

      const button = screen.getByRole('button', { name: /my category/i });
      await userEvent.click(button);
      expect(screen.getByText('Nothing has been passed')).toBeInTheDocument();
    });
  });
});
