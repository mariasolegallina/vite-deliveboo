<script>
export default {
    name: 'Basket',

    data() {
        return {
            basket: [
                { name: 'Piatto 1', price: 10, quantity: 2 },
                { name: 'Piatto 2', price: 15, quantity: 1 },
            ],
            shippingCost: 5,
            restaurant: {
                restaurant_name: "Ristorante Esempio",
                address: "Via Esempio 123",
                types: [
                    { name: "Italiano" },
                    { name: "Pizza" }
                ]
            }
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
        <div class="basket">
            <h2>Il tuo carrello</h2>
            <ul>
                <li v-for="item in basket" :key="item.name">
                    {{ item.name }} - {{ item.price }}€ x {{ item.quantity }} = {{ item.price * item.quantity }}€
                </li>
            </ul>
            <p>Costo di spedizione: {{ shippingCost }}€</p>
            <p>Prezzo totale: {{ totalPrice }}€</p>
        </div>

        <div class="rest-card hover">
            <div class="rest-card__top">
                <h2>{{ restaurant.restaurant_name }}</h2>
                <p>{{ restaurant.address }}</p>
            </div>
            <div class="rest-card__type">
                <span 
                v-for="currentType in restaurant.types"
                class="type"
                >
                    {{ currentType.name }}
                </span>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.basket {
    margin: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
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