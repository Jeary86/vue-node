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
        name: '用户管理',
        meta: {
            title: '用户管理'
        },
        redirect : '/admin/userList',
        children :[
            {
                path: '',
                name: 'UserList',
                component: () => import('../admin/components/user/UserList'),
                meta: { title: '用户列表'},
            },
            {
                path: 'userList',
                name: 'UserList',
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
        path: '/table',
        component: Admin,
        redirect: '/table/complex-table',
        name: 'Table',
        meta: {
            title: 'Table'
        },
        children: [
            {
                path: 'dynamic-table',
                // component: () => import('@/views/table/dynamic-table/index'),
                name: 'DynamicTable',
                meta: { title: 'Dynamic Table' }
            },
            {
                path: 'drag-table',
                // component: () => import('@/views/table/drag-table'),
                name: 'DragTable',
                meta: { title: 'Drag Table' }
            },
            {
                path: 'inline-edit-table',
                // component: () => import('@/views/table/inline-edit-table'),
                name: 'InlineEditTable',
                meta: { title: 'Inline Edit' }
            },
            {
                path: 'complex-table',
                // component: () => import('@/views/table/complex-table'),
                name: 'ComplexTable',
                meta: { title: 'Complex Table' }
            }
        ]
    },

    // {
    //     path: '/admin/userList',
    //     name: 'UserList',
    //     component: () => import('../admin/components/user/userList'),
    //     meta: { title: '用户列表'},
    //     hidden: true
    // },
    // {
    //     path: 'userRevise/:id',
    //     name: 'UserRevise',
    //     component: () => import('../admin/components/user/userRevise'),
    //     meta: { title: '修改'},
    //     hidden: true
    // },
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