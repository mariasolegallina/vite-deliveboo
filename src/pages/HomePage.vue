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
<main>
    <section>
        <div class="container">

            <!-- sidebar -->
            <div class="side-bar">
              <h2>Filtra</h2>

              <!-- filters -->
              <AppFilter @filter="handleFilter"></AppFilter>
            </div>

            <!-- main-content -->
            <div class="main-content">
              <h1>Ristoranti:</h1>

              <div class="row row-gap-2 py-5">
                <RestaurantItem 
                  v-for="restaurant in filteredRestaurants"
                  :key="restaurant.id"
                  :restaurant="restaurant">
                </RestaurantItem>
              </div>
            </div>
        </div>
    </section>
</main>
</template>

<style lang="scss" scoped>
// @use "../style/general.scss";
@use "../style/partials/variables" as *;
@use "../style/partials/mixins" as *;

main {
    background-color: $grey1;
};

.container {
  display: flex;
  gap: 24px;

  .side-bar {
    background-color: $grey2;
    padding: 24px;
    // border-radius: 6px;

    h2 {
      @include title2-semi;
      color: $grey8;
      margin-bottom: 14px;
    }
  }

  .main-content {
    flex-grow: 1;
  }

  h1 {
    @include header-semi-prim;
  }
}

</style>
