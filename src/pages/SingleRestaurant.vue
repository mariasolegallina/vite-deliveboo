<script>

import axios from 'axios';

import { store } from '../store.js';


export default {

    name: 'SingleRestaurant',

    data() {
        return {
            restaurant: [],
            restaurantId: '',
            errorMessage: '',
            cart: [],

            store,

            
        }
    },

    created() {
    this.loadCart();
},

    methods: {


        loadCart() {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            this.cart = storedCart;
        }
    },


    addToCart(dish) {
        let restaurantId = localStorage.getItem('restaurantId');
        let existingItem = this.cart.find(p => p.dish.id === dish.id);
        let restaurantInfo = this.restaurant;

        if (this.cart.length === 0 || this.cart[0].restaurantId === restaurantId) {
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.cart.push({ dish, quantity: 1, restaurantId, restaurantInfo });
            }
            localStorage.setItem('cart', JSON.stringify(this.cart));
        } else {
            this.errorMessage = 'Puoi ordinare da un solo ristorante per volta.';
        }
    },
    removeFromCart(dish) {
        let item = this.cart.find(item => item.dish.id === dish.id);
        if (item && item.quantity > 1) {
            item.quantity -= 1;
        } else {
            this.cart = this.cart.filter(item => item.dish.id !== dish.id);
        }
        localStorage.setItem('cart', JSON.stringify(this.cart));
    },



        getQuantity(dish) {
        let item = this.cart.find(item => item.dish.id === dish.id);
        return item ? item.quantity : 0;
    }
    },


    

    mounted() {

        console.log(this.restaurantId);

        this.restaurantId = this.$route.params.id;

        localStorage.setItem('restaurantId', this.restaurantId); 

        axios.get(this.store.baseApiUrl + '/restaurants/' + this.restaurantId).then(res => {
            this.restaurant = res.data.restaurant
        })
    }


}
</script>

<template>
    <section>
        <div class="container">
            <h3 class='rest_title'>{{ restaurant.restaurant_name }}</h3>
            <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
            <ul class="list-group mb-5">
                <li 
                    v-for="dish in restaurant.dishes"
                    v-show="dish.viewable"
                    class="list-group-item"
                >
                    <div class="dish-card">
                        <div class="dish-card__left">
                            <img :src="'http://localhost:8000/storage/' + dish.image " alt="">
                            <div class="texts">
                                <h3>{{ dish.name }}</h3>
                                <p>{{ dish.description }}</p>
                                <span>€ {{ dish.price }}</span>
                            </div>
                        </div>
                        
                        
                        <div class="dish-card__right">
                            <button type="button" class="btn btn-outline-danger " @click="removeFromCart(dish, 1)">-</button>
                            
                            <span class="px-3">{{ getQuantity(dish) }}</span>
                            
                            <button type="button" class="btn btn-outline-danger " @click="addToCart(dish, 1)">+</button>
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
        max-width: 70%;
    }

    .texts {
        margin-left: 15px;
    }
}
.dish-card__rigth {
    max-width: 30%;
}

</style>