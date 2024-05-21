<script>

import axios from 'axios';

import { store } from '../store.js';


export default {

    name: 'SingleRestaurant',

    data() {
        return {
            restaurant: [],
            restaurantId: '',

            store,

            count:1,

            
        }
    },


    

    mounted() {
        this.restaurantId = this.$route.params.id;

        axios.get(this.store.baseApiUrl + '/restaurants/' + this.restaurantId).then(res => {
            this.restaurant = res.data.restaurant
            console.log(this.restaurant);
        })
    }


}
</script>

<template>
    <section>
        <div class="container">
            <h3 class='rest_title'>{{ restaurant.restaurant_name }}</h3>
            <ul class="list-group">
                <li 
                    v-for="dish in restaurant.dishes"
                    v-show="dish.viewable"
                    class="list-group-item"
                >
                    <div class="dish-card">
                        <div class="dish-cart__left">
                            <img :src="'http://localhost:8000/storage/' + dish.image " alt="">
                            <div class="texts">
                                <h3>{{ dish.name }}</h3>
                                <p>{{ dish.description }}</p>
                                <span>€ {{ dish.price }}</span>
                            </div>
                        </div>
                        <!-- + - button -->
                        <div class="btn-group btn-group-sm" role="group" aria-label="Default button group">
                            <button @click="count--" type="button" class="btn btn-outline-primary">-</button>
                            <button type="button" class="btn btn-outline-primary">{{ count }}</button>
                            <button @click="count++" type="button" class="btn btn-outline-primary">+</button>
                        </div>
                    </div>                
                </li>
            </ul>
            
            <router-link class="btn btn-outline-dark " :to="{name: 'home'}">
                <i class="fa-solid fa-chevron-left"></i> Indietro
            </router-link>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;
@use "../style/partials/mixins" as *;

.rest_title {
@include title-semi;
margin-bottom: 20px;
}

.dish-card {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .dish-card__left {
        display: flex;
        align-items: center;
    }

    .texts {
        margin-left: 15px;
    }
}

</style>