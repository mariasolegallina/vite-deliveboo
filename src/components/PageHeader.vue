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
            window.location.href = 'http://127.0.0.1:8000/admin';
        }
    }

}
</script>

<template>
    <header>
        <nav class="container">
            <router-link :to="{name: 'home'}">
                <div class="logo">
                <img src="/img/deliveboo-logo.png" alt="">
            </div>
            </router-link>
            <div class="icons">
                <!-- link to basket -->
                <router-link :to="{name: 'basket'}"  class="icon-container"@mouseover="hover = true" @mouseleave="hover = false">
                    <i class="fa-solid fa-cart-shopping"></i>
                    <span v-show="hover" class="login-tooltip">Vai al carrello</span>
                </router-link>

                <!-- link to login -->
                <div class="icon-container" @mouseover="hover = true" @mouseleave="hover = false">
                    <i class="fa-solid fa-user" @click="redirectToLogin()"></i>
                    <span v-show="hover" class="login-tooltip">Hai un ristorante?</span>
                </div>
            </div>
        </nav>
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

    padding: 16px 10px;


    .logo {

        max-width: 9rem;

    }

    .icons {
        color: $grey8;
        font-size: 1.4rem;

        display: flex;
        align-items: center;
        gap: 1rem;

        cursor: pointer;

        :hover {
            color: #ef4860;
        }
    }

    .icon-container {
        position: relative;
        display: inline-block;
    }

    .login-tooltip {
        font-size: $txt5;
        text-wrap: nowrap;
        position: absolute;
        top: 100%;
        left: 0%;
        transform: translateX(-70%);
        background-color: $grey2;
        color: $grey7;
        padding: 4px 8px;
        border-radius: 10px;
        visibility: hidden;
        opacity: 0;
        transition: opacity 0.5s, visibility 0.5s;
        cursor: default;
    }

    .icon-container:hover .login-tooltip {
        visibility: visible;
        opacity: 1;
    }

}
</style>