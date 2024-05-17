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
    
    <div>

        <ul class="d-flex justify-content-center gap-4">
            <li v-for="currentType in store.types" :key="currentType.name">
                <a href="#" 
                    :class="['badge rounded-pill fs-5', activeTypes.includes(currentType.name) ? 'active' : 'text-bg-secondary']"
                    @click="filterByTypes(currentType.name)"
                >{{ currentType.name }}</a>
            </li>
        </ul>

    </div>

</template>

<style lang="scss" scoped>
@use "../style/partials/variables" as *;

.active{
    background-color: $accent2;
}

</style>