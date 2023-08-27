import { createApp } from 'vue';
//importa Vue
import { createPinia } from 'pinia';
//importa Pinia
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
//permite usar los iconos como componentes en Vue
import { library } from '@fortawesome/fontawesome-svg-core';
//importa la libreria de svg de iconos
import { faAngleDown, faAngleUp, faSearch } from '@fortawesome/free-solid-svg-icons';
//este último es el icóno de lupa, flecha arriba y flecha abajo

import '@/index.css';
import router from '@/router';
//no necesito poner @/router/index.js porque por defecto node.js busca automáticamente un archivo llamado index.js
import App from '@/App.vue';

library.add(faSearch);
library.add(faAngleDown);
library.add(faAngleUp);
//agrega los iconos "faSearch, faAngleDown, faAngleUp" a la librería del proyecto

const pinia = createPinia();
//llamamos a pinia y lo anclamos a nuestra app con .use(pinia)

createApp(App).use(pinia).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app');
//montamos los iconos como componentes, el primer parámetro es el nombre que le daremos de forma global, el segundo la fuente, luego, montamos '.mount' la App.vue en el html con #, esto es html y se usa para un id
