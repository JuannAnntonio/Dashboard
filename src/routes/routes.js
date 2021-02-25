import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/Pages/AuthLayout.vue';

import NotFound from '@/views/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "demo" */ '../views/Dashboard.vue')
      },
      {
        path: '/datos',
        name: 'datos',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Cliente/Datos.vue')
      },
      {
        path: '/administracion',
        name: 'administracion',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Cliente/Administracion.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/UserProfile.vue')
      },
      /*ADMIN*/
      {
        path: '/clientes',
        name: 'clientes',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Admin/Clientes.vue')
      },
      {
        path: '/sucursales',
        name: 'sucursales',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Admin/Sucursales.vue')
      },
      {
        path: '/dispositivos',
        name: 'dispositivos',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Admin/Dispositivos.vue')
      }

    ]
  },
  {
    path: '/',
    redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Register.vue')
      },
      { path: '*', component: NotFound }
    ]
  }
];

export default routes;
