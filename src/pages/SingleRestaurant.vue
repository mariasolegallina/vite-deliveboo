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
    <div class="container py-4 ">
        <h3 class="mb-4">{{ restaurant.restaurant_name }}</h3>
        <ul class="list-group">
            <li 
           v-for="dish in restaurant.dishes"
           v-show="dish.viewable"
            class="list-group-item"
            >
            <div class="d-flex justify-content-between ">
                <h4>
                    {{ dish.name }}
                </h4>

                <span>
                   € {{ dish.price }}
                </span>
            </div>
            <p>{{ dish.description }}</p>
            <img :src="'http://localhost:8000/storage/' + dish.image " alt="">
            
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>


</style>