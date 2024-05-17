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
      handleFilter(activeTypes) {
        if (activeTypes.length == 0 ) {
            this.filteredRestaurants = this.store.restaurants;  
        } else {
            this.filteredRestaurants = this.store.restaurants.filter(restaurant => 
                restaurant.types.some(t => activeTypes.includes (t.name))
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
  
  <h2 class="mb-4">Seleziona una o più tipologie</h2>
  <AppFilter @filter="handleFilter"></AppFilter>
  
  <h2>Ristoranti:</h2>
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
