<script>

import RestaurantItem from '../components/RestaurantItem.vue';
import AppFilter from '../components/AppFilter.vue';
import axios from 'axios';

export default {
    name: 'HomePage',

    components: {
      RestaurantItem,
      AppFilter,
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
    }
}

</script>

<template>
<div class="container">
  <h1>Ciao mondo</h1>
  <button type="button" class="btn btn-primary">Primary</button>

  <AppFilter></AppFilter>

  <div>
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
