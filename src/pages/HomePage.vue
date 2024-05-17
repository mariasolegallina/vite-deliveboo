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
        }
    },

    mounted() {
        axios.get(this.store.baseApiUrl + '/restaurants').then(res => [
          this.store.restaurants = res.data.results.data,
        ]),
        
        axios.get(this.store.baseApiUrl + '/types').then(res=>[
          this.store.types = res.data.results,
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
      v-for="restaurant in store.restaurants"
      :restaurant="restaurant"
      >

    </RestaurantItem>
  </div>
</div>
</template>

<style lang="scss">
@use "/src/style/general.scss";
</style>
