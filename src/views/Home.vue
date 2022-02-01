<template>

    <PureLoader v-if="this.$store.state.dataLoading"></PureLoader>

    <OptionsPanel></OptionsPanel>

    <FiltersPanel></FiltersPanel>

    <TodoList></TodoList>

    <EditTodo :todo="this.$store.state.openedTodo"></EditTodo>

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

    export default {
        name: 'app',
        components: {
            OptionsPanel,
            FiltersPanel,
            PureLoader,
            EditTodo,
            TodoList
        },
        created() {
            if (!this.$store.state.apiToken) router.push({ name: 'login' });
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
    padding: 9px 25px;
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

    .app__todo.app__todo_opened {
        width: 100vw;
    }

    .app__body {
        padding: 0 0 20px 0;
        display: flex;
        flex-direction: column-reverse;
        align-items: center;
        justify-content: space-between;
    }

    .app_add-todo {
        width: 90%;
        padding: 10px 5px;
        border-radius: 50px;
        background: white;
        box-shadow: 0 0 10px 0 #eee;
        text-align: center;
    }

}

</style>
