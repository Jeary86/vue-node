<template>

    <div class="navbar">
        <div class="hamburger-container" @click="toggleClick">
            <svg
                    :class="{'is-active':isActive}"
                    class="hamburger"
                    viewBox="0 0 1024 1024"
                    xmlns="http://www.w3.org/2000/svg"
                    width="64"
                    height="64"
            >
                <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z" />
            </svg>
        </div>

        <el-breadcrumb class="app-breadcrumb breadcrumb-container" separator="/">
            <transition-group name="breadcrumb">
                <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.path">
                    <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.meta.title }}</span>
                    <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
                </el-breadcrumb-item>
            </transition-group>
        </el-breadcrumb>

        <div class="right-menu">
            <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
                <div class="avatar-wrapper">
                    {{name}}
                    <i class="el-icon-caret-bottom" />
                </div>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="clearHandleLogin">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    // import { mapGetters } from 'vuex'
    import Server from "@/util/Server";
    import * as pathToRegexp from 'path-to-regexp'
    export default {
        name: 'Hamburger',
        props :{
            name : {
                type: String,
                default : '用户姓名'
            }
        },
        computed: {
            // ...mapGetters(['adminRouter'])
        },
        data(){
            return{
                isActive : true,
                levelList : null
            }
        },
        watch: {
            $route(route) {
                this.getBreadcrumb()
            }
        },
        mounted(){
          this.getBreadcrumb();
        },
        methods: {
            getBreadcrumb() {

                let matched = this.$route.matched.filter(item => item.meta && item.meta.title)

                console.log(matched,"1111")

                const first = matched[0]

                if (!this.isDashboard(first)) {
                    matched = [{ path: '/admin', meta: { title: '首页' }}].concat(matched)
                }

                this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)

            },
            isDashboard(route) {
                const name = route && route.name
                if (!name) {
                    return false
                }
                return name.trim().toLocaleLowerCase() === 'Admin'.toLocaleLowerCase()
            },
            pathCompile(path) {
                const { params } = this.$route
                var toPath = pathToRegexp.compile(path)
                return toPath(params)
            },
            handleLink(item) {
                let t = this;
                const { redirect, path} = item

                if (redirect) {
                    t.$router.push(redirect)
                    return
                }
                console.log(t.pathCompile(path))
                t.$router.push(t.pathCompile(path))
            },

            toggleClick() {
                this.isActive = !this.isActive
            },
            clearHandleLogin(){
                Server.getCallApi('/clearUser')
                    .then(res =>{
                        if (res.data.code == 0){
                            this.$router.push({ path:'/login' })
                        }
                    })
            },
        }
    }
</script>

<style lang="less" scoped>

    .navbar{
        height:50px;
        overflow:hidden;
        position:relative;
        background:#fff;
        box-shadow:0 1px 4px rgba(0, 21, 41, .08);
        margin-bottom:10px;
        padding:0 20px;

        .breadcrumb-container {
            float: left;
        }

        .app-breadcrumb.el-breadcrumb {
            display: inline-block;
            font-size: 14px;
            line-height: 50px;
            margin-left: 8px;

            .no-redirect {
                color: #97a8be;
                cursor: text;
            }
        }

        .hamburger-container {
            line-height: 46px;
            height: 100%;
            float: left;
            cursor: pointer;
            transition: background .3s;
            -webkit-tap-highlight-color:transparent;
            padding:0 15px;

            &:hover {
                background: rgba(0, 0, 0, .025)
            }
        }

        .hamburger {
            display: inline-block;
            vertical-align: middle;
            width: 20px;
            height: 20px;
        }

        .hamburger.is-active {
            transform: rotate(180deg);
        }

        .right-menu {
            float: right;
            height: 100%;
            line-height: 50px;

            &:focus {
                outline: none;
            }

            .right-menu-item {
                display: inline-block;
                padding: 0 8px;
                height: 100%;
                font-size: 18px;
                color: #5a5e66;
                vertical-align: text-bottom;

                &.hover-effect {
                    cursor: pointer;
                    transition: background .3s;

                    &:hover {
                        background: rgba(0, 0, 0, .025)
                    }
                }
            }

            .avatar-container {
                margin-right: 30px;

                .avatar-wrapper {
                    margin-top: 5px;
                    position: relative;

                    .user-avatar {
                        cursor: pointer;
                        width: 40px;
                        height: 40px;
                        border-radius: 10px;
                    }

                    .el-icon-caret-bottom {
                        cursor: pointer;
                        position: absolute;
                        right: -20px;
                        top: 25px;
                        font-size: 12px;
                    }
                }
            }
        }

    }




</style>