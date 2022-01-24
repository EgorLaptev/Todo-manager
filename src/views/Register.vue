<template>

    <section id="authorization" class="authorization">

        <div class="register">

            <h2 class="register__title">Register</h2>

            <form method="POST" class="register__form" @submit.prevent="register" id="registerForm">

                <input type="text" name="email" placeholder="E-mail" autocomplete="off">
                <input type="text" name="name" placeholder="Username" autocomplete="off">
                <input type="password" placeholder="Password" name="password" autocomplete="off">
                <input type="password" name="password_confirmation" placeholder="Confirm your password" autocomplete="off">
                <input type="submit" value="Register">

            </form>

            <router-link class="register__redirect" :to="{ name: 'login' }">Login</router-link>

        </div>

    </section>

</template>

<script>

    import router from '../router/index.js';

    export default {
        name: "Register",
        methods: {
            register() {

                const registerForm = document.querySelector('#registerForm');

                const body = new FormData(registerForm);

                fetch(`${baseUrl}/api/users`, { method: 'POST', body })
                    .then( resp => resp.json() )
                    .then( data => {
                        console.log(data);
                        if (data.api_token) {
                            window.bearerToken = 'Bearer ' + data.api_token;
                            localStorage.setItem('api_token', data.api_token);
                            router.push({name: 'home'});
                        }
                    });

            }
        }
    }
</script>

<style scoped>

.authorization {

    --accent-1: #8ACAFE;
    --accent-2: #6abcff;
    --accent-3: #b1d9fc;
    --accent-4: #F4FAFE;

    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    inset: 0;
    background-size: 50vw auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.register__redirect {
    color: #CCC;
}

.register {
    z-index: 2;
    text-align: center;
    background: #FFF;
}

.register__form {
    display: grid;
    grid-gap: 15px;
    margin-bottom: 20px;
}

.register__form {
    grid-template-columns: 1fr 1fr;
}

.register__title {
    line-height: 1.35em;
    font-size: 78rem;
    color: #CBE7FE;
    text-transform: uppercase;
    margin-bottom: 75px;
}

.register__form input {
    color: var(--accent-3);
    font-size: 18rem;
    border-radius: 0;
    border: none;
    border-left: 3px solid var(--accent-3);
    outline: none;
    padding: 10px 25px;
    text-align: center;
    background: var(--accent-4);
}
.register__form input:focus {
    border-color: var(--accent-1);
    color: var(--accent-1);
}

.register__form input:focus::placeholder {
    opacity: 0;
}

.register__form input::placeholder {
    color: var(--accent-3);
    transition: opacity .3s;
}

.register__form input[type='submit'] {
    cursor: pointer;
    border-color: var(--accent-1);
    background: var(--accent-1);
    color: white;
}

.register__form input[type='submit']:hover {
    border-color: var(--accent-2);
    background-color: var(--accent-2);
}

.register__form input[type='submit'] {
    grid-column: 1 / -1;
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
    .register {
        max-width: 95vw;
    }
}

@media screen and (max-width: 750px) {
    .authorization h2 {
        font-size: 65px;
    }
    .register__form {
        grid-template-columns: 1fr;
    }
}

@media screen and (max-width: 400px) {
    .authorization h2 {
        font-size: 56px;
    }
    .register {
        width: 95vw;
        padding: 50px 5px;
    }
    .register__form {
        grid-template-columns: 1fr;
    }

    .register__form input {
        padding: 10px 0;
    }

}

</style>

