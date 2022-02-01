import { createApp } from 'vue';
import { createStore } from 'vuex';
import router from './router';
import App from './App.vue';
import './registerServiceWorker';
import { Empty } from 'ant-design-vue';

// App state
const store = createStore({
    state() {
        return {
            filters: { tag: null, list: 0 },
            openedTodo: null,
            apiToken: localStorage.getItem('api_token') || null,
            apiURL: 'http://api.todos.gq',
            dataLoading: true,
            emptyImage: Empty.PRESENTED_IMAGE_SIMPLE,
            tags: new Set(),
            lists: [
                { id: 0, name: 'All' },
                { id: 1, name: 'Completed' },
                { id: 2, name: 'Uncompleted' }
            ],
        }
    },
    mutations: {
        setFilters (state, opt) {
            state.filters.tag  = opt.tag  || null;
            state.filters.list = opt.list || 0;
        },
        setOpenedTodo(state, todo) {
            state.openedTodo = todo;
        },
        addTag(state, tag) {
            state.tags.add(tag);
        },
        setApiToken(state, newToken) {
            state.apiToken = `Bearer ${newToken}`;
            localStorage.setItem('api_token', `Bearer ${newToken}`);
        }
    }
});

window.app = createApp(App)
    .use(router)
    .use(store)
    .mount('#app');
