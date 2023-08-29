import { defineStore } from 'pinia';
//importamos un almacenamiento desde pinia

export const LOGIN_USER = 'LOGIN_USER';
export const ADD_SELECTED_ORGANIZATIONS = 'ADD_SELECTED_ORGANIZATIONS';
export const ADD_SELECTED_JOB_TYPES = 'ADD_SELECTED_JOB_TYPES';
export const ADD_SELECTED_DEGREES = 'ADD_SELECTED_DEGREES';

export interface UserState {
  isLoggedIn: boolean;
  selectedOrganizations: string[];
  selectedJobTypes: string[];
  selectedDegrees: string[];
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    // state: () => ({
    isLoggedIn: false,
    selectedOrganizations: [],
    selectedJobTypes: [],
    selectedDegrees: [],
  }),
  //state es el equivalente a data en nuestra app Vue, la diferencia es que este state de pinia nos permitirá conectarnos a diferentes componentes usando este archivo "user.js", como si fuera una variable global, pero que puede cambiar su estado, mientras que una variable global .env es algo estático, según tengo entendido...
  //state=data, actios=methods, getters=computed
  actions: {
    [LOGIN_USER]() {
      this.isLoggedIn = true;
    },
    [ADD_SELECTED_ORGANIZATIONS](organizations: string[]) {
      this.selectedOrganizations = organizations;
    },
    [ADD_SELECTED_JOB_TYPES](jobType: string[]) {
      this.selectedJobTypes = jobType;
    },
    [ADD_SELECTED_DEGREES](degrees: string[]) {
      this.selectedDegrees = degrees;
    },
  },
});
