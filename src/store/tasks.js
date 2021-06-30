import * as fb from '../firebase';

export default {
  state: {
    mytasks: [],
    pubtasks: [],
  },
  mutations: {
    setTasks(state, tasks) {
      state.mytasks = tasks;
    },
    setPublicTasks(state, tasks) {
      state.pubtasks = tasks;
    }
  },
  actions: {
    async getTasks({ commit }) {
      const uid = fb.auth.currentUser.uid;
      fb.tasksCollection
        .where('userId', '==', uid)
        .onSnapshot((snapshot) => {
          let taskArray = [];
          snapshot.forEach((doc) => {
            let task = doc.data()
            task.id = doc.id

            taskArray.push(task)
      });
      commit('setTasks', taskArray);
      })
    },
    async likePublicTask(_, task) {
      const userId = fb.auth.currentUser.uid
      const docId = `${userId}_${task.id}`
    
      const doc = await fb.likesCollection.doc(docId).get()
      if (doc.exists) { return }
    
      await fb.likesCollection.doc(docId).set({
        taskId: task.id,
        userId: userId
      })
  
      fb.tasksCollection.doc(task.id).update({
        likes: task.likes + 1
      })
    },
    async completeTask(_, task) {  
      await fb.tasksCollection.doc(task.id).update({
        complete: true
      })
    },
    async getPublicTasks({ commit }) {
      fb.tasksCollection.where('private', "==", false).onSnapshot((snapshot) => {
        let taskArray = [];
        snapshot.forEach((doc) => {
          let task = doc.data()
          task.id = doc.id

          taskArray.push(task)
        })
        commit('setPublicTasks', taskArray);
      })
    },
    async createTask(_, params) {
      console.log({ user: fb.auth.currentUser });
      await fb.tasksCollection.add({
        createdOn: new Date(),
        title: params.title,
        description: params.description,
        userId: fb.auth.currentUser.uid,
        displayName: fb.auth.currentUser.displayName,
        priority: params.priority,
        private: params.private,
        imageUrl: params.imageUrl,
        complete: false,
        archived: [],
        likes: 0
      });
      this.dispatch('getTasks');
    }
  },
}