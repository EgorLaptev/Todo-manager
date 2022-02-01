<template>

    <h4 class="tags-list__title">Tags</h4>
    <button @click="createTag" class="tags-list__add">+</button>
    <ul class="tags-list">
        <li class="tags-list__item" v-for="tag of this.$store.state.tags" @click="setFilterTag(tag)" :class="{activeTag: isTagActivated(tag)}">
            <input type="text" class="tags-list__input" placeholder="Enter the title" @keydown.enter="saveName($event, tag)" disabled :value="tag">
        </li>
    </ul>

</template>

<script>
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
    }
</script>

<style scoped>

</style>
