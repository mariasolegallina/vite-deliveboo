<script>
export default {

    name: 'PageHeader',
    data() {
        return {
            hover: false
        };
    },

    methods: {
        redirectToLogin() {
            window.location.href = 'http://127.0.0.1:8000/';
        }
    }

}
</script>

<template>
    <header>
        <section>
            <nav class="container">
                <div class="logo">
                    <img src="/img/deliveboo-logo.png" alt="">
                </div>
                <div class="icons">
                    <div class="icon-container" @mouseover="hover = true" @mouseleave="hover = false">
                        <i class="fa-solid fa-user" @click="redirectToLogin()"></i>
                        <span v-show="hover" class="login-tooltip">Lavora con noi</span>
                    </div>
                    <i class="fa-solid fa-basket-shopping"></i>
                </div>
            </nav>
        </section>
    </header>
</template>

<style lang="scss" scoped>
// @use "../style/general.scss";
@use "../style/partials/variables" as *;

header {
    background-color: $light;
    filter: drop-shadow(0 0 0.2rem $grey2);

}

;

nav {
    display: flex;
    justify-content: space-between;
    align-items: center;


    .logo {

        max-width: 10rem;

    }

    .icons {
        color: $grey8;
        font-size: 1.4rem;

        display: flex;
        align-items: center;
        gap: 1rem;

        cursor: pointer;
    }

    .icon-container {
        position: relative;
        display: inline-block;
    }

    .login-tooltip {
        font-size: 15px;
        text-wrap: nowrap;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        background-color: #ef4860;
        color: white;
        padding: 4px 8px;
        border-radius: 10px;
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.5s, visibility 0.5s;
    }

    .icon-container:hover .login-tooltip {
        visibility: visible;
        opacity: 1;
    }

}
</style>