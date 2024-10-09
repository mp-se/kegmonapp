import { ref } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { global } from '@/modules/pinia'
import HomeView from '@/views/HomeView.vue'
import SettingsView from '@/views/SettingsView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import { logDebug } from '@/modules/logger'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/settings',
    name: 'settings',
    component: SettingsView
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: NotFoundView
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router

router.afterEach((to, from) => {
  logDebug('router.afterEach()', to, from)

  global.clearMessages()
  return true
})

const items = ref([
  {
    label: 'Home',
    icon: 'IconHome',
    path: '/',
    subs: []
  },
  {
    label: 'Settings',
    icon: 'IconTools',
    path: '/settings',
    subs: []
  }
])

export { items }
