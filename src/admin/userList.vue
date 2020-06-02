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
                <el-button type="primary" icon="el-icon-edit-outline" @click.native.prevent="onHanderReviseUser(scope.row.user_id)"></el-button>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
    import Server from "../util/Server";
    export default {
        name: "userList",
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
            },
            onHanderReviseUser(e){
                this.$router.push({ path:'/admin/userRevise',query:{id:e}})
            }
        }
    }
</script>

<style lang="less" scoped>
    .el-button{
        font-size:16px;
        padding:8px 18px;
    }
</style>