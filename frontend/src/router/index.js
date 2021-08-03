import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [

  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  },

  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },

  {
    path: '/post',
    name: 'Post',
    component: () => import('../views/Post.vue')
  },

  {
    path: '/profil',
    name: 'Profil',
    component: () => import('../views/Profil.vue')
  },

  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },

]

const router = new VueRouter({
  routes
})

export default router
