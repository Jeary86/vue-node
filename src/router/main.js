import Home from '../views/Home.vue'
import HomeContent from '../views/HomeContent'
import Test from  '../views/Test'
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
    {
        path: '/test',
        name: 'Test',
        component: Test
    },
]

export default main;