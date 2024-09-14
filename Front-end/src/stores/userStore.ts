import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types'

export const useUserStore = defineStore('user', () => {
  
  const user = ref<User>({
    username: localStorage.getItem('username') || '',
    email: localStorage.getItem('email') || '',
    password: localStorage.getItem('password') || '',
    role: localStorage.getItem('role') || ''
  })
  
  const jwt = ref('')

  const role = computed(() => user.value.role)
  const username = computed(() => user.value.username)
  const isAuthenticated = computed(() => jwt.value !== "")

  function authenticated(authUser: User, token: string) {
    user.value = authUser
    jwt.value = token

    localStorage.setItem('username', user.value.username)
    localStorage.setItem('email', user.value.email)
    localStorage.setItem('password', user.value.password)
    localStorage.setItem('role', user.value.role)
  }

  function logout() {
    jwt.value = ""
    user.value = {} as User

    localStorage.clear()
  }

  return {  user, jwt, role, username, isAuthenticated, authenticated, logout }

})
