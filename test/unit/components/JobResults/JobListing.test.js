import { render, screen } from '@testing-library/vue';
import { RouterLinkStub } from '@vue/test-utils';

import JobListing from '@/components/JobResults/JobListing.vue';

describe('JobListing', () => {
  const createJobProps = (jobProps = {}) => ({
    title: 'Vue Developer',
    organization: 'AirBnB',
    locations: ['New York'],
    minimumQualifications: ['Code'],
    ...jobProps,
    //esta última línea, lo que hará es que si pasamos un objeto de información para el test, va a tomarlo y destructurarlo (separarlo), y llevar el objeto que devuelve la función, si el objeto de información contiene ya el parámetro de "title", lo va a sobrescribir, así ya no saldría "Vue Developer"
  });
  //creamos una función que devuelva un objeto (por eso se pone parentesis y luego llaves para definir el contenido de la función, para que devuelva inicialmente un objeto, si no se hace esto, en primera instacia ni nos deja usar el separador "...jobProps")

  const renderJobListing = (jobProps) => {
    render(JobListing, {
      global: {
        stubs: {
          'router-link': RouterLinkStub,
        },
      },
      props: {
        job: {
          ...jobProps,
          //aquí tomamos el objeto de información que pasamos, osea, un trabajo, y lo destructuramos, quedaría como si le ingresaramos title, organization, etc...
        },
      },
    });
  };

  it('renders job title', () => {
    const jobProps = createJobProps({ title: 'Vue programmer' });
    renderJobListing(jobProps);

    expect(screen.getByText('Vue programmer')).toBeInTheDocument();
  });

  it('renders job organization', () => {
    const jobProps = createJobProps({ organization: 'Test' });
    renderJobListing(jobProps);

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('renders job location', () => {
    const jobProps = createJobProps({ locations: ['Orlando', 'Jacksonville'] });
    renderJobListing(jobProps);

    expect(screen.getByText('Orlando')).toBeInTheDocument();
    expect(screen.getByText('Jacksonville')).toBeInTheDocument();
  });

  it('renders job qualifications', () => {
    const jobProps = createJobProps({ minimumQualifications: ['Code', 'Develop'] });
    renderJobListing(jobProps);

    expect(screen.getByText('Code')).toBeInTheDocument();
    expect(screen.getByText('Develop')).toBeInTheDocument();
  });
});
