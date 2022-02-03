<template>

    <a-dropdown placement="bottomRight">

        <a-button class="todo-item__more">
            <MoreOutlined />
        </a-button>

        <template #overlay>
            <a-menu>
                <a-menu-item class="options-popup__item ">
                    <a-button @click="">
                        <StarOutlined /> Stared
                    </a-button>
                </a-menu-item>
                <a-menu-item class="options-popup__item">
                    <a-button @click="">
                        <DownloadOutlined /> Save
                    </a-button>
                </a-menu-item>
                <a-menu-item class="options-popup__item">
                    <a-button @click="$emit('deleteTodo')">
                        <DisconnectOutlined /> Remove
                    </a-button>
                </a-menu-item>
            </a-menu>
        </template>

    </a-dropdown>

</template>

<script>

    import { Dropdown, Menu, MenuItem, Button } from 'ant-design-vue';
    import { MoreOutlined, StarOutlined, DisconnectOutlined, DownloadOutlined } from '@ant-design/icons-vue';

    export default {
        name: "TodoOptions",
        props: {
            show: Boolean
        },
        emits: ['deleteTodo'],
        inject: ['todoId'],
        components: {
            'a-dropdown': Dropdown,
            'a-menu': Menu,
            'a-menu-item': MenuItem,
            'a-button': Button,
            MoreOutlined,
            StarOutlined,
            DisconnectOutlined,
            DownloadOutlined
        }
    }
</script>

<style scoped>

.todo-item__more {
    background: transparent;
    border: none;
    color: #444;
    font-size: 25px;
    cursor: pointer;
    padding: 0;
    margin-left: 10px;
    height: min-content;
    min-width: 20px;
}

.options-popup__item button {
    height: 100%;
    background: transparent;
    border: none;
    border-radius: 0;
    cursor: pointer;
    font-size: 16px;
    color: #111;
}

</style>
