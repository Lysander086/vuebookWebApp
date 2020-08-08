import Vue from 'vue'
import VueRouter from 'vue-router'
// import Ebook from '@/views/ebook'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    alias: '/ebook',
    component: () => import('@/views/ebook/index.vue'),
    // only for developing
    beforeEnter: (to, from, next) => {
      // console.log(to)
      if (to.params && !to.params.fileName) {
        console.log('developing mode')
        to.params.fileName = 'History|try'
      }
      next()
    },
    // END: only for developing
    children: [
      {
        path: ':fileName',
        component: () => import('@/components/ebook/EbookReader'),

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
