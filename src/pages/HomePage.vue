<script>

import RestaurantItem from '../components/RestaurantItem.vue';
import axios from 'axios';

export default {
    name: 'HomePage',

    components: {
      RestaurantItem,
    },

    data() {
        return {
            restaurants: [],
            types: [],

            baseApiUrl: 'http://127.0.0.1:8000/api',
        }
    },

    mounted() {
        axios.get(this.baseApiUrl + '/restaurants').then(res => [
        this.restaurants = res.data.results.data,
        console.log(res.data)
        ]),

        axios.get(this.baseApiUrl + '/types').then(res=>[
        this.types = res.data.results,
        console.log(res.data.results)
        ])
    },
}

</script>

<template>
<div class="container py-5">
  
  <h1>Ristoranti:</h1>


  <div class="row row-gap-2 py-5">
    <RestaurantItem 
      v-for="restaurant in restaurants"
      :restaurant="restaurant"
      >

    </RestaurantItem>
  </div>
</div>
</template>

<style lang="scss">
@use "/src/style/general.scss";
</style>
