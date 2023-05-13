import { RouteLocation, createRouter, createWebHistory } from 'vue-router';
import MainLayout from './layouts/MainLayout.vue';
import LoginPage from './pages/LoginPage.vue';
import DashboardPage from './pages/DashboardPage.vue';
import UsersPage from './pages/UsersPage.vue';
import ProductsPage from './pages/ProductsPage.vue';
import CategoriesPage from './pages/CategoriesPage.vue';
import { useAuthStore } from './stores/authStore';

const guard = async (to: RouteLocation, from: RouteLocation, next: any) => {
  const authStore = useAuthStore();
  await authStore.checkAuth();
  const isAuthenticated = authStore.isAuthenticated;
  if (to.path !== '/login' && !isAuthenticated) {
    next('/login');
  } else if (to.path === '/login' && isAuthenticated) {
    next('/dashboard');
  } else {
    next();
  }
};

const routes = [
  {
    path: '/',
    component: MainLayout,
    redirect: '/login',
    children: [
      {
        path: 'login',
        component: LoginPage,
      },
      {
        path: 'dashboard',
        component: DashboardPage,
      },
      {
        path: 'users',
        component: UsersPage,
      },
      {
        path: 'products',
        component: ProductsPage,
      },
      {
        path: 'categories',
        component: CategoriesPage,
      }
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  return guard(to, from, next);
});
