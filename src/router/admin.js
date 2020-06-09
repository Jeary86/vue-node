import Admin from '../admin/Index';
import AppMain from '../admin/AppMain';
import Login from '../admin/Login';

const admin = [
    {
        path: '/admin',
        component: Admin,
        redirect: '/admin/index',
        children :[
            {
                path: 'index',
                name: 'Admin',
                component: () => import('@/admin/components/index/Index'),
                meta: { title: '首页',icon:'el-icon-s-home'},
            },
            {
                path: 'case',
                component: AppMain,
                redirect: 'case-list',
                name: '案例管理',
                meta: {
                    title: '项目管理',icon:'el-icon-picture'
                },
                children: [
                    {
                        path: 'case-list',
                        name: '案例列表',
                        component: () => import('../admin/components/case/CaseList'),
                        meta: { title: '案例列表' }
                    },
                    {
                        path: 'add-case',
                        name: '新建案例',
                        component: () => import('../admin/components/case/AddCase'),
                        meta: { title: '新建案例' },

                    },

                ]
            },
            {
                path: 'user',
                component: AppMain,
                redirect : '/admin/user/userList',
                name: '用户管理',
                meta: {
                    title: '用户管理',icon:'el-icon-user-solid'
                },
                children :[
                    {
                        path: 'userList',
                        name: 'UserList',
                        component: () => import('../admin/components/user/UserList'),
                        meta: { title: '用户列表'},
                    },
                    {
                        path: 'add-user',
                        name: 'AddUser',
                        component: () => import('../admin/components/user/AddUser'),
                        meta: { title: '添加用户'},
                    },
                    {
                        path: 'userRevise/:id(\\d+)',
                        name: 'UserRevise',
                        component: () => import('../admin/components/user/UserRevise'),
                        meta: { title: '修改', noCache: true, activeMenu: '/admin/user/userList'},
                        hidden: true
                    }
                ]
            },

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