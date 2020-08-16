import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import Autoplay from '../views/Autoplay.vue';

Vue.use(VueRouter)

  const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: HelloWorld
  },
  {
    path: '/play',
    name: 'play',
    component: Autoplay
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
