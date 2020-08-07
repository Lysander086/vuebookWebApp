import Vue from 'vue'
import VueRouter from 'vue-router'
// import Ebook from '@/views/ebook'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: '/ebook',
    component: () => import('@/views/ebook/index.vue'),
    children: [
      {
        path: ':fileName',
        component: () => import('@/components/ebook/EbookReader')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
