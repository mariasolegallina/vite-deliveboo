<script>

import axios from 'axios';

export default {
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
<div class="container">
  <h1>Ciao mondo</h1>
  <button type="button" class="btn btn-primary">Primary</button>


  <div>
    <ul>
      <li v-for="restaurant in restaurants">

        {{ restaurant.restaurant_name }}


      </li>
    </ul>
  </div>
</div>
</template>

<style lang="scss">
@use "./style/general.scss";
</style>
