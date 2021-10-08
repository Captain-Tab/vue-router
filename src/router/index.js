import Vue from "vue";
import VueRouter from "../my-router";
import Hello from '@/components/Hello.vue'
import Universal from '@/components/Universal.vue'

Vue.use(VueRouter)

// 静态路由列表
const routes = [
  {
    path: '/',
    redirect: '/hello'
  },
  {
    path: '/hello',
    name: 'Hello',
    component: Hello,
    meta: {
      title: ''
    }
  },
  {
    path: '/universal',
    name: 'Universal',
    component: Universal,
    meta: {
      title: ''
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router