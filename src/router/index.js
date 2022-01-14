import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Auth from '../views/Auth.vue';

const routes = [
  { path: '/', component: Home, name: 'Home', alias: ['/home'] },
  { path: '/login', name: 'login', components: Auth },
];

const router = createRouter({
  history: createWebHistory(), routes
})

export default router
