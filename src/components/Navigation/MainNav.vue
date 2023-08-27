<template>
  <header v-bind:class="['w-full', 'text-sm', headerHeightClass]">
    <div class="fixed left-0 top-0 h-16 w-full bg-white">
      <!-- este div dará forma a todos las barras de navegación -->
      <div class="mx-auto flex h-full flex-nowrap border-b border-brand-gray-1 px-8">
        <router-link v-bind:to="{ name: 'Home' }" class="flex h-full items-center text-xl"
          >GoogleClone Jobs</router-link
        >
        <!-- podemos usar v-bind con "to" para ingresar un objeto de configuración, donde le proveamos la ruta de nuestro url de forma inline, o apuntar a un dato en nuestra sección de script -->

        <!--  //////////////////
          <router-link to="/" class="flex h-full items-center text-xl">GoogleClone Jobs</router-link>
         -->

        <!-- 
          <a v-bind:href="url" class="flex h-full items-center text-xl">{{ company }}</a>
         -->
        <!-- v-bind:href="" es lo mismo que :href="" -->
        <nav class="ml-12 h-full">
          <ul class="flex h-full">
            <!-- falta agregar la clase list-none -->

            <!--
              <li class="ml-9 h-full">
                <a class="flex h-full items-center py-2.5">Locations</a>
              </li>
              <li class="h-full">
              <a class="flex h-full items-center py-2.5">Teams</a>
            </li>
            <li class="ml-9 h-full">
              <a class="flex h-full items-center py-2.5">Locations</a>
            </li>

            <li class="ml-9 h-full">
              <a class="flex h-full items-center py-2.5">Life at GoogleClone Corp</a>
            </li>
            <li class="ml-9 h-full">
              <a class="flex h-full items-center py-2.5">How we hire</a>
            </li>
            <li class="ml-9 h-full">
              <a class="flex h-full items-center py-2.5">Students</a>
            </li>
            <li class="ml-9 h-full">
              <a class="flex h-full items-center py-2.5">Jobs</a>
            </li>

            ////este código es la forma larga de lo escrito debajo de este mismo

          -->
            <!-- ///////////////////////
            <li v-for="i in menuItems" :key="i" class="ml-9 h-full first:ml-0">
              <a class="flex h-full items-center py-2.5">{{ i }}</a>
            </li>
            v-for="value in source" es básicamente un forloop, dentro de "" se define una variable(value) 
              y luego que lo tome (in) de la fuente(source) que vendría desde nuestro script array; a cada iteración hay que asignarle un identificador SI O SI, 
              en Vue se llaman v-blind:key y este debe ser único para cada iteración, puede asignarse el mismo valor del array, osea el nombre de la variable(value)
              
              luego, con tailwind podemos decirle que solo a la primera iteración le aplique un margen especifico, con poner first:
            -->

            <li v-for="i in menuItems" :key="i.text" class="ml-9 h-full first:ml-0">
              <router-link v-bind:to="i.url" class="flex h-full items-center py-2.5">{{
                i.text
              }}</router-link>
            </li>
          </ul>
        </nav>
        <div class="ml-auto flex h-full items-center">
          <profile-image v-if="isLoggedIn" />
          <action-button v-else text="Sing in" type="primary" v-on:click="LOGIN_USER" />
          <!-- v-if y v-else es lo mismo que if() else en JS 
          
           para aplicar una clase tailwind solo a casos especificos se usa un prefix, 
           por ejemplo, cuando queremos que se aplique un efecto cuando ponemos el mouse encima, usamos hover: 

          también estamos utilizando v-on: (abreviado @), que signfica "que hacer en...", 
          lo que utilizamos para que ejecute una acción cuando se hace 'click'
        
          al definir aquí text="Sing in", este es recibido por action-button, 
          osea ActionButton.vue, de forma props, y lo asigna al texto, de esta forma este código html se vuelve el componente padre, 
          y el action-button pasa a ser su componente hijo, de esta forma podemos reutilizar todas las veces que querramos el botón ActionButton.vue
          
          usamos también userStore.loginUser, porque en computed llamamos a nuestro useUserStore de pinia, y lo inyectamos de alguna forma en Vue, en nuestro this, no muy entiendo esta parte, pero podes usarlo ahora en cualquier parte de nuestro script con la llave this.userStore, sin embargo, en la sección de Template NO SE NECESITA usar nunca this, no hace falta, solo se escribe directamente userStore.loginUser ... Esto hace que lo que esté cambiando, el isLoggedIn que está cambiando no es el del este script, sino el state de pinia
        
          -->
        </div>
      </div>

      <sub-nav v-if="isLoggedIn" />
      <!-- <sub-nav v-if="isLoggedIn" /> -->
      <!-- condicionamos que aparezca el SuvNav solo si estan loggeado -->
    </div>
  </header>
