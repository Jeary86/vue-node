<template>
    <div class="add-case">
        <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" label-width="100px">

            <el-form-item label="Title :" prop="title">
                <el-input v-model="postForm.title"></el-input>
            </el-form-item>

            <el-form-item prop="content" style="margin-bottom: 30px;">
                <Tinymce ref="editor" v-model="postForm.content" :height="400" />
                <!--<div class="tinymce-container" >-->
                    <!--<textarea v-model="postForm.content" id="tinydemo" class="tinymce-textarea" style="height: 300px;width:100%" />-->
                <!--</div>-->
            </el-form-item>

            <div class="button-box">
                <el-button v-loading="loading" style="margin-left: 10px;" type="success" @click="submitForm">
                    Publish
                </el-button>
            </div>

        </el-form>
    </div>
</template>

<script>
    import Tinymce from "../Tinymce/index";
    import load from '../Tinymce/dynamicLoadScript'
    const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'

    export default {
        name: "AddCase",
        components: {Tinymce},
        data(){
            const validateRequire = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error(rule.field + '为必传项'))
                    this.notify(rule.field + '为必传项')
                } else {
                    callback()
                }
            }
            return{
                loading:false,
                notifyPromise:Promise.resolve(),
                postForm:{
                    title: '',
                    content:''
                },
                rules: {
                    title: [{ validator: validateRequire }],
                    content: [{ validator: validateRequire }],
                },
            }
        },
        mounted() {
            // this.init()
        },
        activated() {
            // if (window.tinymce) {
            //     this.initTinymce()
            // }
        },
        methods:{
            init() {
                load(tinymceCDN, (err) => {
                    if (err) {
                        this.$message.error(err.message)
                        return
                    }
                    this.initTinymce();
                })
            },
            initTinymce(){
                window.tinymce.init({
                    selector: '#tinydemo',
                    language:'zh_CN',
                    plugins: 'image',
                    toolbar: 'image',
                    images_upload_url: 'http://127.0.0.1:3000/api/upload',
                    images_upload_base_path: 'http://',
                });
            },
            submitForm(){
                this.$refs.postForm.validate(valid => {
                    if (valid) {
                        // console.log(this.postForm.content)
                    }else {
                        // this.notify('error submit!!')
                    }
                    console.log(this.postForm.content)
                })
            },
            notify(msg){
                this.notifyPromise = this.notifyPromise.then(this.$nextTick).then(()=>{
                    this.$message({
                        message: msg,
                        type: 'error'
                    });
                })
            }
        }
    }
</script>

<style lang="less" scoped>
    .add-case{
        width:80%;text-align:left;padding-top:60px;
        .button-box{
            text-align:right;
        }
    }
</style>