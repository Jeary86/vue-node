<template>
    <div id="nav">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "Navber"
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