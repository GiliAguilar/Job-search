import { useUserStore } from '@/stores/user';
import { createPinia, setActivePinia } from 'pinia';

describe('state', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    //esto sirve para que el test reconozca a pinia, porque esta la montamos en nuestro main.js, de forma global, y todo lo que ponemos de forma global no lo reconoce el test porque no tiene acceso a el... y con setActivePinia es para hacer fake que nuestro pinia está funcionando
  });

  it('keeps track of if user is logged in', () => {
    const store = useUserStore();

    expect(store.isLoggedIn).toBe(false);
  });

  it('stores organizations that the user would like to filter jobs by', () => {
    const store = useUserStore();
    expect(store.selectedOrganizations).toEqual([]);
  });
});

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('loginUser', () => {
    it('logs the user in', () => {
      const store = useUserStore();
      store.LOGIN_USER();

      expect(store.isLoggedIn).toBe(true);
    });
  });

  describe('ADD_SELECTED_ORGANIZATIONS', () => {
    it('updates organizations the user has chosen to filter jobs by', () => {
      const store = useUserStore();
      store.ADD_SELECTED_ORGANIZATIONS(['Org1', 'Org2']);

      expect(store.selectedOrganizations).toEqual(['Org1', 'Org2']);
    });
  });
});