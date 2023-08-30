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

  it('stores job types that the user would like to filter jobs by', () => {
    const store = useUserStore();
    expect(store.selectedJobTypes).toEqual([]);
  });

  it('stores degrees that the user would like to filters jobs by', () => {
    const store = useUserStore();
    expect(store.selectedDegrees).toEqual([]);
  });
});

describe('actions', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe('LOGIN_USER', () => {
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

  describe('ADD_SELECTED_JOB_TYPES', () => {
    it('updates job types the user has chosen and filter jobs by', () => {
      const store = useUserStore();
      store.ADD_SELECTED_JOB_TYPES(['Full-time', 'Part-time']);
      expect(store.selectedJobTypes).toEqual(['Full-time', 'Part-time']);
    });
  });

  describe('ADD_SELECTED_DEGREES', () => {
    it('updates degrees the user has chosen to filter jobs by', () => {
      const store = useUserStore();
      store.ADD_SELECTED_DEGREES(["Bachelor's", "Master's"]);

      expect(store.selectedDegrees).toEqual(["Bachelor's", "Master's"]);
    });
  });

  describe('CLEAR_USER_JOB_FILTER_SELECTIONS', () => {
    it('removes all job filters that user has chosen', () => {
      const store = useUserStore();
      store.selectedDegrees = ['Random degree'];
      store.selectedJobTypes = ['Random job type'];
      store.selectedOrganizations = ['Radom organization'];

      store.CLEAR_USER_JOB_FILTER_SELECTIONS();

      expect(store.selectedDegrees).toEqual([]);
      expect(store.selectedOrganizations).toEqual([]);
      expect(store.selectedJobTypes).toEqual([]);
    });
  });
});