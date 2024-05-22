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

    methods: {
      

        addToCart(dish, quantity) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let restaurantId = localStorage.getItem('restaurantId');

            if (cart.length === 0 || cart[0].restaurantId === restaurantId) {
                let existingItem = cart.find(p => p.dish.id === dish.id);
                if (existingItem) {
                    existingItem.quantity += quantity;
                } else {
                    cart.push({ dish, quantity, restaurantId });
                }
                localStorage.setItem('cart', JSON.stringify(cart));
            } else {
                alert(`Puoi ordinare da un solo ristorante per volta.`);
            }
        },

        removeFromCart(dish, quantity) {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            if (cart.length > 0) {
                let existingItem = cart.find(item => item.dish.id === dish.id);
                if (existingItem && existingItem.quantity > 1) {
                    existingItem.quantity -= quantity;
                } else {
                    cart = cart.filter(item => item.dish.id !== dish.id);
                }
                localStorage.setItem('cart', JSON.stringify(cart));
            }
        }
    },

    created() {
        const storedCart = JSON.parse(localStorage.getItem('cart'));
        if (storedCart) {
            this.cartItems = storedCart;
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
                        
                        
                        <div>
                            <button type="button" class="btn btn-outline-danger " @click="addToCart(dish, 1)">+</button>
                            
                            <button type="button" class="btn btn-outline-danger " @click="removeFromCart(dish, 1)">-</button>
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