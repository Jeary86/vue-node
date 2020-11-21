<template>
    <div class="home">
        <div id="nav">
            <router-link to="/">前端</router-link> |
            <router-link to="/admin">后端</router-link>
        </div>

        <img alt="Vue logo" src="../assets/logo.png">
        <div class="product" v-for="items in productList" :key="items.product_id">
            <h1>{{items.w_title}}</h1>
            <div v-html="items.w_content"></div>
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
                Server.getCallApi("/worksList")
                    .then(res => {

                        if (res.data.code == 0){
                            this.productList = res.data.data.list;

                            console.log(this.productList)

                        }else {
                            alert(res.data)
                        }
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    #nav {
        padding: 30px;
        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>
