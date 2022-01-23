import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Component404 from '../views/Component404.vue';

const routes = [
  { path: '/', name: 'home', component: Home, alias: ['/home'] },
  { path: '/register', name: 'register', component: Register },
  { path: '/login', name: 'login', component: Login },
  { path: '/:pathMatch(.*)', component: Component404 }
];

const router = createRouter({
  history: createWebHistory(), routes
});

export default router;
