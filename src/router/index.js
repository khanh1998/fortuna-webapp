import Vue from 'vue';
import VueRouter from 'vue-router';
import jwtDecode from 'jwt-decode';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresAuth: false },
  },
  {
    path: '/about',
    name: 'About',
    meta: { requiresAuth: false },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    const jwt = localStorage.getItem('JWT');
    if (jwt) {
      const decoded = jwtDecode(jwt);
      console.log(decoded);
      const { exp } = decoded;
      const now = Date.now();
      const isExpired = now >= exp * 1000;
      if (!isExpired) {
        console.log('not expired');
        next();
      } else {
        localStorage.setItem('JWT', null);
        next({
          name: 'Login',
        });
      }
    } else {
      next({
        name: 'Login',
      });
    }
  } else {
    next();
  }
});

export default router;
