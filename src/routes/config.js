import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../components/Login';
import Signup from '../components/Signup';
import Game from '../components/Game';

Vue.use(VueRouter);

const routes = [
    { path: '/', component: Login },
    { path: '/signup', component: Signup },
    { path: '/game', component: Game }
]

const router = new VueRouter({
    mode: "history",
    routes
  });
  
export default router;
