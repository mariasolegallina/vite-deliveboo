<script>
import axios from 'axios';

import { store } from '../store.js';


import RestaurantItem from '../components/RestaurantItem.vue';
import AppFilter from '../components/AppFilter.vue';

export default {
    name: 'HomePage',

    components: {
      RestaurantItem,
      AppFilter,
    },

    data() {
        return {
          store,
          filteredRestaurants: [],
        }
    },

    methods: {
      handleFilter(type) {
        if (type === null) {
            this.filteredRestaurants = this.store.restaurants;  
        } else {
            this.filteredRestaurants = this.store.restaurants.filter(restaurant => 
                restaurant.types.some(t => t.name === type)
            );
        }
      }
    },

    mounted() {
        axios.get(this.store.baseApiUrl + '/restaurants').then(res => [
          this.store.restaurants = res.data.results.data,
          this.filteredRestaurants = res.data.results.data 
        ]),
        
        axios.get(this.store.baseApiUrl + '/types').then(res=>[
          this.store.types = res.data.results,
        ])
    }
}

</script>

<template>
<div class="py-5">
  
  <h1>Ristoranti:</h1>

  <AppFilter @filter="handleFilter"></AppFilter>

  <div class="row row-gap-2 py-5">
    <RestaurantItem 
      v-for="restaurant in filteredRestaurants"
      :key="restaurant.id"
      :restaurant="restaurant"
      >
    </RestaurantItem>
  </div>
</div>
</template>

<style lang="scss" scoped>
@use "../style/general.scss";

</style>
