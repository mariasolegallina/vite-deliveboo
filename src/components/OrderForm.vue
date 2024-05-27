<script>

import axios from 'axios'
import { store } from '../store.js'

export default {
    name: 'OrderForm',

    data() {
        return {

            store,

            formData: {
                customer_name: '',
                customer_lastname: '',
                customer_address: '',
                customer_email: '',
                customer_phone: '',
                total_price: '',

                dishes: [],
                restaurant_id: '',
                restaurant_name: '',
            },

            cart: JSON.parse(localStorage.getItem('cart')) || [],

        }
    },




    mounted() {
        var submitButton = document.querySelector("#submit-button");

        braintree.dropin.create(
        {
            authorization: "sandbox_bn3krc5m_5brrmwtybfkxy674",
            selector: "#dropin-container",
        },
        (err, dropinInstance) => {
            if (err) {
            console.error(err);
            return;
            }

            
            submitButton.addEventListener("click", () => {
            dropinInstance.requestPaymentMethod((err, payload) => {
                console.log("log payload and err", payload, err);
                if (err === null) {
                console.log("funziona");

                let cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.forEach(item => {
                    let dish = {
                        dish_id: item.dish.id,
                        dish_name: item.dish.name,
                        quantity: item.quantity
                    }
                    this.formData.dishes.push(dish);    
                    
                    this.formData.total_price = localStorage.getItem('totalPrice');
                    this.formData.restaurant_id = localStorage.getItem('restaurantId');
                });

                axios.post(this.store.baseApiUrl + '/new-order', this.formData).then(res => {
                    console.log('Risposta API', res)
                    

                    window.location.replace(this.store.baseUrl + '/conferma-ordine');

                });

                localStorage.clear('cart');


                }
            });
            });
        }
    );
    
    }


}
</script>

<template>

<form @submit.prevent="sendOrderRequest" action="">

    <div class="mb-3">
        <label for="customer_name" class="form-label">Nome</label>
        <input type="text" class="form-control" id="customer_name" name="customer_name" v-model="formData.customer_name" required>
    </div>

    <div class="mb-3">
        <label for="customer_lastname" class="form-label">Cognome</label>
        <input type="text" class="form-control" id="customer_lastname" name="customer_lastname" v-model="formData.customer_lastname" required>
    </div>

    <div class="mb-3">
        <label for="customer_address" class="form-label">Indirizzo</label>
        <input type="text" class="form-control" id="customer_address" name="customer_address" v-model="formData.customer_address" required>
    </div>



    <div class="mb-3">
        <label for="customer_email" class="form-label">Indirizzo email</label>
        <input type="email" class="form-control" id="customer_email" name="customer_email" aria-describedby="emailHelp" v-model="formData.customer_email" required>
        <div id="emailHelp" class="form-text">Non condivideremo la tua mail con terzi.</div>
    </div>




    <div class="mb-3">
        <label for="customer_phone" class="form-label">Numero di telefono</label>
        <input type="number" class="form-control" id="customer_phone" name="customer_phone" v-model="formData.customer_phone" required>
    </div>



    <div id="dropin-wrapper">
        <div id="checkout-message"></div>
        <div id="dropin-container"></div>
        <button id="submit-button" type="submit" class="btn btn-primary mb-5">Invia</button>
    </div>




</form>

</template>


<style lang="scss">

</style>