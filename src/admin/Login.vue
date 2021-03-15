<template>
    <div class="login">
        <div class="login-container">
            <h1>登录</h1>

            <transition name="fade" mode="out-in">
                <div>
                    <el-input v-model="loginForm.username" placeholder="请输入账号" prefix-icon="el-icon-user-solid"></el-input>
                    <br/>
                    <br/>
                    <el-input placeholder="请输入密码" v-model="loginForm.password" prefix-icon="el-icon-s-tools" show-password></el-input>
                    <br/>
                    <br/>
                    <el-button :loading="loading" style="width:100%" type="primary" @click.native.prevent="handleLogin">Login</el-button>
                    <br/>
                    <br/>
                    <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="userInfoComplete">获取session</el-button>
                    <br/>
                    <el-button type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="clearHandleCookie">清除session</el-button>
                </div>
            </transition>

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
                    username: 'admin',
                    password: 'admin'
                },
                loading: false,
                loading1: false,
                isShow : true,
            }
        },
        mounted(){

            this.userInfoComplete();

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

                        console.log(res)

                        if (res.code == 0){
                            t.$message({
                                showClose: true,
                                message: '登录成功！',
                                type: 'success'
                            });
                            t.$router.push({ path:'/admin' })
                        }else {
                            t.$message({
                                showClose: true,
                                message: res.data,
                                type: 'error'
                            });
                        }

                        this.loading = false

                    })
            },
            setHandleCookie(){
                Server.getCallApi('/setUser')
                    .then(res =>{
                        this.$message({
                            showClose: true,
                            message: '获取session成功',
                            type: 'success'
                        });
                    })
            },
            userInfoComplete(){
                let t = this;
                Server.getCallApi('/userInfo')
                    .then(res =>{

                        let r = res.data;
                        
                        if (r.code == 0){
                            t.$router.push({ path:'/admin' });

                            t.$message({
                                showClose: true,
                                message: '登录成功',
                                type: 'success'
                            });

                        }else {
                            console.log(r)
                        }
                    })
            },
            clearHandleCookie(){
                Server.getCallApi('/clearUser')
                    .then(res =>{
                        console.log(res.data)
                        this.$message({
                            showClose: true,
                            message: res.data.data,
                            type: 'error'
                        });
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