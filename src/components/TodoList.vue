<template>

   <main class="app__body">

        <input type="text" placeholder="Add new activity" class="app_add-todo" v-model.trim="todo.title" @keydown.enter="addTodo">

        <ul class="todos-list">
            <TodoItem v-if="filteredTodos.length" v-for="todo of filteredTodos" :todo="todo" v-on:deleteTodo="deleteTodo"></TodoItem>
            <Empty v-else :image="$store.state.emptyImage" description="" :image-style="{ height: '180px' }"></Empty>
        </ul>

    </main>

</template>

<script>

    import TodoItem from './TodoItem';
    import { debounce } from 'lodash';
        import { Empty } from 'ant-design-vue';

    import 'ant-design-vue/lib/empty/style/index.css';

    export default {
        name: "TodoList",
        data() {
          return {
              todos: [],
              todosOriginal: [],
              todo: { id: null, title: '', description: '', completed: false, tags: new Set() }, // new task template
          }
        },
        components: {
            TodoItem,
            Empty
        },
        computed: {
            filteredTodos() {

                const filters = this.$store.state.filters;

                return this.todos.filter( todo => {
                    if ( ( todo.completed && [0,1].includes(filters.list) ) || ( !todo.completed && [0,2].includes(filters.list) ) )  // Lists
                        if ( todo.tags.has(filters.tag) || !filters.tag ) return true;
                });

            }
        },
        methods: {
            addTodo() {

                const title = this.todo.title;

                // Store new task
                if (title.trim()) {

                    // Auth
                    if ( !this.$store.state.apiToken ) return false;

                    // Build request body
                    const body = JSON.stringify({ title, tags: JSON.stringify([]) });

                    // Build request headers
                    const headers = {
                        'Content-Type': 'application/json;charset=utf-8',
                        Authorization: this.$store.state.apiToken
                    }

                    this.todo.title = title;
                    this.todos.push(this.todo);

                    // Send store task request
                    fetch(`${this.$store.state.apiURL}/api/todos`, { method: 'POST', body,  headers })
                        .then( resp => resp.json() )
                        .then( todo => { this.todos[this.todos.length-1]['id'] = todo.id });

                }

                this.todo = { id: this.todo.id , title: '', description: '', tags: new Set() } // Reset new task template

            },
            loadTodos() {

                // Auth
                if ( !this.$store.state.apiToken ) return false;

                // Build request headers
                const headers = { Authorization: this.$store.state.apiToken };

                // Send request
                fetch(`${this.$store.state.apiURL}/api/todos`, { method: 'GET', headers })
                    .then( resp => resp.json() )
                    .then( todos => {

                        // Parse task's tags
                        todos.filter( todo => {
                            todo.tags = new Set(JSON.parse(todo.tags));
                            todo.tags.forEach( tag => this.$store.commit('addTag', tag) );
                        });

                        this.todos = todos;
                        this.$store.state.dataLoading = false; // Hide pretty loader

                    });

            },
            uploadTodos() {

                this.todos.forEach( todo => {

                    // Build request body
                    const body = JSON.stringify({
                        title: todo.title,
                        description: todo.description,
                        completed: todo.completed,
                        tags: JSON.stringify(Array.from(todo.tags))
                    });

                    // Build request headers
                    const headers = {
                        Authorization: this.$store.state.apiToken,
                        'Content-Type': 'application/json'
                    };

                    // Send request
                    fetch(`${this.$store.state.apiURL}/api/todos/${todo.id}`, { method: 'PATCH', headers, body });

                });

            },
            deleteTodo(id) {

                // Build request headers
                const headers = { Authorization: this.$store.state.apiToken };

                // Send request
                fetch(`${this.$store.state.apiURL }/api/todos/${id}`, { method: 'DELETE', headers });

                // Find * delete task from local list
                const todo_index = this.todos.findIndex( item => item.id == id );
                this.todos.splice(todo_index, 1);

            },
        },
        watch: {
            todos: {
                handler: debounce( function() {
                    this.uploadTodos();
                } , 750),
                deep: true
            }
        },
        created() {
            this.loadTodos();
        }
    }

</script>

<style scoped>

    .app_add-todo {
        border-radius: 3px;
        border: none;
        padding: 9px 25px;
        font-size: 17px;
        outline: none;
        background: white;
        width: 90%;
        box-shadow: 0 0 10px 0 #E5E5E5;
        z-index: 100;
    }

    .app_add-todo::placeholder {
        color: #DDD;
        text-align: left;
    }

    .todos-list {
        display: grid;
        gap: 5px;
        width: 90%;
        margin: 0;
        padding: 35px 0 50px 0;
        list-style: none;
    }

</style>
