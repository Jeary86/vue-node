<template>
    <div class="userRevise">
        <h1>修改用户名密码</h1>
        <el-input v-model="loginForm.username" placeholder="请输入账号" prefix-icon="el-icon-user-solid"></el-input>
        <br/>
        <br/>
        <el-input placeholder="请输入密码" v-model="loginForm.password" prefix-icon="el-icon-s-tools"></el-input>
        <br/>
        <br/>
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="onReviseHander">确认修改</el-button>
    </div>
</template>

<script>
    import Server from "../util/Server";
    export default {
        name: "userRevise",
        data(){
            return{
                loginForm: {
                    username: '',
                    password: ''
                },
                loading: false,
                userId : this.$route.query.id
            }
        },
        mounted(){
            console.log(this.userId)
        },
        methods:{
            onReviseHander () {

                const data = {
                    user_id : this.userId,
                    user_name : this.loginForm.username,
                    user_password: this.loginForm.password
                }

                Server.callApi('/updateUser',data)
                    .then(res =>{
                        console.log(res)

                        if (res.code == 0){
                            this.$router.go(-1);
                        }
                    })
            }
        }
    }
</script>

<style lang="less" scoped>
    .userRevise{
        width:500px;position:relative;margin:0 auto;
    }
</style>