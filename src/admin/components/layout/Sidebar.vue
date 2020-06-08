<template>
    <div class="sidebar">
        <el-scrollbar>
            <el-menu
                    mode="vertical"
                    :default-active="activeMenu"
                    background-color="#304156"
                    text-color="#fff"
                    active-text-color="#1890ff"
            >
            <SidebarItem v-for="route in adminRouter" :key="route.path" :item="route" :base-path="route.path" />

            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import SidebarItem from "./SidebarItem";
    export default {
        name: "Sidebar",
        components: {SidebarItem},
        data(){
            return{
                dataJson : null
            }
        },
        computed: {
            ...mapGetters(['adminRouter']),
            activeMenu() {
                const route = this.$route
                const { meta, path } = route
                // if set path, the sidebar will highlight the path you set
                if (meta.activeMenu) {
                    return meta.activeMenu
                }
                return path
            },
        },
        mounted(){
            // this.dataJson.push(this.adminRouter[0])

            this.dataJson = this.adminRouter[0].children


        },
        methods:{

        }
    }
</script>

<style lang="less" scoped>
.sidebar{
    width:210px;
    background-color: #304156;
    height: 100%;
    position: fixed;
    font-size: 0px;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    overflow: hidden;
    text-align:left;

    .el-menu {
        border: none;
        height: 100%;
        width: 100% !important;
    }

    a {
        font-weight: bold;
        color: #2c3e50;

        &.router-link-exact-active {
            color: #42b983;
        }
    }
}
</style>
