<script>
export default {

    name: 'RestaurantItem',

    props : {
        restaurant: Object,
    }
}

</script>

<template>
    <router-link :to="{name: 'single-restaurant', params: {id: restaurant.id}}">

        <div class="rest-card">
            <div class="rest-card__top">
                <img 
                :src="'http://localhost:8000/storage/' + restaurant.image" 
                :alt="'immagine ristorante ' + restaurant.restaurant_name"
                >
                <h2>{{ restaurant.restaurant_name }}</h2>
                <p>{{ restaurant.address }}</p>
            </div>
            <div class="rest-card__type">
                <span 
                v-for="currentType in restaurant.types"
                class="type"
                >
                    {{ currentType.name }}
                </span>
            </div>
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;
@use "../style/partials/mixins" as *;

.rest-card {

    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .rest-card__top {

        background-color: $light;
        padding: 14px;
        flex-grow: 1;

        h2 {
            @include title2-semi;
        }

        p {
            font-size: $txt6;
        }
    }

    .rest-card__type {
        background-color: $primary1;
        padding: 4px 8px;

        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        gap: 6px;
        
        .type {
        font-size: $txt6;
        text-transform: uppercase;
        color: $light;
        }
    
    }

}
</style>