</template>

<script lang="ts" setup>
import ActionButton from '@/components/Shared/ActionButton.vue';
import ProfileImage from '@/components/Navigation/ProfileImage.vue';
import SubNav from '@/components/Navigation/SubNav.vue';

import { useUserStore } from '@/stores/user';
import { ref, computed } from 'vue';

//importamos mapStores desde pinia y nuestro User Store
const userStore = useUserStore();
const menuItems = ref([
  { text: 'Teams', url: '/teams' },
  { text: 'Locations', url: '/' },
  { text: 'Life at GoogleClone Corp', url: '/' },
  { text: 'How we hire', url: '/' },
  { text: 'Students', url: '/' },
  { text: 'Jobs', url: { name: 'JobResults' } },
]);

const LOGIN_USER = userStore.LOGIN_USER;
const isLoggedIn = computed(() => userStore.isLoggedIn);
const headerHeightClass = () => ({
  'h-16': !isLoggedIn.value,
  'h-32': isLoggedIn.value,
});
</script>

<!-- Vue 2 y 3 old form -->
<!-- <script>
import ActionButton from '@/components/Shared/ActionButton.vue';
import ProfileImage from '@/components/Navigation/ProfileImage.vue';
import SubNav from '@/components/Navigation/SubNav.vue';
//
// import { mapStores } from 'pinia';
import { mapState, mapActions } from 'pinia';

import { useUserStore, LOGIN_USER } from '@/stores/user';

//importamos mapStores desde pinia y nuestro User Store

export default {
  name: 'MainNav',
  components: {
    ActionButton,
    ProfileImage,
    SubNav,
  },

  data() {
    return {
      // company: 'GoogleClone Jobs',
      // url: 'https://careers.google.com',
      menuItems: [
        { text: 'Teams', url: '/teams' },
        { text: 'Locations', url: '/' },
        { text: 'Life at GoogleClone Corp', url: '/' },
        { text: 'How we hire', url: '/' },
        { text: 'Students', url: '/' },
        { text: 'Jobs', url: { name: 'JobResults' } },
        // isLoggedIn: false,
      ],
    };
    /*
    todos los datos que regresa este return dentro de data, apuntan a .this, por lo que pueden usarse fuera de data, es una convención de Vue no de JavaScript, porque .this apunta originalmente solo objeto en cuestion, pero aquí este return permite que los datos puedan ser accesibles desde methods con this
    */
  },

  computed: {
    ...mapState(useUserStore, ['isLoggedIn']),
    //usando directamente mapState o mapActions, es básicamente lo mismo que mapStores, la direfencia es que lo que importamos se va directamente a .this, es decir, no se va a un objeto como this.userStore, así que podemos llamar lo importado como this.isLoggedIn, en vez de this.userStores.isLoggedIn, etc...

    // ...mapStores(useUserStore),
    //...mapStores(useUserStore) devuelve básicamente un objeto que contiene los state y actions de useUserStore, pero con el nombre del iD de useUserStore mezclado con la palabra Store, porque la función de useUserStore es defineStore, osea que define una Store, el producto que devuelve es userStore (id + Store). El objeto devuelto "userStore", contiene todos los state y actions de useUserStore, para llamarlos es como si fuera un objeto con sus propiedades, es decir, userStore.isLoggedIn, pero! estos se almacenaron de forma ¿invicible? en nuestro enviroment?, para acceder a este objeto hay que usar this.userStore.isLoggedIn
    headerHeightClass() {
      return {
        // 'h-16': !this.userStore.isLoggedIn,
        // 'h-32': this.userStore.isLoggedIn,
        'h-16': !this.isLoggedIn,
        'h-32': this.isLoggedIn,
      };
    },
  },

  methods: {
    ...mapActions(useUserStore, [LOGIN_USER]),
    //esto es solo si usamos mapActions...

    // loginUser() {
    //   this.userStore.isLoggedIn = true;
    // },
  },
};
</script> -->
