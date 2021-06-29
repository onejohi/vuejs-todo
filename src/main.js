import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import store from './store';
import { auth } from './firebase';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import './app.css';

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth);
  if (requiresAuth && !auth.currentUser) {
    next({ name: 'login' });
  } else {
    next();
  }
});

createApp(App)
  .use(router)
  .use(store)
  .mount('#app');

auth.onAuthStateChanged((user) => {
  if (user) store.dispatch('fetchUserProfile', user);
});
