import { defineStore } from 'pinia';
//importamos un almacenamiento desde pinia

// OLD FORM WITHOUT VUE
// export const LOGIN_USER = 'LOGIN_USER';
// export const ADD_SELECTED_ORGANIZATIONS = 'ADD_SELECTED_ORGANIZATIONS';
// export const ADD_SELECTED_JOB_TYPES = 'ADD_SELECTED_JOB_TYPES';
// export const ADD_SELECTED_DEGREES = 'ADD_SELECTED_DEGREES';
// export const CLEAR_USER_JOB_FILTER_SELECTIONS = 'CLEAR_USER_JOB_FILTER_SELECTIONS';

// export interface UserState {
//   isLoggedIn: boolean;
//   selectedOrganizations: string[];
//   selectedJobTypes: string[];
//   selectedDegrees: string[];
// }


import { ref } from 'vue';


//NEW FORM WITH VUE
export const useUserStore = defineStore('user', () => {
  //STATE
  const isLoggedIn = ref(false);
  const selectedOrganizations = ref<string[]>([]);
  const selectedJobTypes = ref<string[]>([]);
  const selectedDegrees = ref<string[]>([]);

  //ACTIONS
  const LOGIN_USER = () => {
    isLoggedIn.value = true;
  };
  const ADD_SELECTED_ORGANIZATIONS = (organizations: string[]) => {
    selectedOrganizations.value = organizations;
  };
  const ADD_SELECTED_JOB_TYPES = (jobType: string[]) => {
    selectedJobTypes.value = jobType;
  };
  const ADD_SELECTED_DEGREES = (degrees: string[]) => {
    selectedDegrees.value = degrees;
  };
  const CLEAR_USER_JOB_FILTER_SELECTIONS = () => {
    selectedDegrees.value = [];
    selectedJobTypes.value = [];
    selectedOrganizations.value = [];
  };

  return {
    isLoggedIn,
    selectedDegrees,
    selectedJobTypes,
    selectedOrganizations,
    LOGIN_USER,
    ADD_SELECTED_DEGREES,
    ADD_SELECTED_JOB_TYPES,
    ADD_SELECTED_ORGANIZATIONS,
    CLEAR_USER_JOB_FILTER_SELECTIONS,
  };
});

// OLD FORM WITHOUT VUE
// export const useUserStore = defineStore('user', {
//   state: (): UserState => ({
//     // state: () => ({
//     isLoggedIn: false,
//     selectedOrganizations: [],
//     selectedJobTypes: [],
//     selectedDegrees: [],
//   }),
//   //state es el equivalente a data en nuestra app Vue, la diferencia es que este state de pinia nos permitirá conectarnos a diferentes componentes usando este archivo "user.js", como si fuera una variable global, pero que puede cambiar su estado, mientras que una variable global .env es algo estático, según tengo entendido...
//   //state=data, actios=methods, getters=computed
//   actions: {
//     [LOGIN_USER]() {
//       this.isLoggedIn = true;
//     },
//     [ADD_SELECTED_ORGANIZATIONS](organizations: string[]) {
//       this.selectedOrganizations = organizations;
//     },
//     [ADD_SELECTED_JOB_TYPES](jobType: string[]) {
//       this.selectedJobTypes = jobType;
//     },
//     [ADD_SELECTED_DEGREES](degrees: string[]) {
//       this.selectedDegrees = degrees;
//     },
//     [CLEAR_USER_JOB_FILTER_SELECTIONS]() {
//       this.selectedDegrees = [];
//       this.selectedJobTypes = [];
//       this.selectedOrganizations = [];
//     },
//   },
// });
