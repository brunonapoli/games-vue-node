import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../src/components/Login.vue';
import Signup from '../src/components/Signup.vue';
import Llegada from '../src/components/Llegada.vue';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Login },
    { path: '/signup', component: Signup },
    { path: '/llegada', component: Llegada }
]

const router = new VueRouter({
    mode: "history",
    routes
  });
  
  export default router;
