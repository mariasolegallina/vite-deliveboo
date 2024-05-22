<script>

import { store } from '../store.js';

export default {
    name: 'Basket',

    data() {
        return {
            store,

            cart: JSON.parse(localStorage.getItem('cart')),
        };
    },

    methods: {
        dishSumPrice(item) {
            return (item.dish.price * item.quantity).toFixed(2);
        },

        addQuantity(item) {
            item.quantity++;
        },

        removeQuantity(item) {
            if(item.quantity > 1) {
                item.quantity--
            }
        }
    }


}
</script>

<template>
    <section>



        <div class="container">
            <div class="basket">
            <h2>Il tuo carrello</h2>

                
            <div v-for="item in cart">
                <div>
                    {{ item.dish.name }}

                    <span>x {{ item.quantity }}</span>
                </div>
                <div>
                    € {{ dishSumPrice(item)}}
                </div>

                <div>
                    <button type="button" class="btn btn-outline-danger " @click="addQuantity(item)">+</button>
                    
                    <button type="button" class="btn btn-outline-danger " @click="removeQuantity(item)">-</button>
                </div>
            </div>
    
            </div>
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