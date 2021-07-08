import { createRouter, createWebHistory } from 'vue-router';

import Home from './components/Home.vue';
import MyDos from './components/Home/MyDos.vue';
import WeDo from './components/Home/WeDo.vue';
import Users from './components/Home/Users.vue';
import Me from './components/Home/Me.vue';

import Auth from './components/Auth.vue';
import Login from './components/Auth/Login.vue';
import Register from './components/Auth/Register.vue';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '',
      name: 'home',
      meta: { requiresAuth: true },
      component: Home,
      children: [
      { path: '', name: 'mydos', component: MyDos, },
      { path: 'wedo', name: 'wedo', component: WeDo },
      { path: 'users', name: 'users', component: Users },
      { path: 'me', name: 'me', component: Me }
    ] },
    { path: '/auth', name: 'auth', component: Auth, children: [
      { path: '', name: 'login', component: Login },
      { path: '/register', name: 'register', component: Register }
    ]}
  ],
});
