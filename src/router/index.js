import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from './main'
import Admin from './admin';

Vue.use(VueRouter)

const routes = [
    ...Main,
    ...Admin,
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
