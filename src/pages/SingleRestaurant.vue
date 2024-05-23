<script>

import axios from 'axios';

import { store } from '../store.js';

import { eventBus } from '../eventBus.js';

export default {

    name: 'SingleRestaurant',

    data() {
        return {

            store,

            // dati singolo ristorante 
            restaurant: [],
            // dati ristoratore
            user: [],

            restaurantId: '',

            // messaggio di errore da mostrare
            errorMessage: '',

            // carrello 
            cart: [],

        }
    },

    created() {
        this.loadCart();
    },

    methods: {

        // aggiorno il carrello con quello del local storage 
        loadCart() {
            const storedCart = JSON.parse(localStorage.getItem('cart'));
            if (storedCart) {
                this.cart = storedCart;
            }
        },

        // aggiunta piatto al local storage
        addToCart(dish) {

            let restaurantId = localStorage.getItem('restaurantId');
            let existingItem = this.cart.find(p => p.dish.id === dish.id);
            let restaurantInfo = this.restaurant;
            let userInfo = this.user;


            // controllo che il carrello sia vuoto o l'id del ristorante del primo piatto inserito corrisponda ai successivi 
            if (this.cart.length === 0 || this.cart[0].restaurantId === restaurantId) {

                // se il piatto è già presente incrementa la quantità
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    // altrimenti inserisci il piatto nel carrello con 'quantity = 1'
                    this.cart.push({ dish, quantity: 1, restaurantId, restaurantInfo, userInfo });
                }

                // salvo il carrello aggiornato
                localStorage.setItem('cart', JSON.stringify(this.cart));
            } else {

                // se l'id del ristorante non corrisponde al primo piatto nel carrello 
                this.errorMessage = 'Puoi ordinare da un solo ristorante per volta.';
            }


            localStorage.setItem('cart', JSON.stringify(this.cart));
            const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
            const itemCount = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
            eventBus.emit('updateCart', itemCount);
        },


        // rimuovi un piatto dal carrello e aggiornalo
        removeFromCart(dish) {

            let item = this.cart.find(item => item.dish.id === dish.id);

            // se il piatto ha una quantità superiore a 1 decrementala
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            } else {
                // rimuovi il piatto dal carrello
                this.cart = this.cart.filter(item => item.dish.id !== dish.id);
            }

            // aggiorna il local storage
            localStorage.setItem('cart', JSON.stringify(this.cart));

            localStorage.setItem('cart', JSON.stringify(this.cart));
            const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
            const itemCount = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
            eventBus.emit('updateCart', itemCount);
        },

        // ritorna la quantità di ogni piatto nel carrello
        getQuantity(dish) {
            let item = this.cart.find(item => item.dish.id === dish.id);
            return item ? item.quantity : 0;
        },

        
    },


    // ---------------------------------------------- //


    // ottenere l'id del ristorante selezionato
    mounted() {
        this.restaurantId = this.$route.params.id;
        localStorage.setItem('restaurantId', this.restaurantId);

        axios.get(this.store.baseApiUrl + '/restaurants/' + this.restaurantId).then(res => {
            this.restaurant = res.data.restaurant
            this.user = res.data.restaurant.user
        })
    }


}
</script>

<template>
    <section>
        <div class="container">

            <div class="page-top">
                <router-link class="btn btn-outline-dark " :to="{ name: 'home' }">
                    <i class="fa-solid fa-chevron-left"></i>
                </router-link>
                <div class="page-title d-flex flex-column gap-2 ">
                    <h2 class="title">{{ restaurant.restaurant_name }}</h2>
                    <p><i class="fa-solid me-2 fa-location-dot"></i> {{ restaurant.address }}</p>
                    <p><i class="fa-solid me-2 fa-phone"></i>+39  {{ user.phone_number }}</p>
                    <p><i class="fa-solid me-2 fa-envelope"></i> {{ user.email }}</p>
                </div>
            </div>

            <!-- wrong restaurant error message -->
            <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>




            <!-- dishes list -->
            <ul>
                <li v-for="dish in restaurant.dishes" v-show="dish.viewable" class="list-group-item">
                    <div class="dish-card">
                        <div v-if="dish.image" class="dish-card_img">
                            <img :src="'http://localhost:8000/storage/' + dish.image" alt="">
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

        </div>
    </section>
</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;
@use "../style/partials/mixins" as *;

.page-top {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .page-title {
        @include box1;
        padding: 10px 16px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;

        background-color: $grey1;

        .title {
            @include title2-semi;
        }

        p {
            font-size: $txt5;
            margin: 0;
        }
    }
}

.page-top .btn:hover i {
    color: $light;
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
            min-width: 40px;
            /* Assicura che l'elemento non si deformi */
            text-align: center;
        }
    }
}
</style>
