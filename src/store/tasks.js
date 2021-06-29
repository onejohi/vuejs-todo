import * as fb from '../firebase';

export default {
  state: {
    mytasks: [],
  },
  mutations: {
    setTasks(state, tasks) {
      state.mytasks = tasks;
    },
  },
  actions: {
    async getTasks({ commit }) {
      fb.tasksCollection.orderBy('createdOn', 'desc').onSnapshot((snapshot) => {
        let taskArray = [];
        snapshot.forEach((doc) => {
          let task = doc.data()
          task.id = doc.id

          taskArray.push(task)
        })
        commit('setTasks', taskArray);
      })
    },
    async createTask(_, params) {
      await fb.tasksCollection.add({
        createdOn: new Date(),
        title: params.title,
        description: params.description,
        userId: fb.auth.currentUser.uid,
        username: fb.auth.currentUser.username,
        priority: params.priority,
        private: params.private,
        imageUrl: params.imageUrl,
        archived: [],
        likes: 0
      });
      this.dispatch('getTasks');
    }
  },
}