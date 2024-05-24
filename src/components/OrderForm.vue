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
                total_price: 20,

                dishes: [],
            },

            cart: JSON.parse(localStorage.getItem('cart')) || [],
        
            

        }
    },

    methods: {
        sendOrderRequest() {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            cart.forEach(item => {
                let dish = {
                    dish_id: item.dish.id,
                    quantity: item.quantity
                }
                this.formData.dishes.push(dish);       
            });



            axios.post(this.store.baseApiUrl + '/new-order', this.formData).then(res => {
                console.log('Risposta API', res)
            });

            localStorage.clear('cart');
        },

    }

}
</script>

<template>

<form @submit.prevent="sendOrderRequest">

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


    <button type="submit" class="btn btn-primary mb-5">Invia</button>


</form>

</template>


<style lang="scss">

</style>