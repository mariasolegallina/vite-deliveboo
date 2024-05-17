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
        {{ restaurant.restaurant_name }}
    </h2>
</div>

</template>

<style scoped>

</style>