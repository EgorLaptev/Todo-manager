<template>

    <h4 class="tags-list__title">Tags</h4>
    <button @click="createTag" class="tags-list__add">
        <PlusOutlined />
    </button>
    <ul class="tags-list">
        <li class="tags-list__item" v-for="tag of this.$store.state.tags" @click="setFilterTag(tag)" :class="{activeTag: isTagActivated(tag)}">
            <input type="text" class="tags-list__input" placeholder="Enter the title" @keydown.enter="saveName($event, tag)" disabled :value="tag">
        </li>
    </ul>

</template>

<script>

    import { PlusOutlined } from '@ant-design/icons-vue';
    import 'ant-design-vue';

    export default {
        name: "TagsList",
        methods: {
            setFilterTag(tag) {
                if (this.$store.state.filters.tag === tag) this.$store.state.filters.tag = null;
                else this.$store.state.filters.tag = tag;
            },
            isTagActivated(tag) {
                return tag === this.$store.state.filters.tag;
            },
            createTag() {

            },
            saveName(e, name) {
                if (name.trim().length) e.target.disabled = true;
            }
        },
        components: {
            PlusOutlined
        }
    }
</script>

<style scoped>

.tags-list__add {
    width: 25px;
    color: #aaa;
    float: right;
    border: none;
    cursor: pointer;
    background: transparent;
}

.tags-list__add:hover {
    color: #8ACAFE;
}

.tags-list {
    list-style: none;
    padding: 0;
    margin: 0 0 50px 0;
}

.tags-list__title {
    display: inline-block;
    margin-bottom: 10px;
    font-weight: normal;
    font-size: 18px;
    color: #BBB;
}

.tags-list__item {
    font-size: 17px;
    padding: 0 10px;
    cursor: pointer;
}

.tags-list__item:hover,
.activeTag {
    border-left: 3px solid #8ACAFE;
    background: #F4FAFE;
}

.tags-list__input {
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

.tags-list__input::placeholder {
    color: #DDD;
}

</style>
