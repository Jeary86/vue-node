<template>
    <div class="home">

        <Navber>
            <Jeary />
        </Navber>

        <div class="product">
            <div class="product_list" v-for="items in productList" :key="items.id">
                <li>
                    <h3 class="view-text">{{items.w_title}}</h3>
                    <div class="w_img_url" @click="onClickWorks(items)">
                        <img :src="items.w_img_url" />
                    </div>
                </li>

            </div>
        </div>
        
    </div>
</template>

<script>
    // @ is an alias to /src

    import Server from "../util/Server";
    import Navber from "./Navber";
    import Jeary from "./Jeary";

    export default {
        name: 'Home',
        components: {Jeary, Navber},
        data(){
            return{
                productList : []
            }
        },
        mounted(){
            this.getApiProduct();
        },
        methods :{
            getApiProduct(){
                Server.getCallApi("/worksList")
                    .then(res => {

                        if (res.data.code == 0){
                            this.productList = res.data.data.list;

                            console.log(this.productList)

                        }else {
                            alert(res.data)
                        }
                })
            },
            onClickWorks(e){

                if (e.w_link != null){
                    console.log(e.w_link)
                    window.location.href  = e.w_link
                }else {
                    this.$router.push({name:'HomeContent',params: {id:e.id}})
                }


            }
        }
    }
</script>
<style lang="less" scoped>

    .product{
        width:95%;position:relative;margin:0 auto;text-align: left;
        max-width:1280px;

        .view-text{
            width: 100%;display: inline-block;white-space: nowrap;overflow: hidden;text-overflow:ellipsis;
        }

        .product_list{
            width:50%;position:relative;display:inline-block;
            li{
                width:100%;position:relative;text-align: center;
                .w_img_url{
                    width:80%;position:relative;border: 5px solid #000;margin:0 auto;
                    img{
                        width:100%;display: block;
                    }
                }
            }
        }
    }

</style>
