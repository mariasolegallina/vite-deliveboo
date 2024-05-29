<script>

import { eventBus } from '../eventBus.js';
import { store } from '../store.js';


export default {
    name: 'OrderSuccess',

    data() {
        return {

            store,

            cart: JSON.parse(localStorage.getItem('cart')) || [],
            tempCart:  JSON.parse(localStorage.getItem('cart')) || [],


            total_price: JSON.parse(localStorage.getItem('totalPrice')) || [],

        }
    },


    methods: {
        dishSumPrice(item) {
            return (item.dish.price * item.quantity).toFixed(2);
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

    mounted() {
        this.removeAll()
    },

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

            <h3>Dati ristorante</h3>
            <p>
                <div>{{ tempCart[0].restaurantInfo.restaurant_name }}</div>
                <div>{{ tempCart[0].restaurantInfo.address }}</div>
                <div>+39 {{ tempCart[0].userInfo.phone_number }}</div>
            </p>

            <h3>Riepilogo ordine</h3>
            <p v-for="item in tempCart" >
                {{ item.dish.name }} x {{ item.quantity }} = € {{ dishSumPrice(item) }}
            </p>
            <p>
                Totale: € {{ total_price }}
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