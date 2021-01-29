import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from './main'
import Admin from './admin';
import NotFound404 from '../views/NotFound404.vue'

Vue.use(VueRouter)

const routes = [
    ...Main,
    ...Admin,
    { path: '*', component: NotFound404 }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}


export default router
