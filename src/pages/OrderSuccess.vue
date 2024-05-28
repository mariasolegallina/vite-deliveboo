<script>

import { eventBus } from '../eventBus.js';



export default {
    name: 'OrderSuccess',

    data() {
        return {

            cart: JSON.parse(localStorage.getItem('cart')) || [],

        }
    },

    methods: {

        updateLocalStorage() {
            localStorage.setItem('cart', JSON.stringify(this.cart));
        },

        emitCartUpdate() {
            const updatedCart = JSON.parse(localStorage.getItem('cart')) || [];
            const itemCount = updatedCart.reduce((acc, item) => acc + item.quantity, 0);
            eventBus.emit('updateCart', itemCount);
        }

    },

    mounted() {

        // svuoto il carrello 
        this.cart = [];
        // aggiorno lo storage
        this.updateLocalStorage();
        this.emitCartUpdate();

    }

}

</script>

<template>
    <section>
        <div class="container">

            <h2>
                Ordine effettuato con successo!
            </h2>
            <p>
                Controlla la tua casella di posta per avere tutti i dettagli.
                Intanto ecco un riepilogo!
            </p>

            <p>

                {{ cart[0].restaurantInfo.restaurant_name }}
            </p>

            <p>

                {{ cart[0].restaurantInfo.address }}
            </p>

            <p>

                {{ cart[0].restaurantInfo.user.phone_number }}
            </p>



            <p>

                {{ cart[0].dish.name }} x {{ cart[0].dish.price }} x {{ cart[0].quantity }}
            </p>

            <router-link class="btn btn-outline-dark " :to="{ name: 'home' }">
                <i class="fa-solid fa-chevron-left"></i> Torna alla home
            </router-link>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;
@use "../style/partials/mixins" as *;
</style>