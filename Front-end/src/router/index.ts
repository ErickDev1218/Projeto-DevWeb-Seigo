import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ActInDetails from '@/pages/ActInDetails.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import CapInDetails from '@/pages/CapInDetails.vue'
import AdminPage from '@/pages/AdminPage.vue'
import NotFound from '@/pages/NotFound.vue'

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

      path:'/register',
      component: RegisterPage
    },
    {
      path:'/login',
      component: LoginPage
    },
    {
      path: '/capDetails/:id',
      component: CapInDetails
    },
    {
      path: '/admin',
      component: AdminPage
    },
    { 
      path: '/:pathMatch(.*)*', 
      component: NotFound 
    }
  ]
})

export default router
