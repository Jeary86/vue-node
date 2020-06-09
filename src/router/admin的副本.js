import Admin from '../admin/Index';
import Login from '../admin/Login';

const admin = [
    {
        path: '/admin',
        component: Admin,
        redirect: '/admin',
        children :[
            {
                path: '/admin',
                name: 'Admin',
                component: () => import('@/admin/components/index/Index'),
                meta: { title: '首页'},
            }
        ]
    },

    {
        path: '/admin/userList',
        component: Admin,
        redirect : '/admin/userList',
        name: '用户管理',
        meta: {
            title: '用户管理'
        },
        children :[
            {
                path: '',
                name: 'UserList',
                component: () => import('../admin/components/user/UserList'),
                meta: { title: '用户列表'},
            },
            {
                path: '/admin/add-user',
                name: 'AddUser',
                component: () => import('../admin/components/user/AddUser'),
                meta: { title: '添加用户'},
            },
            {
                path: '/admin/userRevise/:id',
                name: 'UserRevise',
                component: () => import('../admin/components/user/UserRevise'),
                meta: { title: '修改'},
                hidden: true
            }
        ]
    },

    {
        path: '/admin/add-case',
        component: Admin,
        redirect: '/admin/add-case',
        name: '项目管理',
        meta: {
            title: '项目管理'
        },
        children: [
            {
                path: '',
                name: '新建案例',
                meta: { title: '新建案例' }
            },
            {
                path: 'article-list',
                name: '项目列表',
                meta: { title: '项目列表' }
            }
        ]
    },
    {
        path: '/login',
        name: 'Login',
        hidden: true,
        // alwaysShow: true, // 将总是显示根菜单
        component: Login,
        meta: { title: 'Login'}
    }
]

export default admin;