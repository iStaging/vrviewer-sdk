import VueRouter from 'vue-router'
import Default from '../pages/Default/index.vue'
import YungChing from '../pages/YungChing/index.vue'

const routes = [{
  path: '/:buildingId?',
  name: 'default',
  component: Default
}, {
  path: '/:buildingId/yung-ching',
  name: 'yung-ching',
  component: YungChing
}]

const routerObj = {
  routes,
  mode: 'history',
  linkActiveClass: 'active'
}

const router = new VueRouter(routerObj)

export default router
