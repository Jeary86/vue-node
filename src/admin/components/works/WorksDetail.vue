<template>
    <div class="works-detail">
        <el-form ref="postForm" :model="postForm" :rules="rules" class="form-container" label-width="100px">

            <el-form-item label="Title :" prop="title">
                <el-input v-model="postForm.title"></el-input>
            </el-form-item>

            <el-form-item prop="displayTime" label="Publish Time:" class="postInfo-container-item">
                <el-date-picker v-model="postForm.displayTime" type="date" value-format="yyyy-MM-dd" placeholder="Select date" />
            </el-form-item>

            <el-form-item prop="content" style="margin-bottom: 30px;">
                <Tinymce ref="editor" v-model="postForm.content" :height="400" />
            </el-form-item>


            <el-form-item prop="image_url" style="margin-bottom: 30px;">
                <Upload v-model="postForm.image_url" />
            </el-form-item>

            <div class="button-box" v-if="!isEdit">
                <el-button v-loading="loading" type="success" @click="submitForm">
                    Publish
                </el-button>
            </div>

            <div class="button-box" v-if="isEdit">
                <el-button v-loading="loading" type="warning" @click="draftForm">
                    Draft
                </el-button>
            </div>

        </el-form>
    </div>
</template>

<script>
    import Server from "@/util/Server";
    import Tinymce from "../Tinymce/index";
    import load from '../Tinymce/dynamicLoadScript'
    import Upload from "../Upload/SingleImage";
    const tinymceCDN = 'https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js'
    export default {
        name: "WorksDetail",
        components: {Upload, Tinymce},
        props: {
            isEdit: {
                type: Boolean,
                default: false
            }
        },
        data(){
            const validateRequire = (rule, value, callback) => {
                if (value === '' || value === null) {
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
                    content:'',
                    image_url:'',
                    displayTime:''
                },
                rules: {
                    title: [{ validator: validateRequire }],
                    content: [{ validator: validateRequire }],
                    displayTime:[{ validator: validateRequire ,trigger: 'blur' }],
                    image_url: [{ validator: validateRequire, trigger: 'blur' }]
                },
                tempRoute: {},
                userId : ''
            }
        },
        computed: {

        },
        mounted() {
            this.init()
        },
        activated() {

        },
        created() {
            if (this.isEdit) {
                this.userId = this.$route.params && this.$route.params.id
                this.worksDetailsComplete(this.userId)
            }
            this.tempRoute = Object.assign({}, this.$route)
        },
        methods:{
            worksDetailsComplete(id) {
                Server.getCallApi("/worksDetails", {id: id})
                    .then(res => {

                        if (res.data.code == 0) {
                            this.postForm = {
                                title: res.data.data[0].w_title,
                                content: res.data.data[0].w_content,
                                image_url:res.data.data[0].w_img_url,
                                displayTime:res.data.data[0].displayTime
                            }

                        } else {
                            alert(res.data)
                        }
                    })
            },
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

                let t = this;

                this.$refs.postForm.validate(valid => {

                    let data = {
                        w_title : t.postForm.title,
                        w_content : t.postForm.content,
                        w_img_url : t.postForm.image_url,
                        displayTime: t.postForm.displayTime,
                    }

                    if (valid) {
                        Server.callApi('/uploadWorks',data)
                            .then(res =>{
                                if (res.code == 0){
                                    t.$message({
                                        showClose: true,
                                        message: '提交成功！',
                                        type: 'success'
                                    });
                                    t.$router.push({ path:'/admin/works/works-list' });
                                }else {
                                    this.notify('error submit!!')
                                }
                            })
                    }
                })
            },
            draftForm(){
                let t = this;
                this.$refs.postForm.validate(valid => {

                    let data = {
                        id : t.userId,
                        w_title : t.postForm.title,
                        w_content : t.postForm.content,
                        w_img_url : t.postForm.image_url,
                        displayTime: t.postForm.displayTime,
                    };
                    if (valid) {
                        Server.callApi('/worksDetailsSave',data)
                            .then(res =>{
                                if (res.code == 0){
                                    t.$message({
                                        showClose: true,
                                        message: '提交成功！',
                                        type: 'success'
                                    });
                                    t.$router.push({ path:'/admin/works/works-list' });
                                }else {
                                    this.notify('error submit!!')
                                }
                            })
                    }
                    // console.log(data)
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
    .works-detail{
        width:80%;text-align:left;padding-top:60px;
        .button-box{
            text-align:right;
        }
    }
</style>