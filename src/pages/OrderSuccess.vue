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
        },

        redirect() {
            if(this.cart.length == 0) {
                window.location.replace(this.store.baseUrl)
            }
        }
    },

    mounted() {
        
        this.removeAll()
    },

    beforeMount() {
        this.redirect()
    }

}

</script>

<template>
    <section>
        <div class="container">

            <div class="order-success">
                <h2>
                    Ordine effettuato con successo!
                </h2>
                <p>
                    Controlla la tua casella di posta per avere tutti i dettagli.
                </p>   
            </div>
            
            <div class="details">
                <!-- order details -->
                <div class="order-details">
                    <h3>Riepilogo ordine</h3>
                    <p v-for="item in tempCart" >
                        {{ item.dish.name }} x {{ item.quantity }} = € {{ dishSumPrice(item) }}
                    </p>
                    <hr>
                    <p class="fw-semibold">
                        Totale: € {{ total_price }}
                    </p>
                </div>

                <!-- restaurant info -->
                <div class="rest-info col-md-3">
                    <h2 class="title">{{ tempCart[0].restaurantInfo.restaurant_name }}</h2>
                    <p>
                        <span>
                            <i class="fa-solid me-2 fa-location-dot"></i>{{ tempCart[0].restaurantInfo.address }}  
                        </span>
                        <span>
                            <i class="fa-solid me-2 fa-phone"></i>+39 {{ tempCart[0].userInfo.phone_number }}  
                        </span>
                    </p>
                </div>
            </div>

            <router-link class="btn btn-outline-dark " :to="{ name: 'home' }">
                <i class="fa-solid fa-chevron-left"></i> Torna alla home
            </router-link>
        </div>
    </section>
</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;
@use "../style/partials/mixins" as *;

.container {
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: flex-start;

    .order-success {
        display: flex;
        flex-direction: column;
        gap: 6px;

        h2 {
            @include title2-semi;

            margin: 0;
            padding: 0;
        }

        p {
            @include title3;
            margin: 0;
            padding: 0;
        }
    }

}

.details {

    display: flex;
    gap: 24px;
    
    @media (max-width: 992px) {
        flex-direction: column;
    }

    // order details
    .order-details {
        @include box1;
        padding: 24px;
        flex-grow: 1;

        display: flex;
        flex-direction: column;
        gap: 6px;

        h2 {
            @include title2-semi;

            margin: 0 0 4px;
            padding: 0;
        }

        p {
            margin: 0;
            padding: 0;
            @include title3;
        }

    }

    // restaurant info
    .rest-info {
        @include box1;
        padding: 24px;

        display: flex;
        flex-direction: column;
        gap: 10px;
        background-color: $grey1;

        .title {
            @include title3-semi;
            margin: 0;
            padding: 0;

        }

        p {
            font-size: $txt5;
            margin: 0;

            display: flex;
            flex-direction: column;
            gap: 8px;

            i {
                margin: 0 2px 0px;

                &:first-of-type {
                    margin-left: 0;
                }
            }
        }
    }
}
</style>