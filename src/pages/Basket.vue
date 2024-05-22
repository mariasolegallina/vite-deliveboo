<script>

import { store } from '../store.js';

export default {
    name: 'Basket',

    data() {
        return {
            store,

            cart: JSON.parse(localStorage.getItem('cart')) || [],
        };
    },

    computed: {
        totalPrice() {
            return this.cart.reduce((total, item) => {
                return total + (item.dish.price * item.quantity);
            }, 0).toFixed(2); // Formatta il numero con due cifre decimali
        }
    },

    methods: {
        dishSumPrice(item) {
            return (item.dish.price * item.quantity).toFixed(2);
        },

        addQuantity(item) {
            item.quantity++;
            this.updateLocalStorage();
        },

        removeQuantity(item) {
            if(item.quantity > 1) {
                item.quantity--
                this.updateLocalStorage();
            }
        },

        
        removeDish (item) {
            this.cart = this.cart.filter(cartItem => cartItem !== item);
            this.updateLocalStorage();        
        },


        removeAll() {
            this.cart = [];
            this.updateLocalStorage();

        },

        
        
        updateLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },

    }


}
</script>

<template>
    <section>



        <div class="container">
            <div class="basket mb-5 p-3">
            <h2>Il tuo carrello</h2>

                
            <div v-for="item in cart" :key="item.dish.id" class="mb-3">










                <div class="mb-3">
                    {{ item.dish.name }} x {{ item.quantity }}
                </div>
                <div class="mb-3">
                    € {{ dishSumPrice(item)}}
                </div>
                <div >
                    <button type="button" class="btn btn-outline-danger " @click="removeQuantity(item)">-</button>                  
                    <span class="px-3">
                        {{ item.quantity }}
                    </span>
                    <button type="button" class="btn btn-outline-danger " @click="addQuantity(item)">+</button>
                    <button type="button" class="btn btn-outline-danger " @click="removeDish(item)">Rimuovi piatto</button>
                </div>
            </div>




            <div class="text-end ">Totale: € {{ totalPrice }}</div> 
        </div>

            <button type="button" class="btn btn-outline-danger " @click="removeAll()">Svuota carrello</button>

            <router-link class="btn btn-outline-dark " :to="{name: 'home'}">
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

.basket p {
    margin-top: 10px;
    font-weight: bold;
}
</style>