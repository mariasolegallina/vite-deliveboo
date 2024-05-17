<script>

import { store } from './store.js';

import PageHeader from './components/PageHeader.vue';
import PageFooter from './components/PageFooter.vue'

export default {
  components: {
    PageFooter,
    PageHeader,
  },

  data() {
    return {
      store,
    }
  },
}
</script>



<template>
<PageHeader></PageHeader>

    <div class="container">
      <router-view></router-view>
    </div>


<PageFooter></PageFooter>
</template>



<style lang="scss">

@use "./style/general.scss";

</style>
