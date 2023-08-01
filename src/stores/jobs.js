import { defineStore } from 'pinia';
import getJobs from '@/api/getJobs';

import { useUserStore } from '@/stores/user';

export const FETCH_JOBS = 'FETCH_JOBS';
export const UNIQUE_ORGANIZATIONS = 'UNIQUE_ORGANIZATIONS';
export const FILTERED_JOBS_BY_ORGANIZATIONS = 'FILTERED_JOBS_BY_ORGANIZATIONS';

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
    [FILTERED_JOBS_BY_ORGANIZATIONS](state) {
      const userStore = useUserStore();
      //ahora se va a filtrar nuestra base de datos obtenida de nuestro API, notese que aquí aún no se filtra nada porque en primera instancia nuestro useUserStore.selectedOrganizations no se ha ejecutado por lo que no tiene un array creado con las organization que queremos usar para filtrar, no obstante, cuando el usuario selecciona una organización se activa el action de useUserStore y se crea un array que contiene las organization y por ende ocurre un cambio de state, el cual es detectado en este archivo por Pinia, y ejecuta el getters (que es como computed), por lo cual se crea la variable userStore que contiene todo nuestro useUserStore, a su vez, nuestro Jobs de nuestro archivo tendrá ya una base de datos completa, por lo que podemos filtrarla en un nuevo array
      return state.jobs.filter((job) => userStore.selectedOrganizations.includes(job.organization));
      //aquí busca en toda nuestra base de datos, toma uno a uno los elementos de jobs(que es un array), cada elemento es un Objet que contiene la información, luego por cada objet le decimos que si incluye cualquier elemento del array useUserStore->useStore.selectedOrganizations lo deje pasar y se almacene en un nuevo array que es el que se retorna de la función FILTERED_JOBS_BY_ORGANIZATIONS. NOTA: se escribe primero que debe estar y luego includes y dentro de que debe estar, osea, selectedOrganizations debe estar incluida en job.organization, no se escribe al reves (ya probé :D)
    },
  },
});
