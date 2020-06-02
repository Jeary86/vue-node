
import Admin from '../admin/index';
import Login from '../admin/Login';

const admin = [
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        children :[
            {
                path: 'login',
                name: 'Login',
                component: Login
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
]

export default admin;