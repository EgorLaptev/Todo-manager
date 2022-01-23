<template>

    <ul class="todo__tags" v-if="todo">
        <li class="todo__tag tag" v-for="tag of todo.tags" @click="this.setFilterTag(tag)" >
            <button class="tag__delete" @click.stop="deleteTag(tag)">
                <i class="fas fa-times"></i>
            </button>
            {{ tag }}
        </li>
        <li class="todo__tag todo__tag_add" @keydown.enter="addTag">
            <input type="text" v-model="newTag" class="todo__tag-input" placeholder="new">
        </li>
    </ul>

</template>:

<script>
    export default {
        data() {
            return {
                newTag: null
            }
        },
        name: "TodoTags",
        props: ['todo'],
        inject: ['tags', 'filters'],
        methods: {
            setFilterTag(tag) {
                if (this.filters.tag === tag) this.filters.tag = null;
                else this.filters.tag = tag;
            },
            addTag() {
                this.todo.tags.add(this.newTag);
                this.tags.add(this.newTag);
                this.newTag = null;
            },
            deleteTag(tag) {
                this.todo.tags.delete(tag);
            }
        },
    }
</script>

<style scoped>

.todo__tags {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 10px;
}

.todo__tag-input {
    border: none;
    outline: none;
    background:transparent;
    width: 50px;
    text-align: center;
}

.todo__tag-input::placeholder {
    color: #6ABCFF;
}

.todo__tag {
    position: relative;
    border-radius: 20px;
    padding: 1px 10px;
    background: #CBE7FE;
    font-size: 16px;
    cursor: pointer;
    white-space: nowrap;
    max-width: 125px;
    text-overflow: ellipsis;
}

.tag__delete {
    position: absolute;
    right: -5%;
    top: -10%;
    background: #EEE;
    border: none;
    border-radius: 10px;
    display: none;
    font-size: 10px;
    width: 15px;
    height: 15px;
    cursor: pointer;
}

.todo__tag:hover .tag__delete {
    display: block;
}

.todo__tag_add {
    border: 1px solid #8ACAFE;
    color: #8ACAFE;
    background-color: transparent;
}

.todo__tag_add:hover {
    background: #F4FAFE;
}

</style>
