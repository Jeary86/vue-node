<template>
    <div class="sidebar-item" v-if="!item.hidden">
        <!--<el-submenu v-for="(item,index) in item" :key="index" :index="item.path">-->

            <!--<template slot="title">-->
                <!--<span> {{item.name}}</span>-->
            <!--</template>-->

            <!--&lt;!&ndash;<el-menu-item v-for="(child,n) in item.children" :key="n" class="nest-menu" :index="child.path">&ndash;&gt;-->
                <!--&lt;!&ndash;{{child.meta.title}}&ndash;&gt;-->
            <!--&lt;!&ndash;</el-menu-item>&ndash;&gt;-->

        <!--</el-submenu>-->


        <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">

            <router-link :to="resolvePath(onlyOneChild.path)">
                <el-menu-item :index="resolvePath(onlyOneChild.path)">
                    <span @click="onClickAAA(resolvePath(onlyOneChild.path))"> {{onlyOneChild.meta.title}} </span>
                </el-menu-item>
            </router-link>

        </template>

        <el-submenu v-else :index="resolvePath(item.path)" popper-append-to-body>
            <template slot="title">
                <span> {{item.name}} </span>
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
                if (isExternal(this.basePath)) {
                    return this.basePath
                }
                return path.resolve(t.basePath, routePath)
            },
            onClickAAA(link){
                console.log(link)
            }
        }
    }
</script>

<style lang="less" scoped>

</style>