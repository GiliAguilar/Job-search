<template>
  <form
    class="flex h-10 w-full items-center rounded-3xl border border-solid border-brand-gray-3"
    @submit.prevent="searchForJobs"
  >
    <!-- v-on:submit lo que hace es que observa por un evento de submit, y nuestro evento de submit aquí es el que hacen los text-input que pertenecen a form, estos al precionar enter o algún botón de submit, lo que hacen es enviar la información y refrescar la página; con Vue no queremos que se refresque la página, por lo que debemos prevenir el clásico default que se encuentra dentro de las funciones de manipulación DOM visto en el curso de JavaScript, por lo que aquí en Vue se hace poniendo simplemente .prevent en nuestro v-on:submit. Aquí llamamos a la función searchForJobs -->
    <font-awesome-icon icon="fa-solid fa-search" class="ml-4 mr-3" />

    <div class="flex h-full flex-1 text-base font-light">
      <div class="relative flex h-full flex-1 items-center pr-3">
        <label for="role" class="absolute -top-10 left-0">Role</label>
        <text-input id="role" v-model="role" placeholder="Software engineer" />
        <!--
        <text-input placeholder="Software engineer" :value="role" @handle-input="role = $event" />
        -->
        <!-- 
          <text-input
          placeholder="Software engineer"
          @handle-input="updateRole"
        />
        
        para obtener información de los hijos, se utiliza v-on: y el nombre del metodo nombrado en
        el hijo, en este caso, con this.$emit('handleInput', this.value) y luego entre las comillas
        lo mandamos a la variable dentro de nuestro componente que se actualizará-->
      </div>
      <span
        class="flex h-full items-center border-l border-r border-brand-gray-3 bg-brand-gray-2 px-3"
      >
        in
      </span>
      <div class="relative flex h-full flex-1 items-center pl-3">
        <label for="location" class="absolute -top-10 left-0">Where?</label>
        <text-input id="location" v-model="location" placeholder="Los Angeles" />
        <!--
        <text-input placeholder="Los Angeles" :value="location" @handle-input="location = $event" />
        <text-input placeholder="Los Angeles" @handle-input="location = $event" />
         podemos usar una actualización inline de los datos mezclando html y javascript, asignando directamente los datos de nuestros hijos al componente padre, este, para eso, usamos $event, que es básicamente lo mismo que poner payload en nuestra función usada en updateRole, y es básicamente el valor que se obtiene del evento $emit de nuestro componente hijo -->
      </div>
    </div>
    <action-button text="Search" type="secondary" class="rounded-r-3xl" />
  </form>
</template>

<!-- Vue 2 y 3 mix, old form -->
<!-- <script>
import ActionButton from '@/components/Shared/ActionButton.vue';
import TextInput from '@/components/Shared/TextInput.vue';

export default {
  name: 'JobSearchForm',
  components: {
    ActionButton,
    TextInput,
  },
  data() {
    return {
      role: '',
      location: '',
    };
  },
  // methods: {
  //   updateRole(payload) {
  // console.log(payload);
  //   this.role = payload;
  // },
  // updateLocation(payload) {
  //   console.log(payload);
  //   this.location = payload;
  // },
  // },
  methods: {
    searchForJobs() {
      this.$router.push({
        //aquí estamos creando un nuevo link básicamente, al utilizar $router.push, pero le pasamos un objeto, con la configuración, en este caso, le decimos que queremos la dirección o path de JobResults, pero le colocamos de último a link la información en forma de Key que queremos preservar, para eso usamos query, lo que esté dentro de query serán llaves que irán en el link, ejemplo /jobs/results?role=role&location=location. Notose, esto no lleva aún nada de iD, por lo que no se está llamando a JobListing, supongo eso se hará dentro de los resultados de la busqueda
        name: 'JobResults',
        query: {
          role: this.role,
          location: this.location,
        },
      });
    },
  },
};
</script> -->

<!-- Vue 3.2 new form -->
<script lang="ts" setup>
import ActionButton from '@/components/Shared/ActionButton.vue';
import TextInput from '@/components/Shared/TextInput.vue';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const role = ref('');
const location = ref('');

const router = useRouter();
//como no tenemos acceso a this.$router, usamos una función nueva llamada useRouter(), importada de "vue-router", que nos dará como resultado un objeto router que hace exactamente lo mismo

const searchForJobs = () => {
  router.push({
    name: 'JobResults',
    query: {
      role: role.value,
      location: location.value,
    },
  });
};
</script>
