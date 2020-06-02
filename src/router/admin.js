
import Admin from '../admin/index';
import Login from '../admin/Login';
import UserList from '../admin/userList';
import UserRevise from '../admin/userRevise';

const admin = [
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        children :[
            {
                path: '',
                name: 'UserList',
                component: UserList
            },
            {
                path: 'userList',
                name: 'UserList',
                component: UserList
            },
            {
                path: 'userRevise',
                name: 'UserRevise',
                component: UserRevise
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