<template>

    <PureLoader v-if="dataIsLoading"></PureLoader>

    <OptionsPanel></OptionsPanel>

    <FiltersPanel></FiltersPanel>

    <main class="app__body">
        <input type="text" placeholder="Write title for new todo #tags" class="app_add-todo" v-model.trim="todo.title" @keydown.enter="addTodo">
        <TodoList>
            <TodoItem v-for="todo of filteredTodos" :todo="todo" @updateOpenedTodo="openTodo" @deleteTodo="deleteTodo"></TodoItem>
        </TodoList>
    </main>

    <EditTodo :todo="openedTodo" @closeTodo="closeTodo"></EditTodo>

</template>

<script>

    import * as _ from "lodash";
    import { computed, ref } from "vue";
    import router from "../router/index.js";

    // Vue components
    import OptionsPanel from "../components/OptionsPanel.vue";
    import FiltersPanel from "../components/FiltersPanel.vue";
    import PureLoader from "../components/PureLoader.vue";
    import EditTodo from "../components/EditTodo.vue";
    import TodoList from "../components/TodoList.vue";
    import TodoItem from "../components/TodoItem.vue";
    import Note from "../components/Note.vue";

    window.baseUrl = 'http://api.todos.gq';
    window.bearerToken = 'Bearer ' + localStorage.getItem('api_token') || null;

    export default {
        name: 'app',
        data() {
            return {
                todo: { id: null, title: '', description: '', completed: false, tags: [] },
                todos: [],
                tags: new Set(),
                openedTodo: null,
                dataIsLoading: true,
                api_token: localStorage.getItem('api_token'),
                filters: { tag: null, list: 0 },
                lists: [
                    { id: 0, name: 'All' },
                    { id: 1, name: 'Completed' },
                    { id: 2, name: 'Uncompleted' }
                ],
            }
        },
        components: {
            TodoItem,
            OptionsPanel,
            FiltersPanel,
            PureLoader,
            EditTodo,
            TodoList,
            Note
        },
        methods: {
            addTodo() {

                // Devide query string for title & tag name
                const [title, tag] = this.todo.title.split('#');

                // Add tag
                if (tag && tag.trim()) {

                    let tagExists = false,
                        tagObj    = null;

                    for (const tagItem of this.tags) if (tagItem.name == tag.trim().toLowerCase()) {
                        tagExists = true;
                        tagObj = tagItem;
                    }

                    if (!tagExists) this.tags.add(tag.trim().toLowerCase());
                    this.todo.tags.push(tag.trim().toLowerCase());

                }

                // Store new todo
                if (title.trim()) {

                    const body = JSON.stringify({
                        title, tags: JSON.stringify(this.todo.tags)
                    })

                    fetch(`${baseUrl}/api/todos`, {
                        method: 'POST', body,
                        headers: {
                            'Content-Type': 'application/json;charset=utf-8',
                            Authorization: bearerToken
                        }
                    })  .then( resp => resp.json() )
                        .then( todo => {
                            this.todos[this.todos.length-1]['id'] = todo.id;
                        });

                    this.todo.title = title;
                    this.todos.push(this.todo);

                }

                this.todo = { id: this.todo.id , title: '', description: '', tags: [] }

            },
            openTodo(id) {
                this.openedTodo = this.todos.find( item => item.id === id );
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
                        Authorization: bearerToken,
                        'Content-Type': 'application/json'
                    };

                    // Send request
                    fetch(`${baseUrl}/api/todos/${todo.id}`, { method: 'PATCH', headers, body });

                });

            },
            loadTodos() {

                // Build request headers
                const headers = { Authorization: bearerToken };

                // Send request
                fetch(`${baseUrl}/api/todos`, { method: 'GET', headers })
                    .then( resp => resp.json() )
                    .then( todos => {

                        // Parse task's tags
                        todos.filter( todo => {
                            todo.tags = new Set(JSON.parse(todo.tags));
                            todo.tags.forEach( tag => this.tags.add(tag) );
                        });

                        this.todos = todos;
                        this.dataIsLoading = false; // Hide pretty loader
                        localStorage.setItem('todos', JSON.stringify(todos));

                    });

            },
            deleteTodo(id) {

                // Delete task from local list
                const todo = this.todos.find( item => item.id === id );
                this.todos.splice(this.todos.indexOf(todo), 1);

                // Build request headers
                const headers = { Authorization: bearerToken };

                // Send request
                fetch(`${baseUrl}/api/todos/${id}`, { method: 'DELETE', headers });

            },
            closeTodo() { this.openedTodo = null },
        },
        watch: {
            openedTodo: {
                handler: _.debounce( function() {
                    this.uploadTodos();
                } , 1000),
                deep: true
            }
        },
        computed: {
            isAuthorizated() {
                return localStorage.getItem('api_token') !== null
            },
            filteredTodos() {
                return this.todos.filter( todo => {
                    if ( ( todo.completed && [0,1].includes(this.filters.list) ) || ( !todo.completed && [0,2].includes(this.filters.list) ) )  // Lists
                        if ( todo.tags.has(this.filters.tag) || !this.filters.tag ) return true;
                })
            }
        },
        provide() {
            return {
                filters: this.filters,
                lists:   this.lists,
                tags:    this.tags,
                openedTodo: computed( () => this.openedTodo )
            }
        },
        mounted() {
            if ( this.isAuthorizated ) this.loadTodos();
            else router.push({ name: 'login' });
            setTimeout( this.uploadTodos, 3000);
        },
    }

</script>

<style>

:root {
    font-size: 1px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    user-select: none;
}

body {
    position: fixed;
    width: 100%;
    height: 100%;
    font-size: 18rem;
    font-family: sans-serif;
    color: #111;
    background: #FFF;
}

a {
   color: inherit;
    text-decoration: none;
}

.app {
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-columns: 50px minmax(200px, 3fr) 10fr minmax(250px, 6fr);
}


.app__body {
    padding: 25px;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: scroll;
    border-right: 1px solid #EEE;
}

.app__body::-webkit-scrollbar {
    background: transparent;
    width: 0;
}

.app_add-todo {
    border-radius: 3px;
    border: none;
    padding: 10px 25px;
    font-size: 17px;
    outline: none;
    background: #F5f5f5;
    width: 90%;
}

.app_add-todo::placeholder {
    color: #DDD;
    text-align: left;
}

@media screen and (max-width: 1024px) {

    .app {
        grid-template-columns: 50px minmax(345px, 10fr) minmax(250px, 5fr);
    }

    .app__filters {
        display: none;
    }

    .app_add-todo::placeholder {
        text-align: center;
    }

}

@media screen and (max-width: 768px) {

    .app {
        grid-template-columns: 50px minmax(345px, 10fr)
    }

    .app__todo {
        display: none;
    }

    .app__todo.app__todo_opened {
        position: absolute;
        right: 0;
        height: 100vh;
        width: calc(100vw - 50px);
        background-color: white;
        display: block;
    }

}

@media screen and (max-width: 481px) {

    .app {
        grid-template-columns: 1fr;
    }

    .app__body {
        padding: 25px 0;
    }

}

</style>
