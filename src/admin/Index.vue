<template>
    <div class="app-wrapper">
        <Sidebar/>
        <div class="main-container">
            <Navbar :name="this.userName" />
            <div class="view-container">
                <transition name="fade-transform" mode="out-in">
                    <router-view />
                </transition>
            </div>
        </div>
    </div>
</template>


<script>
    import Server from "../util/Server";
    import { Navbar ,Sidebar} from "./components/layout"
    import '@/css/admin.less'
    export default {
        name: "admin",
        components: {
            Navbar,
            Sidebar
        },
        data(){
            return{
                userName : ''
            }
        },
        mounted(){
            this.userInfoComplete();

            // console.log(this.$route)
        },
        methods:{
            userInfoComplete(){
                Server.getCallApi('/getUser')
                    .then(res =>{
                        if (res.data.code == 0){

                            this.userName = res.data.data.user_name

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

    .main-container {
        min-height: 100%;
        margin-left: 210px;
        position: relative;
        .view-container{
            width:100%;
            padding:0 40px;
        }
    }
}
</style>