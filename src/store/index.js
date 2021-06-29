import { createStore } from 'vuex';
import * as fb from '../firebase';

import tasks from './tasks';

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
        dispatch('fetchUserProfile', user)
      } catch (e) {
        return e;
      }
    },
    async fetchUserProfile({ commit }, user) {
      const userProfile = await fb.usersCollection.doc(user.uid).get()
      commit('setUserProfile', userProfile.data());
    },
    async signup({ dispatch }, form) {
      const { user } = await fb.auth.createUserWithEmailAndPassword(form.email, form.password)
      await fb.usersCollection.doc(user.uid).set({
        username: form.username,
        email: form.email
      });
      dispatch('fetchUserProfile', user)
    },
    async logout({ commit }) {
      await fb.auth.signOut();
      commit('setUserProfile', {});
    }
  },
  modules: {
    tasks
  }
})