<template>
    <div>
        <h1>后台登录成功</h1>
        <h2>{{userName}}</h2>
        <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="clearHandleLogin">退出登录</el-button>
        <br/>
        <router-view/>
    </div>
</template>


<script>
    import Server from "../util/Server";
    export default {
        name: "admin",
        data(){
            return{
                userName : ''
            }
        },
        mounted(){
            // this.userInfoComplete();

            this.userName = this.getCookie('user_name');
        },
        methods:{
            clearHandleLogin(){
                Server.getCallApi('/clearUser')
                    .then(res =>{
                        if (res.data.code == 0){
                            this.$router.push({ path:'/login' })
                        }
                    })
            },
            userInfoComplete(){
                Server.getCallApi('/userInfo')
                    .then(res =>{
                        if (res.data.code == 0){

                            console.log(res)
                            // this.userName = res.data.data;
                        }
                    })
            },
            getCookie(name){
                var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
                if(arr != null) {
                    // console.log(arr);
                    return unescape(arr[2]);
                }
                return null;
            }
        }

    }
</script>