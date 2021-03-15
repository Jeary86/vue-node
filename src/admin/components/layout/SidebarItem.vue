<template>
    <div class="sidebar-item" v-if="!item.hidden">
        <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">

            <router-link v-if="onlyOneChild.meta" :to="routeLink(onlyOneChild.path)">
                <el-menu-item :index="routeLink(onlyOneChild.path)">
                    <i class="svg-icon" :class="onlyOneChild.meta.icon"></i>
                    <span class="item-title" slot='title'> {{onlyOneChild.meta.title}} </span>
                </el-menu-item>
            </router-link>

        </template>

        <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
            <template slot="title">
                <i class="svg-icon" :class="item.meta.icon"></i>
                <span class="item-title"> {{item.name}} </span>
            </template>

            <sidebar-item
              v-for="child in item.children"
              :key="child.path"
              :is-nest="true"
              :item="child"
              :base-path="resolvePath(child.path)"
              class="nest-menu"
            />

        </el-submenu>
    </div>
</template>

<script>
    import path from 'path'
    import { mapGetters } from 'vuex';
    import { isExternal } from '@/util/validate'
    export default {
        name: "SidebarItem",
        components: {},
        props: {
            // route object
            item: {
                type: Object,
                required: true
            },
            isNest: {
                type: Boolean,
                default: false
            },
            basePath: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                onlyOneChild : null
            }
        },
        computed :{
            ...mapGetters(['userInfo']),
        },
        mounted(){

        },
        methods:{
            hasOneShowingChild(children = [], parent) {
                const showingChildren = children.filter(item => {
                    if (item.hidden) {
                        return false
                    } else {
                        // Temp set(当只有一个子节点显示时使用)
                        this.onlyOneChild = item
                        return true
                    }
                })

                // 当只有一个子路由器时，默认情况下显示子路由器
                if (showingChildren.length === 1) {
                    return true
                }

                // 如果没有子路由器显示，显示父路由器
                if (showingChildren.length === 0) {
                    this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
                    return true
                }

                return false
            },
            resolvePath(routePath) {
                let t = this;
                if (isExternal(routePath)) {
                    return routePath
                }
                if (isExternal(t.basePath)) {
                    return t.basePath
                }

                let routeLink = path.resolve(t.basePath,routePath)
                
                if (routeLink == '/userRevise/:id(\\d+)'){

                    // console.log(this.userInfo.user_id)

                    routeLink = '/userRevise/'+ this.userInfo.user_id
                }
                
                return routeLink
            },
            onClickAAA(link){
                // console.log(link)
            },
            routeLink(path){
                return '/admin' + this.resolvePath(path)
            }
        }
    }
</script>

<style lang="less" scoped>
    .sidebar-item{
        .svg-icon {
            margin-right: 16px;
        }
    }

</style>