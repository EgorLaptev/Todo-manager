<template>

    <li class="todo-item">

        <input type="checkbox" @focus="openTodo(todo.id)" v-model="todo.completed" class="todo-item__completed">
        <input type="text" class="todo-item__input" v-model="todo.title" @focus="openTodo(todo.id)" maxlength="30" placeholder="Enter the title">

        <TodoTags :todo="todo" @focused="openTodo(todo.id)" class="todo-item__tags"></TodoTags>

        <button @click="toggleOptions" class="todo-item__more"><i class="fas fa-ellipsis-v"></i></button>

        <ul class="options-popup" v-show="showOptions">
            <li class="options-popup__item options-popup__item_download">
                <button @click="deleteTodo(todo.id)">
                    <i class="fas fa-save"></i> Download
                </button>
            </li>
            <li class="options-popup__item options-popup__item_archive">
                <button @click="deleteTodo(todo.id)">
                    <i class="fas fa-archive"></i> Archive
                </button>
            </li>
            <li class="options-popup__item options-popup__item_remove">
                <button @click="deleteTodo(todo.id)">
                    <i class="fas fa-trash"></i> Remove
                </button>
            </li>
        </ul>

    </li>

</template>

<script>

    import TodoTags from "./TodoTags.vue";

    export default {
        name: "TodoItem",
        data() {
            return {
                showOptions: false
            }
        },
        props: {
            todo: Object
        },
        methods: {
            toggleOptions(e) { this.showOptions = !this.showOptions },
            openTodo(id) {
                this.$emit('updateOpenedTodo', id);
            },
            deleteTodo(id) {
                this.$emit('deleteTodo', id);
            }
        },
        components: {
            TodoTags
        }
    }
</script>

<style scoped>

.todo-item {
    position: relative;
    padding: 0 20px;
    border-left: 3px solid #8ACAFE;
    margin: 5px 0;
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
    min-height: 12px;
    min-width: 12px;
    border: none;
    margin-right: 10px;
}

.todo-item__more {
    background: transparent;
    border: none;
    font-size: 15px;
    color: #444;
    margin-left: 20px;
    cursor: pointer;
}

.options-popup {
    display: block;
    position: absolute;
    right: 0;
    top: 110%;
    padding: 10px;
    border-radius: 3px;
    background: #FFF;
    box-shadow: 1px 1px 5px 1px #DFDFDF;
    list-style: none;
    z-index: 10;
}

.options-popup__item button {
    height: 100%;
    background: transparent;
    border: none;
    border-radius: 0;
    cursor: pointer;
    font-size: 16px;
    padding: 10px;
    color: #111;
}

.options-popup__item_remove button:hover {
    color: #D4252D;
}

.options-popup__item_archive button:hover {
    color: #D47535;
}

.options-popup__item_download button:hover {
    color: #66CC69;
}

.options-popup i {
    margin-right: 15px;
}

@media screen and (max-width: 1268px){

    .todo-item__tags {
        display: none;
    }

}

</style>
