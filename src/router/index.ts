import AboutView from '@/views/AboutView.vue';
import HomeView from '@/views/HomeView.vue';
import ManageView from '@/views/ManageView.vue';
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/manage',
    name: 'manage',
    component: ManageView,
  },
];
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: '!text-yellow-500',
  routes,
});

export default router;
