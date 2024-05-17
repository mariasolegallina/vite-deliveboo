<script>
import axios from 'axios';

import { store } from '../store.js';

import PageHeader from '../components/PageHeader.vue';
import Main from '../components/Main.vue';
import PageFooter from '../components/PageFooter.vue'

import RestaurantItem from '../components/RestaurantItem.vue';
import AppFilter from '../components/AppFilter.vue';

export default {
    name: 'HomePage',

    components: {
      PageHeader,
      Main,
      PageFooter,
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
<PageHeader></PageHeader>

<Main></Main>

<PageFooter></PageFooter>

<div class="container py-5">
  
  <h1>Ristoranti:</h1>

  <AppFilter></AppFilter>

  <div class="row row-gap-2 py-5">
    <RestaurantItem 
      v-for="restaurant in store.restaurants"
      :restaurant="restaurant"
      >

    </RestaurantItem>
  </div>
</div>
</template>

<style lang="scss" scoped>
@use "../style/general.scss";

</style>
