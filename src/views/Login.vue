<template>

    <section id="authorization" class="authorization">

        <div class="login">

            <h2 class="login__title">Log in</h2>

            <form method="POST" class="login__form" @submit.prevent="login">
                <input v-model="email" type="email" name="email" placeholder="E-mail" autocomplete="off">
                <input v-model="password" type="password" placeholder="Password" name="password" autocomplete="off">
                <input type="submit" value="Log in">
            </form>

            <router-link class="login__redirect" :to="{ name: 'register' }">Register</router-link>

            <div class="alert">{{ alert }}</div>

        </div>

    </section>


</template>

<script>

    import router from '../router/index.js';

    export default {
        name: "Login",
        data() {
            return {
                email: null,
                password: null,
                alert: ''
            }
        },
        methods: {
            login() {

                const body = new FormData;
                body.append('email', this.email);
                body.append('password', this.password);

                fetch(`${baseUrl}/api/users/login`, { method: 'POST', body })
                    .then( resp => resp.json() )
                    .then( data => {
                        if (data.api_token) {
                            window.bearerToken = 'Bearer ' + data.api_token;
                            localStorage.setItem('api_token', data.api_token);
                            router.push({ name: 'home' });
                        }
                    });

            }
        }
    }
</script>

<style scoped>
.authorization {
    overflow: hidden;
    padding: 150px;
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    --accent-1: #8ACAFE;
    --accent-2: #6abcff;
    --accent-3: #b1d9fc;
    --accent-4: #F4FAFE;
}

.login {
    z-index: 2;
    padding: 50px;
    border-radius: 0;
    text-align: center;
    background: #FFF;
    transition: transform .3s;
    display: flex;
    flex-direction: column;
}

.login__redirect {
    color: #ccc;
}

.login__form {
    display: grid;
    grid-gap: 15px;
    margin-bottom: 20px;
}

.login__title {
    line-height: 1.35em;
    font-size: 78rem;
    color: #CBE7FE;
    text-transform: uppercase;
    margin-bottom: 75px;
}


.login__form input {
    color: var(--accent-3);
    font-size: 20rem;
    border-radius: 0;
    border: none;
    border-left: 3px solid var(--accent-3);
    outline: none;
    padding: 10px 25px;
    text-align: center;
    background: var(--accent-4);
}

.login__form input:focus {
    border-color: var(--accent-1);
    color: var(--accent-1);
}

.login__form input:focus::placeholder {
    opacity: 0;
}

.login__form input::placeholder {
    color: var(--accent-3);
    transition: opacity .3s;
}

.login__form input[type='submit'] {
    cursor: pointer;
    border-color: var(--accent-1);
    background: var(--accent-1);
    color: white;
}

.login__form input[type='submit']:hover {
    border-color: var(--accent-2);
    background-color: var(--accent-2);
}

.alerts {
    grid-column: 1 / -1;
    color: #FD300C;
    text-align: center;
}

@media screen and (max-width: 1300px) {
    .authorization {
        grid-template-columns: 1fr;
    }
    .login {
        max-width: 95vw;
    }
}

@media screen and (max-width: 750px) {
    .authorization h2 {
        font-size: 65px;
    }
}

@media screen and (max-width: 400px) {
    .authorization h2 {
        font-size: 30px;
    }
    .login {
        width: 95vw;
        padding: 50px 5px;
    }
    .authorization form input {
        font-size: 15px;
        width: 100%;
    }
}

</style>
