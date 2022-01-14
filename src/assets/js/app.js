'use strict';

const url = location.protocol + '//' + location.host;

const todosAppConfig = {
    data() {
        return {
            todo: { id: null, title: '', description: '', completed: false, tags: [] },
            todos: JSON.parse(localStorage.getItem('todos')) ?? [],
            tags: new Set(),
            openedTodo: null,
            dataIsLoading: true,
            filters: { tag: null, list: 0 },
            lists: [
                { id: 0, name: 'All' },
                { id: 1, name: 'Completed' },
                { id: 2, name: 'Uncomplted' }
            ],
        }
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

                fetch(`${url}/api/todos`, {
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
        }
    },
    watch: {
        openedTodo: {
            handler: _.debounce( todo => {

                if (!todo.id) return false;


                const body = JSON.stringify({
                    tags: JSON.stringify(todo.tags),
                    title: todo.title,
                    completed: todo.completed,
                    description: todo.description,
                });

                fetch(`${url}/api/todos/${todo.id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: bearerToken,
                    },
                    method: 'PUT', body
                });

            },1000),
            deep: true
        }
    },
    computed: {
        filteredTodos() {
            return this.todos.filter( todo => {
                if ( ( todo.completed && [0,1].includes(this.filters.list) ) || ( !todo.completed && [0,2].includes(this.filters.list) ) )  // Lists
                    if ( todo.tags.find( tag => tag === this.filters.tag ) || !this.filters.tag ) return true;
            })
        }
    },
    provide() {
        return {
            filters: this.filters,
            lists:   this.lists,
            todos:   this.todos,
            tags:    this.tags,
        }
    }
}

const todosApp = Vue.createApp(todosAppConfig);

todosApp.component('todo-item', {
    data() {
        return {
            showOptions: false,
            audioComplete: new Audio().play.bind(new Audio('public/assets/audio/complete.mp3'))
        }
    },
    inject: ['todos'],
    props: ['todo'],
    methods: {
        openTodo(id) {
            todosVm.openTodo(id);
        },
        toggleOptions(e) {
            this.showOptions = !this.showOptions
        },
        deleteTodo(id) {


            const todos = todosVm.todos;

            const todo = todos.find( item => item.id === id );
            todos.splice(todos.indexOf(todo), 1);

            fetch(`${url}/api/todos/${id}`, {
                headers: { Authorization: bearerToken },
                method: 'DELETE'
            });

        }
    },
template:
    `
        <li class="todo-item">

            <input type="checkbox" @focus="openTodo(todo.id)" v-model="todo.completed" @change="audioComplete" class="todo-item__completed">
            <input type="text" class="todo-item__input" v-model="todo.title" @focus="openTodo(todo.id)" placeholder="Enter the title">

            <todo-tags :todo="todo"></todo-tags>

            <button @click="toggleOptions" class="todo-item__more"><i class="fas fa-ellipsis-v"></i></button>

            <ul class="options-popup" v-show="showOptions">
                <li class="options-popup__item">
                    <button @click="deleteTodo(todo.id)"><i class="fas fa-minus-square"></i></button>
                </li>
            </ul>

        </li>
    `
})

todosApp.component('todos-list', {
    props: ['todos'],
    inject: ['filters'],
    template:
       `
        <ul class="todos-list">
            <todo-item v-for="todo of todos" :todo="todo"></todo-item>
        </ul>
       `
});

todosApp.component('lists-list', {
    inject: ['filters', 'lists'],
    methods: {
        isListActivated(id) {
            return this.filters.list == id;
        },
        setFilterList(id) {
            this.filters.list = id;
        }
    },
    template:
        `
            <h4 class="lists-list__title">Lists</h4>
            <ul class="lists-list">
                <li class="lists-list__item" v-for="list of lists" @click="setFilterList(list.id)" :class="{activeTag: isListActivated(list.id)}">
                    <input type="text" v-model="list.name" class="lists-list__input" placeholder="Enter the title" disabled>
                </li>
            </ul>
        `
})

todosApp.component('tags-list', {
    inject: ['filters', 'tags'],
    methods: {
        setFilterTag(tag) {
            if (this.filters.tag == tag) this.filters.tag = null;
            else this.filters.tag = tag;
        },
        isTagActivated(tag) {
            return tag == this.filters.tag;
        },
        createTag() {
            this.tags.add('');
        },
        saveName(e, name) {
            if (name.trim().length) e.target.disabled = true;
        }
    },
    template:
        `
            <h4 class="tags-list__title">Tags</h4>
            <button @click="createTag" class="tags-list__add">+</button>
            <ul class="tags-list">
                <li class="tags-list__item" v-for="tag of tags" @click="setFilterTag(tag)" :class="{activeTag: isTagActivated(tag)}">
                    <input type="text" v-model="tag" class="tags-list__input" placeholder="Enter the title" @keydown.enter="saveName($event, tag)" disabled>
                </li>
            </ul>
        `
})

todosApp.component('todo-tags', {
    props: ['todo'],
    inject: ['tags', 'filters'],
    methods: {
        setFilterTag(tag) {
            if (this.filters.tag == tag) this.filters.tag = null;
            else this.filters.tag = tag;
        },
        addTag() {
            this.tags.add('unnamed');
            this.todo.tags.push('unnamed');
        }
    },
    template:
        `
            <ul class="todo__tags" v-if="todo">
                <li class="todo__tag" v-for="tag of todo.tags" @click="this.setFilterTag(tag)">{{ tag }}</li>
                <li class="todo__tag todo__tag_add" @click="addTag">+</li>
            </ul>
        `
})

todosApp.component('filter-panel', {
   template:
       `
        <section class="app__filters">
            <lists-list></lists-list>
            <tags-list></tags-list>
        </section>
       `
});

todosApp.component('side-panel', {
    data() {
      return {
          showUploadAvatar: false,
          showSearchTodos: false,
      }
    },
    template:
    `
        <upload-photo v-show="showUploadAvatar"></upload-photo>
        <search-todos v-show="showSearchTodos"></search-todos>

        <aside class="app__aside">

            <ul class="aside__list">
                <li class="aside__item">
                    <img class="user-avatar" src="public/assets/img/avatar.jpg" @click="showUploadAvatar = !showUploadAvatar"/>
                </li>
                <li class="aside__item aside__item_active">
                    <i class="fas fa-check-square"></i>
                </li>
                <li class="aside__item">
                    <i class="fas fa-search" @click="showSearchTodos = !showSearchTodos"></i>
                </li>
                <li class="aside__item">
                    <i class="fas fa-cog"></i>
                </li>
                <li class="aside__item">
                    <a href="${url}/users/logout">
                        <i class="fas fa-sign-out-alt"></i>
                    </a>
                </li>
            </ul>

        </aside>
    `
})

todosApp.component('edit-panel', {
    props: ['todo'],
    template:
        `
            <section class="app__todo todo" id="appTodo">
                <template v-if="todo">

                    <h3><input type="text" v-model.trim="todo.title" class="todo__title-input" placeholder="Title"></h3>
                    <p><textarea v-model="todo.description" class="todo__content-input" placeholder="Description"></textarea></p>

                    <todo-tags :todo="todo"></todo-tags>

                </template>
            </section>

        `
})

todosApp.component('pure-loader', {
    template:
        `
            <div class="pure-loader">
                <div class="sk-folding-cube">
                  <div class="sk-cube1 sk-cube"></div>
                  <div class="sk-cube2 sk-cube"></div>
                  <div class="sk-cube4 sk-cube"></div>
                  <div class="sk-cube3 sk-cube"></div>
                </div>
            </div>
        `
})

todosApp.component('upload-photo', {
    data() {
        return {
            preview: null,
            streaming: false,
            picture: false
        }
    },
    methods: {
        startStreaming() {

            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {

                this.streaming = true;
                this.preview = document.querySelector("#avatarPreivew");

                const userMedia     = navigator.mediaDevices.getUserMedia({ video: { width: 200, height: 200 }, audio: false});

                userMedia
                    .then( stream => {
                        this.preview.srcObject = stream;
                        this.preview.play();
                        this.stream = stream;
                    });

            }

        },
        stopStreaming() {
            this.stream.getTracks().forEach( track => track.stop() );
            this.streaming = false;
            this.picture   = false;
        },
        takePhoto() {

            const cnv = document.querySelector('#avatarPicture');
            const ctx = cnv.getContext('2d');

            this.picture = cnv;

            cnv.width  = 225;
            cnv.height = 225;

            ctx.drawImage(this.preview, 0, 0, this.preview.videoWidth, this.preview.videoHeight, 0, 0, cnv.width, cnv.height);

        },
        repeatPhoto() {
            this.stopStreaming();
            this.startStreaming();
        },
        setAvatar() {

            this.picture.toBlob( blob => {

            });

            this.stopStreaming();

        }
    },
    template:
    `
        <section class="upload-photo">

            <video v-show="streaming && !picture" class="upload-photo__preview" id="avatarPreivew"></video>
            <canvas v-show="picture && streaming" class="upload-photo__picture" id="avatarPicture"></canvas>

            <label for="uploadFile" v-show="!streaming">
                <i class="fas fa-upload upload-photo__icon"></i>
            </label>

            <div class="upload-photo__buttons">
                <div class="upload-photo__buttons-group" v-show="!streaming">
                    <label for="uploadFile" class="upload-photo__button">Upload</label>
                    <button class="upload-photo__button" @click="startStreaming">Camera</button>
                </div>
                <div class="upload-photo__buttons-group" v-show="streaming">
                    <button class="upload-photo__button" @click="stopStreaming">Cancel</button>
                    <button class="upload-photo__button" @click="takePhoto" v-show="!picture">Photo</button>
                    <button class="upload-photo__button" @click="setAvatar" v-show="picture">OK</button>
                </div>
            </div>

            <input type="file" id="uploadFile" name="uploadFile" class="upload-photo__input">

        </section>
    `
})

todosApp.component('search-todos', {
    template:
    `
        <section class="search-todos">
            <input type="search" id="searchInput" placeholder="Enter the title or tag">
        </section>
    `
})

const todosVm  = todosApp.mount('#todosApp');

syncTodos();

function syncTodos(token = '') {

    fetch(`${url}/api/todos`, {
        method: 'GET',
        headers: {
            Authorization: bearerToken
        }
    })
        .then( resp => resp.json() )
        .then( todos => {
            todos['data'].filter( todo => {
                todo.tags = JSON.parse(todo.tags)
                todo.tags.forEach( tag => todosVm.tags.add(tag) );
            }) // Parse todo tags
            todosVm.todos = todos['data'];
            localStorage.setItem('todos', JSON.stringify(todos['data']));
            todosVm.dataIsLoading = false;
        });

}

window.vm = todosVm;
