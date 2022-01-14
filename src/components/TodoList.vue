<template>

    <ul class="todos-list">
        <todo-item v-for="todo of todos" :todo="todo"></todo-item>
    </ul>

</template>

<script>

    import TodoItem from "./TodoItem.vue";

    export default {
        name: "TodoList",
        props: ['todos'],
        inject: ['filters'],
        components: {
            TodoItem
        }
    }

</script>

<style scoped>

    .todos-list {
        width: 90%;
        margin: 0;
        padding: 30px 0 0 0;
        list-style: none;
    }

</style>