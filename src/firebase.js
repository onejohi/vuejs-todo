import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyBVl8TW3CKYrqboypyLcBWTS2Gm4syIGII",
    authDomain: "vuejs-todo-14644.firebaseapp.com",
    projectId: "vuejs-todo-14644",
    storageBucket: "vuejs-todo-14644.appspot.com",
    messagingSenderId: "431964734995",
    appId: "1:431964734995:web:e5d1c6e5641b7a5880a1e6",
    measurementId: "G-WSBH48H9DZ"
});

const db = firebase.firestore()
const auth = firebase.auth()

const usersCollection = db.collection('users')
const tasksCollection = db.collection('tasks')
const likesCollection = db.collection('likes')

export {
  db,
  auth,
  usersCollection,
  tasksCollection,
  likesCollection
}