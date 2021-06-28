import { createRouter, createWebHistory } from 'vue-router';

import Home from './components/Home.vue';
import MyDos from './components/Home/MyDos.vue';
import WeDo from './components/Home/WeDo.vue';
import Users from './components/Home/Users.vue';
import Me from './components/Home/Me.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: '', name: 'home', component: Home, children: [
      { path: '', name: 'mydos', component: MyDos },
      { path: 'wedo', name: 'wedo', component: WeDo },
      { path: 'users', name: 'users', component: Users },
      { path: 'me', name: 'me', component: Me }
    ] },
  ],
});
