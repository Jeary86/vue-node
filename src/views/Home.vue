<template>
    <div class="home">
        <div id="nav">
            <router-link to="/">前端</router-link> |
            <router-link to="/login">后端</router-link>
        </div>

        <img alt="Vue logo" src="../assets/logo.png">
        <div class="product" v-for="items in productList.data" :key="items.product_id">
            <h1>名称:{{items.product_name}}</h1>
            <h2>价格:{{items.product_price}}</h2>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src

    import Server from "../util/Server";

    export default {
        name: 'Home',
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
                Server.getCallApi("/product")
                    .then(res => {

                        if (res.data.code == 0){
                            this.productList = res.data;

                        }else {
                            alert(res.data)
                        }
                })
            }
        }
    }
</script>
