import Vue from 'vue';
import VueRouter from 'vue-router';
import firebase from 'firebase';
import Home from '../views/Home.vue';
import Signup from '../components/auth/Signup.vue';
import Login from '../components/auth/Login.vue';
import ViewProfile from '../components/profile/ViewProfile.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/profile/:user_slug',
    name: 'ViewProfile',
    component: ViewProfile,
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/about',
    name: 'About',
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
  // Check to see if route requires auth
  if (to.matched.some((rec) => rec.meta.requiresAuth)) {
    // Check auth state of user
    const user = firebase.auth().currentUser;
    if (user) {
      // user signed in, proceed to route
      next();
    } else {
      // No user signed in, redirect to login
      next({ name: 'Login' });
    }
  } else {
    // if page doesn't require authentication
    next();
  }
});

export default router;
