<script>
import dropin from 'braintree-web-drop-in';

export default {

    name: 'AppPayment',

    data() {
        return {
        clientToken: null,
        };
    },
    mounted() {
        this.getClientToken();
    },
    methods: {
        getClientToken() {
            axios.get('/api/braintree/token')
                .then(response => {
                this.clientToken = response.data.token;
                this.initializeDropin();
                });
        },
        initializeDropin() {
            dropin.create({
                authorization: this.clientToken,
                container: '#dropin-container'
            }, (err, instance) => {
                if (err) {
                console.error("Failed to create Drop-in instance:", err);
                return;
                }
                this.dropinInstance = instance;
                console.log("Drop-in instance created successfully");
            });
        },
        pay() {
            if (!this.dropinInstance) {
                console.error("Drop-in instance not ready.");
                return;
            }
            this.dropinInstance.requestPaymentMethod((err, payload) => {
                if (err) {
                console.error(err);
                return;
                }

                axios.post('/api/braintree/checkout', {
                payment_method_nonce: payload.nonce,
                amount: this.$store.getters.totalPrice
                })
                .then(response => {
                if (response.data.success) {
                    alert('Pagamento effettuato con successo!');
                } else {
                    alert('Errore nel pagamento: ' + response.data.message);
                }
                });
            });
        }
    }
}
</script>

<template>
    <div>
        <div id="dropin-container"></div>
        <button @click="pay">Paga</button>
    </div>
</template>
  