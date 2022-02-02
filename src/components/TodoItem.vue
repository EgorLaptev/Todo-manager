<template>

    <li class="todo-item">

        <Checkbox @focus="openTodo(todo.id)" v-model="todo.completed" class="todo-item__completed"></Checkbox>

        <input type="text" class="todo-item__input" v-model="todo.title" @focus="openTodo(todo.id)" maxlength="30" placeholder="Enter the title">

        <TodoTags :todo="todo" class="todo-item__tags"></TodoTags>

        <TodoOptions :show="this.showActions"></TodoOptions>

    </li>

</template>

<script>

    import TodoTags from "./TodoTags.vue";
    import TodoOptions from "./TodoOptions.vue";
    import { Checkbox } from 'ant-design-vue';

    import 'ant-design-vue/dist/antd.css';

    export default {
        name: "TodoItem",
        data() {
            return {
                showActions: false
            }
        },
        props: {
            todo: Object
        },
        methods: {
            toggleOptions(e) { this.showActions = !this.showActions },
            openTodo(id) { this.$store.commit('setOpenedTodo', this.todo) }
        },
        provide() {
            return {
                todoId: this.todo.id
            }
        },
        components: {
            TodoTags,
            TodoOptions,
            Checkbox
        }
    }
</script>

<style scoped>

.todo-item {
    position: relative;
    padding: 0 20px;
    border-left: 3px solid #8ACAFE;
    background: #F4FAFE;
    display: flex;
    flex-direction: row;
    align-items: center;
}


.todo-item__input {
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

.todo-item__input::placeholder {
    color: #DDD;
}

.todo-item__completed {
    margin-right: 20px;
}

@media screen and (max-width: 1268px){

    .todo-item__tags {
        display: none;
    }

}

@media screen and (max-width: 481px){
    .todo-item {
        border-left-width: 3px;
        padding: 5px 20px;
    }
    .todo-item__completed {
        min-height: 15px;
        min-width: 15px;
    }
}

</style>
