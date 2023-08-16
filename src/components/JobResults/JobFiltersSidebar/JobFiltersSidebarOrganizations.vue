<template>
  <collapsible-accordion header="Organization">
    <fieldset>
      <ul class="flex flex-row flex-wrap">
        <li v-for="i in UNIQUE_ORGANIZATIONS" :key="i" class="h-8 w-1/2">
          <input
            :id="i"
            v-model="selectedOrganizations"
            :value="i"
            type="checkbox"
            class="mr-3"
            @change="selectOrganization"
          />
          <!-- aquí, el :id lo que hace es como poner de referencia que este input tendrá nombre id=i, luego con v-model lo que hacemos es decirle a Vue que la variable que esté pasando por aquí se vaya a donde le indicamos (v-model="selectedOrganizations"), y luego la variable que pasa por aquí se asigna con value=i, para que sea de forma dinámica que asigne valores, siempre se pone v-bind ante de value y id (":")

          Ahora bien, vamos a actualizar nuestro Pinia, para eso vamos a llamar a un method que haga ese trabajo, usamos para eso v-on, para escuchar al DOM, y le decimos que si el html cambie que ejecute nuestro method, osea v-on:change="selectOrganization", por lo cual, hay que utilizar v-on:change, lo que observará cuando exista un cambio en nuestro HTML, y siguiente, llamará al metodo elegido, en este caso, selectOrganization
          -->
          <label :for="i">{{ i }}</label>
        </li>
      </ul>
    </fieldset>
  </collapsible-accordion>
</template>

<!-- VUe 2 y 3 mix, old form -->
<!-- <script>
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue';
import { mapState, mapActions } from 'pinia';
import { useJobsStore, UNIQUE_ORGANIZATIONS } from '@/stores/jobs';
import { useUserStore, ADD_SELECTED_ORGANIZATIONS } from '@/stores/user';

export default {
  name: 'JobFiltersSidebarOrganizations',

  components: {
    CollapsibleAccordion,
  },

  data() {
    return {
      selectedOrganizations: [],
    };
  },

  computed: {
    ...mapState(useJobsStore, [UNIQUE_ORGANIZATIONS]),
    //podemos usar mapState para invocar state y getters, y todo irá a this.
  },

  methods: {
    ...mapActions(useUserStore, [ADD_SELECTED_ORGANIZATIONS]),
    selectOrganization() {
      this.ADD_SELECTED_ORGANIZATIONS(this.selectedOrganizations);
      //aquí lo que hacemos es, primero que nada, todo lo que venga de pinia y sean "actions", debe ser importado con ...mapActions y pasa a formar parte de this., pero no significa que se ejecute la acción o se haya llamado, por tanto, usamos esta función de selectOrganization() para que, al ser llamada esta función, podamos llamar a la función de ADD_SELECTED_ORGANIZATIONS, y le pasamos como parámetro nuestro Array que contiene nuestra selección, notoese que nuestra selección depende previamente de un checkbox, por consiguiente, si el usuario quita un checkbox automáticamente será elminada esa entrada de nuestro array "selectedOrganizations"
      this.$router.push({ name: 'JobResults' });
    },
  },
};
</script> -->

<script setup>
import CollapsibleAccordion from '@/components/Shared/CollapsibleAccordion.vue';
import { useJobsStore } from '@/stores/jobs';
import { useUserStore } from '@/stores/user';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const selectedOrganizations = ref([]);
const jobsStore = useJobsStore();
const userStore = useUserStore();
const UNIQUE_ORGANIZATIONS = computed(() => jobsStore.UNIQUE_ORGANIZATIONS);

const selectOrganization = () => {
  userStore.ADD_SELECTED_ORGANIZATIONS(selectedOrganizations.value);
  router.push({ name: 'JobResults' });
};
</script>
