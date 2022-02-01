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

.lists-list {
    list-style: none;
    padding: 0;
    margin: 0 0 50px 0;
}

.lists-list__title {
    display: inline-block;
    margin-bottom: 10px;
    font-weight: normal;
    font-size: 18px;
    color: #BBB;
}

.lists-list__item {
    font-size: 17px;
    padding: 0 10px;
    cursor: pointer;
}

.lists-list__item:hover {
    border-left: 3px solid #8ACAFE;
    background: #F4FAFE;
}

.lists-list__input {
    position: relative;
    background: transparent;
    border: none;
    font-size: 17px;
    outline: none;
    margin: 0;
    padding: 10px 0;
    width: 100%;
    height: 100%;
}

.lists-list__input::placeholder {
    color: #DDD;
}

</style>
