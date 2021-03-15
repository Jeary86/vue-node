<template>
    <div class="app-wrapper" :class="classObj">
        <Sidebar v-if="isUserInfo" class="sidebar-container" />
        <div class="main-container">
            <Navbar v-if="isUserInfo" :name="this.userName" />
            <div class="view-container">
                <transition name="fade-transform" mode="out-in">
                    <router-view />
                </transition>
            </div>
        </div>
    </div>
</template>


<script>
    import { mapGetters } from 'vuex';
    import Server from "../util/Server";
    import { Navbar ,Sidebar} from "./components/layout"
    import '@/css/admin.less'
    export default {
        name: "admin",
        components: {
            Navbar,
            Sidebar
        },
        computed :{
            ...mapGetters(['sidebar','userInfo','adminRouter']),
            classObj() {
                return {
                    hideSidebar: !this.sidebar,
                    openSidebar: this.sidebar,
                }
            }
        },
        data(){
            return{
                userName : '',
                isUserInfo : false,
                dataJson : []
            }
        },
        mounted(){
            this.userInfoComplete();

            // console.log(this.userInfo + "获取用户信息")

        },
        methods:{
            userInfoComplete(){
                let t = this;

                Server.getCallApi('/userInfo')
                    .then(res =>{
                        // console.log(res)
                        if (res.data.code == 0){
                            t.$store.dispatch('setUserInfo',res.data.data)
                            t.userName = t.userInfo.user_name
                            t.isUserInfo = true

                            console.log(t.userName + "获取用户信息")
                        }else {
                            this.$router.push({ path:'/login' })
                        }
                    })
            }
        }

    }
</script>

<style lang="less" scoped>

.app-wrapper{
    width:100%;
    height:100%;

    .main-container{
        min-height:100%;
        transition:margin-left .28s;
        margin-left:210px;
        position:relative;

        .view-container{
            width:100%;
            padding:0 40px;
        }
    }
    .sidebar-container{
        transition:width 0.28s;
        width:210px;
        background-color:#304156;
        height:100%;
        position:fixed;
        font-size:0px;
        top:0;
        bottom:0;
        left:0;
        z-index:1001;
        overflow:hidden;
        text-align:left;
    }
}

.hideSidebar{
    .main-container{
        margin-left:54px;
    }
    .sidebar-container{
        width:54px !important;
    }
}


</style>
