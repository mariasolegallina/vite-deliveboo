<script>

import axios from 'axios';

import { store } from '../store.js';


export default {

    name: 'SingleRestaurant',

    data() {
        return {
            restaurant: null,
            restaurantId: null,

            store,
        }
    },

    mounted() {
        this.restaurantId = this.$route.params.id;

        axios.get(this.store.baseApiUrl + '/restaurants/' + this.restaurantId).then(res => {
            console.log(res);
        })
    }


}
</script>

<template>

</template>

<style lang="scss" scoped>


</style>