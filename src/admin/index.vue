<template>
    <div>
        <h1>后台登录成功</h1>
        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="clearHandleLogin">退出登录</el-button>
        <br/>
        <template>
            <el-table
                    :data="tableData"
                    style="width: 100%">
                <el-table-column
                        prop="user_id"
                        label="id"
                        >
                </el-table-column>
                <el-table-column
                        prop="user_name"
                        label="账号">
                </el-table-column>
                <el-table-column
                        label="操作"
                >
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-delete" @click.native.prevent="onHanderDelUser(scope.row.user_id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>
        <router-view/>
    </div>
</template>


<script>
    import Server from "../util/Server";
    export default {
        name: "admin",
        data(){
            return{
                loading: false,
                tableData :[]
            }
        },
        mounted(){
            this.getHandleCookie();
            this.userInfoComplete();
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
            getHandleCookie(){
                let t = this;
                Server.getCallApi('/getUser')
                    .then(res =>{

                        let r = res.data;

                        if (r.code != 0){
                            t.$router.push({ path:'/login' })
                        }

                        console.log(r);

                    })
            },
            userInfoComplete(){
                Server.getCallApi('/userInfo')
                    .then(res =>{
                        if (res.data.code == 0){
                            this.tableData = res.data.data;
                        }
                    })
            },
            onHanderDelUser(e){
                console.log(e)

                const data = {
                    user_id : e
                }

                Server.callApi('/delUser',data)
                    .then(res =>{
                        console.log(res.data)
                        this.userInfoComplete();
                    })
            }
        }

    }
</script>