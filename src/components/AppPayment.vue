<script>
import dropin from 'braintree-web-drop-in';
import axios from 'axios';

export default {
    name: 'AppPayment',
    data() {
        return {
            clientToken: null,
            dropinInstance: null,
        };
    },
    mounted() {
        this.getClientToken();
    },
    methods: {
        async getClientToken() {
            try {
                const response = await axios.get('/api/braintree/token');
                this.clientToken = response.data.clientToken;
                this.initializeDropin();
            } catch (error) {
                console.error('Errore nel recuperare il client token:', error);
            }
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
                    amount: this.$store.state.totalPrice // Assicurati che totalPrice sia corretto
                })
                .then(response => {
                    if (response.data.success) {
                        alert('Pagamento effettuato con successo!');
                    } else {
                        alert('Errore nel pagamento: ' + response.data.message);
                    }
                })
                .catch(error => {
                    console.error('Errore nel processo di pagamento:', error);
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
  