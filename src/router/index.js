import Vue from "vue";
import VueRouter from "vue-router";
import store from '../store/index'
import Home from "../views/Home.vue";
import Signin from "@/components/Signin";
import Signup from "@/components/Signup";
import Secure from "@/components/Secure";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/signin',
    name: 'signin',
    component: Signin
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/secure',
    name: 'secure',
    component: Secure,
    meta: {
      requiresAuth: true
    }
  },
]

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/signin')
  } else {
    next()
  }
})


export default router;
