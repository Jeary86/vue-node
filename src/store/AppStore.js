import Admin from '../router/admin'
export default {
    state: {
        loaderName: "loading",
        adminRouter : Admin,
        sidebar : true,
        userInfo : {}
    },
    mutations: {
        SET_LOADER_NAME: (state, payload) => {
            state.loaderName = payload
        },
        SET_ADMIN_ROUTER: (state, payload) => {
            state.adminRouter = payload
        },
        SET_SIDEVAR: (state, payload) => {
            state.sidebar = payload
        },
        SET_USER_INFO: (state, payload) => {
            state.userInfo = payload
        }
    },
    actions: {
        setLoaderName: ({commit, state}, payload) => {
            return commit('SET_LOADER_NAME', payload)
        },
        setAdminRouter: ({commit, state}, payload) => {
            return commit('SET_ADMIN_ROUTER', payload)
        },
        setSidebar: ({commit, state}, payload) => {
            return commit('SET_SIDEVAR', payload)
        },
        setUserInfo: ({commit, state}, payload) => {
            return commit('SET_USER_INFO', payload)
        }
    },
    getters: {
        loaderName: state => state.loaderName,
        adminRouter: state => state.adminRouter,
        sidebar:state => state.sidebar,
        userInfo:state => state.userInfo
    }
}
