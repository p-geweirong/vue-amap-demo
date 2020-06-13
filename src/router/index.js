import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/map',
    name: 'map',
    component: () => import('../views/map.vue')
  },
  {
    path: '/mapnavigation',
    name: 'mapnavigation',
    component: () => import('../views/MapNavigation.vue')
  },
  {
    path: '/animation',
    name: 'animation',
    component: () => import('../views/animation.vue')
  },
  {
    path: '/user',
    name: 'user',
    component: () => import('../views/User.vue')
  },
  {
    path: '/userDetails',
    name: 'userDetails',
    component: () => import('../views/userDetails.vue')
  },
]


const router = new VueRouter({
  routes
})

export default router
