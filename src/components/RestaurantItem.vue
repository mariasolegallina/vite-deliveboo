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
            <!-- immagine -->
            <div class="image-wrapper">
                <img 
                    :src="'http://localhost:8000/storage/' + restaurant.image" 
                    :alt="'immagine ristorante ' + restaurant.restaurant_name"
                >
            </div>

            <!-- info ristorante -->
            <div class="rest-card__top">
                <h2>{{ restaurant.restaurant_name }}</h2>
                <p>{{ restaurant.address }}</p>
            </div>

            <div class="rest-card__type">
                <!-- tipologie -->
                <span 
                    v-for="currentType in restaurant.types"
                    :key="currentType.id"
                    class="type"
                >
                    {{ currentType.name }}
                </span>
            </div>
            <div class="overlay"></div>
        </div>
    </router-link>
</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;
@use "../style/partials/mixins" as *;

.rest-card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    @include box1;

    .image-wrapper {
        position: relative;
        width: 100%;
        padding-top: 56.25%;
        overflow: hidden;

        img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .rest-card__top {
        background-color: $light;
        padding: 14px;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
        gap: 6px;

        h2 {
            @include title2-semi;
            margin: 0;
        }
        p {
            font-size: $txt6;
            margin:0;
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
            font-size: $txt5;
            text-transform: uppercase;
            color: $light;
        }
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: $dark-30;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    &:hover .overlay {
        opacity: 1;
    }
}
</style>
