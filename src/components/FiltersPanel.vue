<template>

    <section class="app__filters">
        <StatusList></StatusList>
        <TagsList></TagsList>
    </section>

</template>

<script>

    import StatusList from "./StatusList.vue";
    import TagsList from "./TagsList.vue";

    export default {
        name: "FiltersPanel",
        components: {
            StatusList,
            TagsList
        }
    }

</script>

<style scoped>

.app__filters {
    padding: 50px 15px;
    border-right: 1px solid #EEE;
}

</style>
