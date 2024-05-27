<script>

export default {
    name: 'OrderSuccess',

    data() {
        return {
            
        }
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