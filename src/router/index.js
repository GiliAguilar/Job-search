import { createRouter, createWebHashHistory } from 'vue-router';
//createRouter crea las rutas de conección, pero estas son recibidas como una propiedad de un objeto, y debe llamarse routes, y createRouter debe ser contenido en una variable que se llame router
import HomeView from '@/views/HomeView.vue';
import JobResultsView from '@/views/JobResultsView.vue';
import JobView from '@/views/JobView.vue';
import TeamsView from '@/views/TeamsView.vue';

const routes = [
  {
    path: '/', // '/' es el nombre que se le da por defecto a un archivo raiz main o home
    name: 'Home', // aquí asignamos el nombre simplificado que le daremos al path
    component: HomeView, //asignamos el componente al cual apuntará
  },
  {
    path: '/jobs/results',
    name: 'JobResults',
    component: JobResultsView,
  },
  {
    path: '/jobs/results/:id', //esto se llama dinamic route, es utilizando ":" seguido de un nombre que asignemos, en este caso asignaremos "id"
    name: 'JobListing',
    component: JobView,
  },
  {
    path: '/teams',
    name: 'Teams',
    component: TeamsView,
  },
];

const router = createRouter({
  history: createWebHashHistory(), //createWebHashHistory sirve para crear un historia que sirve para que el navegador pueda regresar a su ultima ruta llamada, para regresar pues... y básicamente crea una especia de id numerico o alfanumerico de una longitud determinada, no se si se usa ese código al final como programador
  routes, //aquí le pasamos el array con toda nuetra configuración de rutas
  scrollBehavior() {
    return { top: 0, left: 0, behavior: 'smooth' };
  }, //con scrollBehavior, o comportamiento del scroll, podemos decirle a nuestra app de Vue que cada vez que se llame a un route, la ventana se posicione en donde le indiquemos
});

export default router;
