import * as fb from '../firebase';

export default {
  state: {
    allUsers: [],
  },
  mutations: {
    setAllUsers(state, users) {
      state.allUsers = users;
    },
  },
  actions: {
    async getUsers({ commit }) {
      fb.usersCollection.orderBy('displayName').onSnapshot((snapshot) => {
        let userArray = [];
        snapshot.forEach((doc) => {
          let user = doc.data()
          user.id = doc.id

          userArray.push(user)
        })
        commit('setAllUsers', userArray);
      })
    },
  },
}