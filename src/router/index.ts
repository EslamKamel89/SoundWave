import { useUserStore } from '@/stores/user';
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
    path: '/manage-music',
    alias: ['/manage-audio', '/manage-songs'],
    name: 'manage',
    component: ManageView,
    beforeEnter: (to, from, next) => {
      const { isUserLoggedIn } = useUserStore();
      if (isUserLoggedIn) {
        next();
      } else {
        next({ name: 'home' });
      }
    },
  },
  {
    path: '/manage',
    redirect: { name: 'manage' },
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'home' },
  },
];
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  linkExactActiveClass: '!text-yellow-500',
  routes,
});
// router.beforeEach((to, from, next) => {
//   pr(to, 'to - Global Guard');
//   pr(from, 'from - Global Guard');
//   next();
// });
export default router;
