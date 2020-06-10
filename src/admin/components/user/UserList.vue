<template>
    <div class="user-list">
        <el-table
                :data="tableData"
                style="width: 100%">
            <el-table-column
                    type="index"
                    label="id"
            >
            </el-table-column>
            <el-table-column
                    prop="user_name"
                    label="账号">
            </el-table-column>
            <el-table-column
                    label="操作"
                    align="right"
            >
                <template slot-scope="scope">
                    <!--<el-button type="primary" icon="el-icon-edit-outline" ></el-button>-->
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native.prevent="onHanderReviseUser(scope.row.user_id)">
                        Edit
                    </el-button>

                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native.prevent="onHanderDelUser(scope.row.user_id)">
                        Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>

</template>

<script>
    import Server from "@/util/Server";
    export default {
        name: "userList",
        data(){
            return{
                loading: false,
                tableData :[]
            }
        },
        mounted(){
            this.userInfoComplete();
        },
        methods:{
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
                        this.$message({
                            showClose: true,
                            message: res.data,
                            type: 'success'
                        });
                        this.userInfoComplete();
                    })
            },
            onHanderReviseUser(e){
                this.$router.push({ path:'/admin/user/userRevise/'+e})
            }
        }
    }
</script>

<style lang="less" scoped>
    .user-list{
        width:100%;
    }
    .el-button{
        font-size:12px;
        padding:8px 18px;
    }
</style>