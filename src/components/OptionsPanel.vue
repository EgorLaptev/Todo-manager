<template>

    <aside class="app__aside">

        <ul class="aside__list">
            <li class="aside__item" style="{ background: #8ACAFE }">
                <img class="user-avatar" src="../assets/img/avatar.jpg" alt="">
            </li>
            <li class="aside__item aside__item_active">
                <CheckSquareOutlined/>
            </li>
            <li class="aside__item">
                <SettingOutlined/>
            </li>
            <li class="aside__item">
                <SearchOutlined/>
            </li>
            <li class="aside__item" @click="logout">
                <LogoutOutlined/>
            </li>
        </ul>

    </aside>

</template>

<script>

    import router from '../router/index.js';

    import { Avatar } from 'ant-design-vue';
    import { SettingOutlined, SearchOutlined, CheckSquareOutlined, LogoutOutlined } from '@ant-design/icons-vue';
    import 'ant-design-vue/dist/antd.css';

    export default {
        name: "OptionsPanel",
        methods: {
            logout() {
                localStorage.removeItem('api_token');
                router.push({ name: 'login' });
            }
        },
        components: {
            SettingOutlined,
            SearchOutlined,
            CheckSquareOutlined,
            LogoutOutlined,
            Avatar
        }
    }
</script>

<style scoped>

    .app__aside {
        position: relative;
        padding: 10px 0;
        border-right: 1px solid #EEE;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
    }

    .aside__list {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        list-style: none;
        gap: 10px;
    }


    .aside__item {
        width: 40px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #333;
        cursor: pointer;
    }

    .aside__item_active,
    .aside__item:hover {
        color: #8ACAFE;
    }

    .aside__item:first-of-type {
        margin-bottom: 10px;
    }

    .user-avatar {
        background: #DDD;
        border-radius: 3px;
        width: 100%;
        height: 100%;

    }


    @media screen and (max-width: 481px) {

        .app__aside {
            display: none;
        }

    }

</style>
