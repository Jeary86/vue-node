<template>
    <div class="HomeContent">
        <div class="product" v-for="items in productList" :key="items.id">
            <h1>{{items.w_title}}</h1>
            <div v-html="items.w_content"></div>
        </div>
    </div>
</template>

<script>
    import Server from "../util/Server";

    export default {
        name: "HomeContent",
        data(){
            return{
                productList : [],
                worksId : this.$route.params.id,
            }
        },
        mounted(){
            this.getApiProduct();
        },
        methods :{
            getApiProduct(){
                Server.getCallApi("/worksDetails", {id: this.worksId})
                    .then(res =>{
                        this.productList = res.data.data
                        console.log(res.data.data)
                    })
            }
        }
    }
</script>

<style lang="less" scoped>

</style>