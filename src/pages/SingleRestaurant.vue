<script>

import axios from 'axios';

import { store } from '../store.js';


export default {

    name: 'SingleRestaurant',

    data() {
        return {

            store,

            // dati singolo ristorante 
            restaurant: [],
            
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

            
            // controllo che il carrello sia vuoto o l'id del ristorante del primo piatto inserito corrisponda ai successivi 
            if (this.cart.length === 0 || this.cart[0].restaurantId === restaurantId) {
                
                // se il piatto è già presente incrementa la quantità
                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                // altrimenti inserisci il piatto nel carrello con 'quantity = 1'
                    this.cart.push({ dish, quantity: 1, restaurantId, restaurantInfo });
                }

                // salvo il carrello aggiornato
                localStorage.setItem('cart', JSON.stringify(this.cart));
            } else {

                // se l'id del ristorante non corrisponde al primo piatto nel carrello 
                this.errorMessage = 'Puoi ordinare da un solo ristorante per volta.';
            
            }
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
        },

        // ritorna la quantità di ogni piatto nel carrello
        getQuantity(dish) {
            let item = this.cart.find(item => item.dish.id === dish.id);
            return item ? item.quantity : 0;
        }
    },


    // ---------------------------------------------- //
    

    // ottenere l'id del ristorante selezionato
    mounted() {
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

            <!-- info ristorante -->
            <h3 class='rest_title'>{{ restaurant.restaurant_name }}</h3>
            <p>{{ restaurant.address }}</p>
            
            <!-- messaggio di errore del carrello -->
            <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
            
            
            <ul class="list-group mb-5">
                <!-- lista piatti ristorante -->
                <li 
                    v-for="dish in restaurant.dishes"
                    v-show="dish.viewable"
                    class="list-group-item"
                >
                    <div class="dish-card">
                        <div class="dish-card__left">

                            <!-- info piatti -->
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
            
            <!-- link alla lista ristoranti -->
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