import { createStore } from 'vuex';
import * as fb from '../firebase';
import router from '../router';

import tasks from './tasks';
import users from './users';

export default createStore({
  state: {
    user: {},
  },
  mutations: {
    setUserProfile(state, user) {
      state.user = user;
    }
  },
  actions: {
    async login({ dispatch }, form) {
      try {
        const { user } = await fb.auth.signInWithEmailAndPassword(form.email, form.password)
        const token = await user.getIdTokenResult();
        window.localStorage.setItem('token', token.token);
        window.localStorage.setItem('userid', user.uid);
        dispatch('fetchUserProfile', user)
      } catch (e) {
        return e;
      }
    },
    async fetchUserProfile({ commit }, user) {
      const userProfile = await fb.usersCollection.doc(user.uid).get()
      if (userProfile.exists ) 
      commit('setUserProfile', userProfile.data());
    },
    async authorizeUser() {
      const token = window.localStorage.getItem('token');
      if (!token) {
        router.push({ name: 'login' });
      }
      if (token) {
        // TODO: verifiy user form backend
      }
    },
    async signup({ dispatch }, form) {
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
      await fb.usersCollection.doc(user.uid).set({
        displayName: form.displayName,
        email: form.email
      });
      dispatch('fetchUserProfile', user)
      router.push('/');
    },
    async logout({ commit }) {
      await fb.auth.signOut();
      commit('setUserProfile', {});
    }
  },
  modules: {
    tasks,
    users,
  }
})