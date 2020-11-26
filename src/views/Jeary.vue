<template>
    <div>
        <router-link to="/">前端</router-link> |
        <router-link to="/admin">后端</router-link>
    </div>
</template>

<script>
    export default {
        name: "Jeary"
    }
</script>

<style lang="less" scoped>
    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
</style>