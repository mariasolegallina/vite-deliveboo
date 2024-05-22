<script>

import { store } from '../store.js';

export default {
    name: 'Basket',

    data() {
        return {
            store,

            // recupero il cart dal local storage
            cart: JSON.parse(localStorage.getItem('cart')) || [],
        };
    },

    computed: {

        // calcolo del totale di tutti i piatti
        totalPrice() {
            return this.cart.reduce((total, item) => {
                return total + (item.dish.price * item.quantity);
            }, 0).toFixed(2);
        }
    },

    methods: {
        // calcolo dei singoli piatti per la quantità selezionata 
        dishSumPrice(item) {
            return (item.dish.price * item.quantity).toFixed(2);
        },

        // ---------------------------------------------- //

        // aggiunta quantità del piatto al local storage 
        addQuantity(item) {
            item.quantity++;
            this.updateLocalStorage();
        },
        // se il piatto risulta presente lo rimuovo o diminuisco la quantità
        removeQuantity(item) {
            if (item.quantity > 1) {
                item.quantity--

                // aggiorno lo storage
                this.updateLocalStorage();
            }
        },


        // rimozione del piatto con tutte le quantità dal carrello
        removeDish(item) {
            this.cart = this.cart.filter(cartItem => cartItem !== item);

            // aggiorno lo storage
            this.updateLocalStorage();
        },

        // rimozione di tutti i piatti dal carrello
        removeAll() {
            // svuoto il carrello 
            this.cart = [];
            // aggiorno lo storage
            this.updateLocalStorage();
        },

        // ---------------------------------------------- //

        // funzione per aggiornare costantemente il carrello
        updateLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },

    },

}
</script>

<template>
<section>
    <div class="container">

        <h2 class="mb-4">Il tuo ordine</h2>

        <!-- se il carrello contiene degli articoli li mostro -->
        <div v-if="cart.length > 0" class="basket mb-5 p-3">

            <!-- dati ristorante -->
            <div class="mb-4">
                <h3>{{ cart[0].restaurantInfo.restaurant_name }}</h3>
    
                <p>{{ cart[0].restaurantInfo.address }}</p>
            </div>

            <div class="mb-5">

                <!-- articoli  -->
                <div v-for="item in cart" :key="item.dish.id" class="mb-4">
                    <div class="d-flex gap-3 align-items-center justify-content-between">

                        <!-- dati articoli -->
                        <div class="mb-3 fw-semibold">
                            {{ item.dish.name }} x {{ item.quantity }}
                        </div>
                        <div class="mb-3">
                            € {{ dishSumPrice(item) }}
                        </div>

                    </div>

                    <div class="mb-4">

                        <!-- rimozione quantità articolo -->
                        <button type="button" class="btn btn-outline-danger " @click="removeQuantity(item)">-</button>
                        
                        <span class="px-3">
                            {{ item.quantity }}
                        </span>

                        <!-- aggiunta articolo -->
                        <button type="button" class="btn btn-outline-danger " @click="addQuantity(item)">+</button>

                        <!-- rimozione tutti gli articoli di quel tipo -->
                        <button type="button" class="btn btn-outline-danger ms-3" @click="removeDish(item)">Rimuovi piatto</button>

                    </div>

                    <hr>
                </div>

                <div class="text-end fs-4">

                    <!-- totale carrello -->
                    <span>Totale:</span> <span class="fw-bold"> € {{ totalPrice }}</span>
                </div>

                
            </div>
            <!-- rimozione di tutti gli articoli dal carrello -->
            <div class="d-flex justify-content-end">
                <button type="button" class="btn btn-outline-danger ms-3" data-bs-toggle="modal" data-bs-target="#deleteModal">Svuota carrello</button>
            </div>

            <!-- Modal per la rimozione -->
            <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">

                        <div class="modal-body">
                            Sei sicuro di voler svuotare il carrello? tutti i dati inseriti andranno persi
                        </div>

                        <div class="modal-footer">
                            <!-- annulla azione -->
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                            <!-- conferma azione -->
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="removeAll()">Svuota carrello</button>
                        </div>
                    </div>
                </div>
            </div>


            
        </div>

        <!-- se nessun articolo risulta presente nel carrello -->
        <div v-else class="my-5 text-center ">
            Il tuo carrello è vuoto. <br>
            Torna indietro per vedere i nostri ristoranti.
        </div>


        <!-- torna ai ristoranti -->
        <router-link class="btn btn-outline-dark " :to="{ name: 'home' }">
            <i class="fa-solid fa-chevron-left"></i> Indietro
        </router-link>

    </div>
</section>

</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;
@use "../style/partials/mixins" as *;

.basket {
    @include box1;

}

.basket h2 {
    margin-bottom: 10px;
}

.basket ul {
    list-style-type: none;
    padding: 0;
}

.basket li {
    margin-bottom: 5px;
}

</style>