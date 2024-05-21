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
<main>
  <router-view></router-view>
</main>

<PageFooter></PageFooter>
</template>



<style lang="scss">
@use "./style/general.scss";

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

main {
  flex: 1;
  padding: 0;
}
</style>