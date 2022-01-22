<template>

    <section class="app__todo todo" :class="this.openedTodo ? 'app__todo_opened' : ''" id="appTodo" v-if="todo">

        <button class="todo__close" @click="closeTodo">
            <i class="fas fa-times"></i>
        </button>

        <h3 class="todo__title">
            <textarea v-model.trim="todo.title" class="todo__title-input" placeholder="Title" cols="1" maxlength="30"></textarea>
        </h3>

        <p class="todo__content">
            <textarea v-model="todo.description" class="todo__content-input" placeholder="Description"></textarea>
        </p>

        <TodoTags :todo="todo"></TodoTags>

    </section>

</template>

<script>

    import TodoTags from "./TodoTags.vue";

    export default {
        name: "EditTodo",
        props: ['todo'],
        inject: ['openedTodo'],
        methods: {
            closeTodo() {
                this.$emit('closeTodo');
            }
        },
        components: {
            TodoTags
        }
    }

</script>

<style scoped>


    .app__todo {
        position: relative;
        padding: 25px 50px 10px 25px;
    }

    .todo__title-input {
        width: 100%;
        border: none;
        background: transparent;
        font-size: 24px;
        outline: none;
        margin-bottom: 15px;
        resize: none;
    }

    .todo__close {
        position: absolute;
        top: 25px;
        right: 25px;
        border: none;
        background: transparent;
        font-size: 18px;
        color: #333333
    }

    .todo__content-input {
        padding: 50px 25px;
        position: absolute;
        inset: 0;
        top: 10%;
        width: 100%;
        margin-top: 50px;
        border: none;
        font-size: 18px;
        outline: none;
        resize: none;
        background: transparent;
    }

    .todo__title-input::placeholder,
    .todo__content-input::placeholder {
        color: #CECECE;
    }

</style>
