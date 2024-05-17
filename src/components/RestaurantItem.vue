<script>
export default {

    name: 'RestaurantItem',

    props : {
        restaurant: Object,
    }
}

</script>

<template>

<div class="card">
    <h2>
        {{ restaurant.name }}
    </h2>
</div>

</template>

<style scoped>

</style>