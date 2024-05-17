<script>
export default {

    name: 'RestaurantItem',

    props : {
        restaurant: Object,
    }
}

</script>

<template>

<div class="col-6">

    <div class="card p-3">
        <h2>
            {{ restaurant.restaurant_name }}
        </h2>
        <img 
            :src="'http://localhost:8000/storage/' + restaurant.image" 
            :alt="'immagine ristorante ' + restaurant.restaurant_name"
        >

        <p>
            {{ restaurant.address }}
        </p>

        <div>
            <span 
                v-for="currentType in restaurant.types"
                class="badge rounded-pill bg-primary"
            >
                {{ currentType.name }}
            </span>
        </div>

    </div>
</div>

</template>

<style scoped>

</style>