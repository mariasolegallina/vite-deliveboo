<script>

import { store } from '../store.js';

export default {
    name: 'Basket',

    data() {
        return {
            store
        };
    },

    computed: {
        totalPrice() {
            return this.basket.reduce((acc, item) => acc + item.price * item.quantity, 0) + this.shippingCost;
        }
    },
}
</script>

<template>
    <section>



        <div class="container">
            <div class="basket">
            <h2>Il tuo carrello</h2>
            
    
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