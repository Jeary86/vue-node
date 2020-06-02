<template>
    <div class="login">
        <div class="login-container">
            <h1>登录</h1>
            <el-input v-model="loginForm.username" placeholder="请输入账号" prefix-icon="el-icon-user-solid"></el-input>
            <br/>
            <br/>
            <el-input placeholder="请输入密码" v-model="loginForm.password" prefix-icon="el-icon-s-tools" show-password></el-input>
            <br/>
            <br/>
            <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>
            <br/>
            <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="setHandleCookie">设置cookie</el-button>
            <br/>
            <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="getHandleCookie">获取cookie</el-button>
            <br/>
            <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="clearHandleCookie">清除cookie</el-button>
        </div>

    </div>
</template>

<script>
    import Server from "../util/Server";

    export default {
        name: "Login",
        data(){
            return{
                loginForm: {
                    username: '',
                    password: ''
                },
                loading: false,
            }
        },
        mounted(){

            this.getHandleCookie();

        },
        methods:{
            handleLogin(){
                this.loading = true
                let t = this;

                const data = {
                    user_name : t.loginForm.username,
                    user_password : t.loginForm.password
                }

                Server.callApi('/login',data)
                    .then(res =>{

                        if (res.code == 0){
                            t.$router.push({ path:'/admin' })
                        }else {
                            alert(res.data)
                        }

                        this.loading = false

                        console.log(res.data)

                    })
            },
            setHandleCookie(){
                Server.getCallApi('/setUser')
                    .then(res =>{
                        console.log(res.data)
                    })
            },
            getHandleCookie(){
                let t = this;
                Server.getCallApi('/getUser')
                    .then(res =>{

                        let r = res.data;
                        
                        if (r.code == 0){
                            t.$router.push({ path:'/admin' })
                        }

                        console.log(r);

                    })
            },
            clearHandleCookie(){
                Server.getCallApi('/clearUser')
                    .then(res =>{
                        console.log(res.data)
                    })
            }
        }
    }
</script>

<style lang="less" scoped>
    .login{
        width:100%;height:100%;position:absolute;background:#2d3a4b;

        .login-container{
            width:500px;position:relative;margin:0 auto;top:200px;color:#FFF;
        }
    }
</style>