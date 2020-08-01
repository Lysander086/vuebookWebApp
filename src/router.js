import Vue from 'vue';
import VueRouter from 'vue-router';
import Demo from './views/Demo.vue';

Vue.use(VueRouter);

const routes = [
  {
    alias: "/",
    path: "/demo",
    name: 'Demo',
    component: Demo
  },
  {
    path: "/parent",
    name: 'Parent',
    component: () => import('@/views/Parent')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
