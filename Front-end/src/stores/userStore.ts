import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { User } from '@/types'

export const useUserStore = defineStore('user', () => {
  
  const user = ref<User>({
    username: localStorage.getItem('username') || '',
    email: localStorage.getItem('email') || '',
    role: {
        name : localStorage.getItem('role') || ''
    }, 
    id : localStorage.getItem('id') || ''
  })
  
  const jwt = ref(localStorage.getItem('jwt') || '')

  const role = computed(() => user.value.role.name)
  const username = computed(() => user.value.username)
  const id = computed(() => user.value.id)
  const isAuthenticated = computed(() => jwt.value !== "")

  function authenticated(authUser: User, token: string) {
    user.value = authUser
    jwt.value = token

    localStorage.setItem('username', authUser.username)
    localStorage.setItem('email', authUser.email)
    localStorage.setItem('role', authUser.role.name)
    localStorage.setItem('jwt', token)
    localStorage.setItem('id', authUser.id)
  }

  function logout() {
    jwt.value = ""
    user.value = {} as User

    localStorage.clear()
  }

  return {  user, jwt, role, username, id, isAuthenticated, authenticated, logout }

})