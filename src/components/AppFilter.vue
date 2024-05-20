<script>

import { store } from '../store.js';

export default {

    name: 'AppFilter',

    data(){
        return{
            store,
            activeTypes: [],
        }
    },

    methods: {
       filterByTypes(type) {
           const index = this.activeTypes.indexOf(type);
           if (index > -1) {
               this.activeTypes.splice(index, 1); // Rimuove il type se già presente
           } else {
               this.activeTypes.push(type); // Aggiunge il type se non presente
           }
           this.$emit('filter', this.activeTypes);
       }
   },
}

</script>

<template>
    <ul class="d-types">
        <li v-for="currentType in store.types" :key="currentType.name" class="mb-1">
            <a href="#" 
                :class="['', activeTypes.includes(currentType.name) ? 'active' : 'deactive']"
                @click="filterByTypes(currentType.name)"
            >{{ currentType.name }}</a>
        </li>
    </ul>

</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;
@use "../style/partials/mixins" as *;

.d-types {
    display:flex;
    flex-direction: column;
    flex-wrap: nowrap;
    gap: 4px;

    padding: 0;
 
    .active {
        @include t-btn;
        background-color: $primary1;
    }

    .deactive {
        @include t-btn;
        background-color: $grey6;
    }

    .deactive:hover {
        @include t-btn;
        background-color: $grey8;
    }

}

</style>