import { createRouter, createWebHashHistory } from 'vue-router'


const routes = [


   /* 

  */
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
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
