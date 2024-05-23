<script>

import { eventBus } from '../eventBus.js';

export default {
    name: 'Basket',

    data() {
        return {
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
            this.emitCartUpdate();
        },
        // se il piatto risulta presente lo rimuovo o diminuisco la quantità
        removeQuantity(item) {
            if (item.quantity > 1) {
                item.quantity--

                // aggiorno lo storage
                this.updateLocalStorage();

                this.emitCartUpdate();
            }
        },


        // rimozione del piatto con tutte le quantità dal carrello
        removeDish(item) {
            this.cart = this.cart.filter(cartItem => cartItem !== item);

            // aggiorno lo storage
            this.updateLocalStorage();

            this.emitCartUpdate();
        },

        // rimozione di tutti i piatti dal carrello
        removeAll() {
            // svuoto il carrello 
            this.cart = [];
            // aggiorno lo storage
            this.updateLocalStorage();
            this.emitCartUpdate();

        },

        // ---------------------------------------------- //

        // funzione per aggiornare costantemente il carrello
        updateLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },

        emitCartUpdate() {
            const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
            const itemCount = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
            eventBus.emit('updateCart', itemCount);
        }
    },

}
</script>

<template>
    <section>
        <div class="container">

            <!-- titolo e bottone home -->
            <div class="page-top">
                <router-link class="btn btn-outline-dark " :to="{ name: 'home' }">
                    <i class="fa-solid fa-chevron-left"></i>
                </router-link>
                <h2 class="title">Il mio ordine</h2>
            </div>

            <!-- se il carrello contiene degli articoli li mostro -->
            <div v-if="cart.length > 0" class="my-order">

                <div class="sidebar-r col-3">
                    <!-- totale carrello -->
                    <div class="text-end fs-4">
                        <span>Totale:</span> <span class="fw-bold"> € {{ totalPrice }}</span>
                    </div>

                    <!-- rimozione di tutti gli articoli dal carrello -->
                    <button type="button" class="btn btn-success">Concludi l'ordine</button>

                    <!-- rimozione di tutti gli articoli dal carrello -->
                    <button type="button" class="btn btn-outline-danger" data-bs-toggle="modal"
                        data-bs-target="#deleteModal">Svuota il carrello</button>

                    <!-- Modal per la rimozione -->
                    <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel"
                        aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">

                                <div class="modal-body">
                                    Vuoi davvero svuotare il carrello? Tutti i dati inseriti andranno persi
                                </div>

                                <div class="modal-footer">
                                    <!-- annulla azione -->
                                    <button type="button" class="btn btn-secondary"
                                        data-bs-dismiss="modal">Annulla</button>
                                    <!-- conferma azione -->
                                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal"
                                        @click="removeAll()">Prosegui</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- dati ristorante -->
                    <div class="restaurant d-flex flex-column gap-2 ">
                        <h2 class="rest-name">{{ cart[0].restaurantInfo.restaurant_name }}</h2>
                        <p><i class="fa-solid me-2 fa-location-dot"></i> {{ cart[0].restaurantInfo.address }}</p>
                        <p><i class="fa-solid me-2 fa-phone"></i> +39 {{ cart[0].userInfo.phone_number }}</p>
                        <p><i class="fa-solid me-2 fa-envelope"></i> {{ cart[0].userInfo.email }}</p>
                    </div>
                </div>

                <!-- dettagli ordine -->
                <div class="order-wrap flex-grow-1 ">

                    <div v-for="item in cart" :key="item.dish.id" class="order mb-3 ">
                        <!-- dati articoli -->
                        <div class="order__dishes">
                            <div class="dish-name">{{ item.dish.name }} x {{ item.quantity }}</div>
                            <div class="dish-price">€ {{ dishSumPrice(item) }}</div>
                        </div>

                        <div class="buttons">
                            <!-- modifica quantità -->
                            <div class="mod-quantity">
                                <button type="button" class="btn-left" @click="removeQuantity(item)">-</button>
                                <span class="number">{{ item.quantity }}</span>
                                <button type="button" class="btn-right" @click="addQuantity(item)">+</button>
                            </div>

                            <!-- rimozione tutti gli articoli di quel tipo -->
                            <button type="button" class="btn btn-outline-danger btn-delete" @click="removeDish(item)"><i
                                    class="fa-solid fa-trash"></i></button>
                        </div>
                    </div>
                </div>

            </div>

            <!-- se nessun articolo risulta presente nel carrello -->
            <div v-else class="my-5 text-center ">
                Il tuo carrello è vuoto. <br>
                Torna indietro per vedere i nostri ristoranti.
            </div>

        </div>
    </section>

</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;
@use "../style/partials/mixins" as *;

.page-top {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    margin-bottom: 20px;

    .title {
        @include title-semi;
    }

}

.page-top .btn:hover i {
    color: $light;
}

.my-order {

    display: flex;
    flex-direction: row-reverse;
    align-items: flex-start;
    gap: 20px;

    .sidebar-r {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .restaurant {
        @include box1;
        padding: 10px 16px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;

        background-color: $grey1;

        .rest-name {
            @include title2-semi;
        }

        p {
            font-size: $txt5;
            margin: 0;
        }
    }

    .order {
        @include box1;
        padding: 20px;

        display: flex;
        flex: 1;

        justify-content: space-between;
        align-items: flex-start;

        .dish-name {
            @include title2-semi;
        }

        .buttons {
            display: flex;
            gap: 20px;
        }

    }

}

.buttons {
    .mod-quantity {
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
        text-align: center;
    }

    .btn-delete:hover i {
        color: $light;
    }
}
</style>