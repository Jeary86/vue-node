<template>
    <div class="edit-works">
        <WorksDetail :is-edit="true" />
    </div>
</template>

<script>
    import WorksDetail from "./WorksDetail";
    export default {
        name: "EditWorks",
        components: {WorksDetail},
        mounted() {

        },
        methods: {

        }
    }
</script>

<style lang="less" scoped>
    .edit-works{
        width:100%;
    }
</style>