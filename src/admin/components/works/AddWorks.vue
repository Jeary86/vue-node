<template>
    <div class="add-case">
        <WorksDetail :is-edit="false" />
    </div>
</template>

<script>
    import WorksDetail from "./WorksDetail";
    export default {
        name: "AddWorks",
        components: {WorksDetail},
    }
</script>

<style lang="less" scoped>
    .add-case{
        width:100%;
    }
</style>