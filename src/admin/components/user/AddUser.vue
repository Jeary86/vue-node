<template>
    <div class="add-user">
        <div class="add-container">
            <el-input v-model="username" placeholder="请输入账号" prefix-icon="el-icon-user-solid"></el-input>
            <br/>
            <br/>
            <el-input placeholder="请输入密码" v-model="password" prefix-icon="el-icon-s-tools" show-password></el-input>
            <br/>
            <br/>
            <el-button :loading="loading" style="width:100%" type="primary" @click.native.prevent="handleRevise">提交</el-button>
        </div>
    </div>
</template>

<script>
    import Server from "@/util/Server";
    export default {
        name: "AddUser",
        data(){
            return{
                username: '',
                password: '',
                loading: false,
            }
        },
        methods:{
            handleRevise(){
                this.loading = true
                let t = this;

                const data = {
                    user_name : t.username,
                    user_password : t.password
                }

                Server.callApi('/register',data)
                    .then(res =>{

                        if (res.code == 0){
                            t.$message({
                                showClose: true,
                                message: res.data,
                                type: 'success'
                            });
                            t.$router.push({ path:'/admin/userList' });
                        }else {
                            t.$message({
                                showClose: true,
                                message: res.data,
                                type: 'error'
                            });
                        }

                        t.loading = false

                    })
            },
        }
    }
</script>

<style lang="less" scoped>
    .add-user{
        width:100%;position:relative;
        .add-container{
            width:500px;position:relative;margin:0 auto;margin-top:100px;
        }
    }
</style>