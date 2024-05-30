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

          // array risotranti filtrati
          filteredRestaurants: [],
        }
    },

    methods: {

      // gestione filtro 
      handleFilter(activeTypes) {

        // se non sono stati selezionati filtri, aggiorna l'array 'filteredRestaurants' per visualizzare tutti i ristoranti
        if (activeTypes.length == 0 ) {
            this.filteredRestaurants = this.store.restaurants;  

        } else {

          //  ottieni i ristoranti
          axios.get(this.store.baseApiUrl + '/restaurants').then(res => [
            this.store.restaurants = res.data.results,
          ]),

        // filtra i ristoranti ottenuti in base ai filtri attivi
          this.filteredRestaurants = this.store.restaurants.filter(restaurant => 
            activeTypes.every(type => restaurant.types.map (t => t.name).includes(type))
          );

        }
      }


    },


    // chiamate axios
    mounted() {
        axios.get(this.store.baseApiUrl + '/restaurants').then(res => [

        // tutti i ristoranti
          this.store.restaurants = res.data.results,
        // aggiorna i ristoranti da filtrare 
          this.filteredRestaurants = res.data.results
        ]),
        
        // ---------------------------------------------- //

        axios.get(this.store.baseApiUrl + '/types').then(res=>[

        // tutte le tipologie 
          this.store.types = res.data.results,
        ])
    }

}

</script>

<template>
  <section>
      <div class="container">

        <!-- ---------------------------------------------- -->

          <div class="side-bar">
            
            <!-- filters -->
            <AppFilter @filter="handleFilter"></AppFilter>

          </div>

        <!-- ---------------------------------------------- -->

          <div class="main-content">

            <!-- restaurants list -->
            <div class="row" v-if="filteredRestaurants.length > 0">
              <div
                class="col-lg-4 col-md-6 col-sm-12 mb-4"
                v-for="restaurant in filteredRestaurants"
                :key="restaurant.id"
              >
                <RestaurantItem :restaurant="restaurant"></RestaurantItem>
              </div>
            </div>        

            <!-- se non vengono trovati ristoranti con i filtri -->
            <div v-else>
              
              <h6>
                Non sono stati trovati risultati per questa ricerca
              </h6>
              <div>
                Aggiorna i filtri e riprova
              </div>
            </div>
          </div>

          
      </div>
  </section>
</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;
@use "../style/partials/mixins" as *;

.container {
  display: flex;
  gap: 24px;

  @media (max-width: 768px) {
    flex-direction: column;

  }

}

// sidebar
.side-bar {
flex-grow: 0;
}

// main content
.main-content {
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  gap: 24px;

}

</style>
