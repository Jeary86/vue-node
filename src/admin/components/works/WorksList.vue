<template>
    <div class="case-list">
        <el-table v-loading="listLoading" :data="worksList" border fit highlight-current-row style="width: 100%">
            <el-table-column align="center" label="ID" width="100">
                <template slot-scope="scope">
                    <span>{{ scope.$index + ((listQuery.page-1) * listQuery.limit) + 1 }}</span>
                </template>
            </el-table-column>

            <el-table-column min-width="130px" align="center" label="Date">
                <template slot-scope="scope">
                    <span>{{ scope.row.displayTime }}</span>
                </template>
            </el-table-column>

            <el-table-column min-width="160px" align="center" label="Images">
                <template slot-scope="scope">
                    <span><img :src="scope.row.w_img_url" width="100" /> </span>
                </template>
            </el-table-column>

            <el-table-column min-width="300px" label="Title">
                <template slot-scope="{row}">
                    <div class="type-content" v-html="row.w_title"></div>
                </template>
            </el-table-column>

            <el-table-column align="center" label="Actions" width="300px">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" icon="el-icon-edit" @click.native.prevent="onHanderEditWorks(scope.row.id)">
                        Edit
                    </el-button>

                    <el-button type="danger" size="small" icon="el-icon-delete" @click.native.prevent="onHanderDelWorks(scope.row.id)">
                        Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>

        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="worksListComplete" />
    </div>
</template>

<script>
    import Server from "@/util/Server";
    import Pagination from "../Pagination/index";
    export default {
        name: "CaseList",
        components: {Pagination},
        data() {
            return {
                worksList: null,
                listLoading: true,
                total: 0,
                listQuery: {
                    page: 1,
                    limit: 20
                },
            }
        },
        created(){
            this.worksListComplete();
        },
        methods:{
            worksListComplete(){
                Server.getCallApi('/worksList',this.listQuery)
                    .then(res =>{

                      console.log(res)
                        if (res.data.code == 0){
                            this.worksList = res.data.data.rows;
                            this.total = res.data.data.count;
                            this.listLoading = false
                        }
                    })
            },
            onHanderDelWorks(id){
                console.log(id)

                Server.callApi('/delWorks',{id:id})
                    .then(res =>{

                        if (res.code == 0){
                            this.$message({
                                showClose: true,
                                message: res.data,
                                type: 'success'
                            });
                            console.log(res)
                            this.worksListComplete();
                        }
                    })
            },
            onHanderEditWorks(id){
                this.$router.push({ path:'/admin/works/edit-works/'+id})
            }
        }
    }
</script>

<style lang="less" scoped>
    .type-content{
        color: #337ab7;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>
