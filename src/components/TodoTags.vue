<template>

    <ul class="todo__tags" v-if="todo">
        <li class="todo__tag tag" v-for="tag of todo.tags" @click="this.setFilterTag(tag)" >
            <button class="tag__delete" @click.stop="deleteTag(tag)">
                <MinusOutlined />
            </button>
            {{ tag }}
        </li>
        <li class="todo__tag todo__tag_add" @keydown.enter="addTag">
            <input type="text" v-model="tagName" class="todo__tag-input" placeholder="+" @focus="openTodo">
        </li>
    </ul>

</template>:

<script>

    import { MinusOutlined } from '@ant-design/icons-vue';
    import 'ant-design-vue';

    export default {
        data() {
            return {
                tagName: '',
                filters: this.$store.state.filters
            }
        },
        name: "TodoTags",
        props: ['todo'],
        methods: {
            setFilterTag(tag) {
                if (this.filters.tag === tag) this.filters.tag = null;
                else this.filters.tag = tag;
            },
            addTag() {

                if (!this.tagName.trim()) return false;

                this.todo.tags.add(this.tagName);
                this.$store.commit('addTag', this.tagName);
                this.tagName = '';

            },
            deleteTag(tag) {
                this.todo.tags.delete(tag);
            },
            openTodo() {
                this.$store.commit('setOpenedTodo', this.todo);
            }
        },
        components: {
            MinusOutlined
        }
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
    line-height: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}

.tag__delete {
    position: absolute;
    right: -5%;
    top: -10%;
    background: #EEE;
    border: none;
    border-radius: 10px;
    display: none;
    font-size: 8px;
    padding: 3px;
    cursor: pointer;
}

.todo__tag:hover .tag__delete {
    display: block;
}

.todo__tag_add {
    border: 1px solid #8ACAFE;
    color: #8ACAFE;
    background-color: transparent;
    padding: 1px 0;
}

.todo__tag_add:hover {
    background: #F4FAFE;
}

.todo__tag-input_add {
    padding: 0 5px;
}

</style>
