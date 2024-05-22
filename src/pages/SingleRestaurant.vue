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
            <p>{{ restaurant.address }}</p>

            <!-- wrong restaurant error message -->
            <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>

            <!-- dishes list -->
            <ul>
                <li
                    v-for="dish in restaurant.dishes"
                    v-show="dish.viewable"
                    class="list-group-item"
                >
                    <div class="dish-card">
                        <div class="dish-card_img">
                            <img :src="'http://localhost:8000/storage/' + dish.image " alt="">
                        </div>
                        <div class="dish-card_text">
                            <div class="dish-info">
                                <h3>{{ dish.name }}</h3>
                                <p>{{ dish.description }}</p>
                                <span>€ {{ dish.price }}</span>
                            </div>

                            <!-- add to cart -->
                            <div class="add-to-cart">
                                <button type="button" class="btn-left" @click="removeFromCart(dish, 1)">-</button>                               
                                <span class="number">{{ getQuantity(dish) }}</span>                               
                                <button type="button" class="btn-right" @click="addToCart(dish, 1)">+</button>
                            </div>
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

ul {
    padding: 0;

    li {
        margin-bottom: 20px
    }
}

.dish-card {
    @include box1;

    display: flex;
    align-items: stretch;
    width: 100%;

    .dish-card_img {
        width: 40%;

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .dish-card_text {
        flex: 1;
        padding: 20px;

        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .dish-info {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 14px;

            p {
                margin: 0 0 6px 0;
                padding: 0;

                .title {
                    font-weight: 600;
                }
            }
        }

        .add-to-cart {
            display: flex;
            align-items: center;
        }

        button {
        background-color: white;
        border: 1px solid $primary1;
        padding: 10px;
        cursor: pointer;
        transition: background-color 0.3s;
        outline: none;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            background-color: $primary1;
            color: white;
        }

        &:first-of-type {
            // border-right: none;
            border-top-left-radius: 0.375rem;
            border-bottom-left-radius: 0.375rem;
        }

        &:last-of-type {
            // border-left: none;
            border-top-right-radius: 0.375rem;
            border-bottom-right-radius: 0.375rem;
        }
        }


        .number {
        padding: 10px;
        border: 1px solid $primary1;
        border-left: none;
        border-right: none;
        min-width: 40px; /* Assicura che l'elemento non si deformi */
        text-align: center;
        }
    }
}

</style>