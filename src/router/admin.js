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
                path: 'works',
                component: AppMain,
                redirect: '/admin/works/works-list',
                name: '案例管理',
                meta: {
                    title: '案例管理',icon:'el-icon-picture'
                },
                children: [
                    {
                        path: 'works-list',
                        name: 'WorksList',
                        component: () => import('../admin/components/works/WorksList'),
                        meta: { title: '案例列表' }
                    },
                    {
                        path: 'add-works',
                        name: 'AddWorks',
                        component: () => import('../admin/components/works/AddWorks'),
                        meta: { title: '新建案例' ,breadcrumb : true},
                    },
                    {
                        path: 'edit-works/:id(\\d+)',
                        name: 'EditWorks',
                        component: () => import('../admin/components/works/EditWorks'),
                        meta: { title: '编辑案例',noCache: true, activeMenu: '/admin/works/works-list'},
                        hidden: true
                    }

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