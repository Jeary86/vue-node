import Home from '../views/Home.vue'
import HomeContent from '../views/HomeContent'
const main = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/HomeContent/:id',
        name: 'HomeContent',
        component: HomeContent
    },
]

export default main;