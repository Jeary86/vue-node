import Admin from '../router/admin'
export default {
    state: {
        loaderName: "loading",
        adminRouter : Admin
    },
    mutations: {
        SET_LOADER_NAME: (state, payload) => {
            state.loaderName = payload
        },
        SET_ADMIN_ROUTER: (state, payload) => {
            state.adminRouter = payload
        }
    },
    actions: {
        setLoaderName: ({commit, state}, payload) => {
            return commit('SET_LOADER_NAME', payload)
        },
        setAdminRouter: ({commit, state}, payload) => {
            return commit('SET_ADMIN_ROUTER', payload)
        }
    },
    getters: {
        loaderName: state => state.loaderName,
        adminRouter: state => state.adminRouter
    }
}
