import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import ActInDetails from '@/pages/ActInDetails.vue'
import LoginPage from '@/pages/LoginPage.vue'
import RegisterPage from '@/pages/RegisterPage.vue'
import CapInDetails from '@/pages/CapInDetails.vue'
import AdminPage from '@/pages/AdminPage.vue'
import NotFound from '@/pages/NotFound.vue'
import ProfilePage from '@/pages/ProfilePage.vue'
import { useUserStore } from '@/stores/userStore'

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
      component: AdminPage,
      meta: {
        requiresAuth: true
      }
    },
    { 
      path: '/:pathMatch(.*)*', 
      component: NotFound 
    },
    {
      path : '/profile/:id',
      component: ProfilePage
    }
  ]
})

router.beforeEach((to) => {
  const userStore = useUserStore()
  if(to.meta.requiresAuth && !userStore.isAuthenticated) {
    return '/login'
  }
})

export default router
