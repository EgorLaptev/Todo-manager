<template>

    <h4 class="lists-list__title">Lists</h4>
    <ul class="lists-list">
        <li class="lists-list__item" v-for="list of this.$store.state.lists" @click="setFilterList(list.id)" :class="{activeTag: isListActivated(list.id)}">
            <input type="text" v-model="list.name" class="lists-list__input" placeholder="Enter the title" disabled>
        </li>
    </ul>

</template>

<script>
    export default {
        name: "StatusList",
        methods: {
            isListActivated(id) {
                return this.$store.state.filters.list === id;
            },
            setFilterList(id) {
                this.$store.state.filters.list = id;
            }
        },
    }
</script>

<style scoped>

</style>
