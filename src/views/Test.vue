<template>
    <div class="test-list">
        <ul v-for="(item,index) in worksList">
            <li>
                <h3 class="view-text">{{item.id}} . {{item.w_title}}</h3>
            </li>
        </ul>
        <pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" :pageSizes.sync="listQuery.pageSizes" @pagination="worksListComplete" />
    </div>
</template>

<script>
    import Server from "../util/Server";
    import Pagination from "../admin/components/Pagination/index";
    export default {
        name: "test",
        components: {Pagination},
        data() {
            return {
                worksList: null,
                listLoading: true,
                total: 0,
                listQuery: {
                    page: 1,
                    limit: 6,
                    pageSizes : [6,8,10,20]
                },
            }
        },
        created(){
            this.worksListComplete();
        },
        methods : {
            worksListComplete(){
                Server.getCallApi('/worksList',this.listQuery)
                    .then(res =>{
                        if (res.data.code == 0){
                            this.worksList = res.data.data.rows;
                            this.total = res.data.data.count;
                            this.listLoading = false
                        }
                    })
            }
        }
    }
</script>

<style lang="less" scoped>
.test-list{
    width:80%;background:#00b7ff;margin-left:10%;

    li{
        width:100%;position:relative;text-align: center;

    }

}
</style>