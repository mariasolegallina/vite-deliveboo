<script>
export default {

name: 'PageHeader',

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
                <i class="fa-solid fa-user"></i>
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

};

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
    }

}

</style>