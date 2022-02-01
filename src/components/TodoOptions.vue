<template>

    <ul class="options-popup" v-show="this.show">
        <li class="options-popup__item options-popup__item_download">
            <button @click="">
                <i class="fas fa-save"></i> Download
            </button>
        </li>
        <li class="options-popup__item options-popup__item_archive">
            <button @click="">
                <i class="fas fa-archive"></i> Archive
            </button>
        </li>
        <li class="options-popup__item options-popup__item_remove">
            <button @click="deleteTodo">
                <i class="fas fa-trash"></i> Remove
            </button>
        </li>
    </ul>

</template>

<script>
    export default {
        name: "TodoOptions",
        props: {
            show: Boolean
        },
        inject: ['todoId'],
        methods: {
            deleteTodo(id) {


                // Build request headers
                const headers = { Authorization: this.$store.state.apiToken };

                // Send request
                fetch(`${this.$store.state.apiURL }/api/todos/${this.todoId}`, { method: 'DELETE', headers });

            },
        }
    }
</script>

<style scoped>

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

</style>
