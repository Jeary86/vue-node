<template>

    <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                background-color="#304156"
                text-color="#bfcbd9"
                active-text-color="#1890ff"
                :unique-opened="false"
                :collapse-transition="false"
                mode="vertical"
        >
        <SidebarItem v-for="route in dataJson" :key="route.path" :item="route" :base-path="route.path" />
        </el-menu>
    </el-scrollbar>

</template>

<script>
    import { mapGetters } from 'vuex';
    import SidebarItem from "./SidebarItem";
    export default {
        name: "Sidebar",
        components: {SidebarItem},
        computed: {
            ...mapGetters(['adminRouter','loaderName','sidebar','userInfo']),
            activeMenu() {
                const route = this.$route
                const { meta, path } = route
                // if set path, the sidebar will highlight the path you set
                if (meta.activeMenu) {
                    return meta.activeMenu
                }
                return path
            },
            isCollapse() {
                return !this.sidebar
            }
        },
        data(){
            return{
                dataJson : [],
                userRole : 0
            }
        },
        mounted(){

            this.userRole = this.userInfo.user_role

            this.userSidebar()
        },
        methods:{
            userSidebar (){

                let routeJson = this.adminRouter[0].children;
                let int = routeJson.length -2;


                routeJson.forEach((item,index) =>{

                    if (index < int) {
                        this.dataJson.push(item)
                    }

                    if (this.userRole == item.role){
                        this.dataJson.push(item)
                    }

                })

            },
        }
    }
</script>

<style lang="less" scoped>

    .el-scrollbar__bar.is-vertical {
        right: 0px;
    }

    .el-scrollbar {
        height: 100%;
    }

    &.has-logo {
        .el-scrollbar {
            height: calc(100% - 50px);
        }
    }

    .is-horizontal {
        display: none;
    }

    a {
        display: inline-block;
        width: 100%;
        overflow: hidden;
    }

    .svg-icon {
        margin-right: 16px;
    }

    .el-menu {
        border: none;
        height: 100%;
        width: 100% !important;
    }

</style>
