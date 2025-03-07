import { useUserStore } from '@/stores/user';
import AboutView from '@/views/AboutView.vue';
import HomeView from '@/views/HomeView.vue';
import ManageView from '@/views/ManageView.vue';
import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router';

export const AppRouteNames = {
  home: 'home',
  about: 'about',
  manage: 'manage',
};

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: AppRouteNames.home,
    component: HomeView,
    meta: { requireAuth: false },
  },
  {
    path: '/about',
    name: AppRouteNames.about,
    component: AboutView,
    meta: { requireAuth: false },
  },
  {
    path: '/manage-music',
    alias: ['/manage-audio', '/manage-songs'],
    name: AppRouteNames.manage,
    component: ManageView,
    meta: { requireAuth: true },
    // beforeEnter: (to, from, next) => {
    //   const { isUserLoggedIn } = useUserStore();
    //   if (isUserLoggedIn) {
    //     next();
    //   } else {
    //     next({ name: 'home' });
    //   }
    // },
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
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !useUserStore().isUserLoggedIn) {
    next({ name: AppRouteNames.home });
  } else {
    next();
  }
});
export default router;
