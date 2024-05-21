<script>
export default {
    name: 'Basket',

    data() {
        return {
            dish_name: localStorage.getItem("dish_name"),
            dish_price: localStorage.getItem("dish_price"),
            dish_qty: localStorage.getItem("dish_qty")
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
            
                nome: {{ dish_name }}
                prezzo: {{ dish_price }}
                quantità: {{ dish_qty }}
            
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