<script>
export default {

name: 'PageHeader',

}
</script>

<template>
<header>
    <nav class="container">
        <div class="logo">
            <img src="/img/deliveboo-logo.png" alt="">
        </div>
        <div class="icons">
            <i class="fa-solid fa-user"></i>
            <i class="fa-solid fa-basket-shopping"></i>
        </div>
    </nav>
</header>
</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;

header {
    background-color: $light;
};

nav {
    width: 130px;
    padding: 10px 0;
    display: flex;
    justify-content: space-between;

    .icons {
        color: $grey8;

        display: flex;
        align-items: center;
    }

}

</style>