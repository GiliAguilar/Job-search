import { defineStore } from 'pinia';
import getJobs from '@/api/getJobs';

import { useUserStore } from '@/stores/user';

export const FETCH_JOBS = 'FETCH_JOBS';
export const UNIQUE_ORGANIZATIONS = 'UNIQUE_ORGANIZATIONS';
// export const FILTERED_JOBS_BY_ORGANIZATIONS = 'FILTERED_JOBS_BY_ORGANIZATIONS';
export const UNIQUE_JOB_TYPES = 'UNIQUE_JOB_TYPES';
// export const FILTERED_JOBS_BY_JOB_TYPES = 'FILTERED_JOBS_BY_JOB_TYPES';
export const FILTERED_JOBS = 'FILTERED_JOBS';

export const INCLUDE_JOB_BY_ORGANIZATION = 'INCLUDE_JOB_BY_ORGANIZATION';
export const INCLUDE_JOB_BY_JOB_TYPE = 'INCLUDE_JOB_BY_JOB_TYPE';

export const useJobsStore = defineStore('jobs', {
  state: () => ({
    jobs: [],
  }),

  actions: {
    async [FETCH_JOBS]() {
      this.jobs = await getJobs();
    },
    //Aquí usamos [FETCH_JOBS], lo que es una sintaxis especial que vi antes que se utiliza en objetos, esto lo que hace es que busca externamente una variable llamada de igual forma, y le asigna automáticamente el nombre que contiene esa variable al method/propertie del objeto... que se busca con esto?, que al momento de llamar a esta función, no generemos errores de typing, osea que escribamos mal una función y no la llame, porque pinia si algo no existe no marca error, simplemnte lo ignora
  },
  getters: {
    [UNIQUE_ORGANIZATIONS](state) {
      //lo que hay que pasar siempre como primer parámetro es "state", que no será una variable de entrada nuestra, sino que le sirve a getters a apuntar a nuestro state real, osea que no es como una función normal donde state lo definimos al momento de llamar a la función. Al pasar state en getter, si el state llega a cambiar, el getters lo detecta y llama a la función que esté pasando ese parámetro, en este caso, UNIQUE_ORGANIZATIONS.
      const uniqueOrganizations = new Set();
      state.jobs.forEach((job) => uniqueOrganizations.add(job.organization));
      return uniqueOrganizations;
      //aquí se hace return y no se almacena en state, porque esto solo debe calcularse si nuestra API cambia
    },
    // [FILTERED_JOBS_BY_ORGANIZATIONS](state) {
    //   const userStore = useUserStore();
    //   //ahora se va a filtrar nuestra base de datos obtenida de nuestro API, notese que aquí aún no se filtra nada porque en primera instancia nuestro useUserStore.selectedOrganizations no se ha ejecutado por lo que no tiene un array creado con las organization que queremos usar para filtrar, no obstante, cuando el usuario selecciona una organización se activa el action de useUserStore y se crea un array que contiene las organization y por ende ocurre un cambio de state, el cual es detectado en este archivo por Pinia, y ejecuta el getters (que es como computed), por lo cual se crea la variable userStore que contiene todo nuestro useUserStore, a su vez, nuestro Jobs de nuestro archivo tendrá ya una base de datos completa, por lo que podemos filtrarla en un nuevo array
    //   return userStore.selectedOrganizations.length === 0
    //     ? state.jobs
    //     : state.jobs.filter((job) => userStore.selectedOrganizations.includes(job.organization));
    // },
    [UNIQUE_JOB_TYPES](state) {
      const uniqueJobTypes = new Set();
      state.jobs.forEach((job) => uniqueJobTypes.add(job.jobType));
      return uniqueJobTypes;
    },
    // [FILTERED_JOBS_BY_JOB_TYPES](state) {
    //   const userStore = useUserStore();
    //   return userStore.selectedJobTypes.length === 0
    //     ? state.jobs
    //     : state.jobs.filter((job) => userStore.selectedJobTypes.includes(job.jobType));
    // },

    [INCLUDE_JOB_BY_ORGANIZATION]: () => (job) => {
      //en getters el único parámetro que debe pasarse es siempre state, no hay de otra, pero podemos evitarlo, para poder pasar un parametro que no sea state, lo que devemos hacer es devolver una función. Primero creamos un properties, no una función, como este, en el properties creamos una función que recibe state y, si no usamos ese state para nada, simpolemente no lo pones, como aquí, luego de esa función devolvemos una función que si reciba parámetros, por eso es ":() => (job) => {}", entonces Pinia va a entender que, cuando se llame a esta función debe fluir el parámetro en su segunda función, porque la primera siempre será state.
      const userStore = useUserStore();
      if (userStore.selectedOrganizations.length === 0) return true;
      return userStore.selectedOrganizations.includes(job.organization);
    },
    [INCLUDE_JOB_BY_JOB_TYPE]: () => (job) => {
      const userStore = useUserStore();
      if (userStore.selectedJobTypes.length === 0) return true;
      return userStore.selectedJobTypes.includes(job.jobType);
    },

    [FILTERED_JOBS](state) {
      // const userStore = useUserStore();
      // const noSelectedOrganizations = userStore.selectedOrganizations.length === 0;
      // const noSelectedJobType = userStore.selectedJobTypes.length === 0;

      return state.jobs
        .filter((job) => {
          // if (noSelectedOrganizations) return true;
          // return userStore.selectedOrganizations.includes(job.organization);
          return this.INCLUDE_JOB_BY_ORGANIZATION(job);
          //para poder acceder a un getter dentro de un getter, se usa this., simple...
        })
        .filter((job) => {
          // if (noSelectedJobType) return true;
          // return userStore.selectedJobTypes.includes(job.jobType);
          return this.INCLUDE_JOB_BY_JOB_TYPE(job);
        });
    },
  },
});
