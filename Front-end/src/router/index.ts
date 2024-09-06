import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ActInDetails from '@/pages/ActInDetails.vue'
import Login from '@/pages/LoginPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomePage
    },
    {
      path:'/actDetails/:id',
      component: ActInDetails
    },
    {
      path:'/login',
      component: Login
    },

  ]
})

export default router
