<script>

import { store } from '../store.js';

export default {

    name: 'AppFilter',

    data(){
        return{
            store,
        }
    },

    methods: {
        filterByTypes(type) {
            this.$emit('filter', type);
        }
    },
}

</script>

<template>
    
    <div>

        <ul class="d-flex justify-content-center gap-4">
            <li v-for="currentType in store.types" :key="currentType.name">
                <a href="#" 
                class="badge rounded-pill text-bg-light fs-5"
                @click="filterByTypes(currentType.name)"
                >{{ currentType.name }}</a>
            </li>
        </ul>

    </div>

</template>

<style lang="scss">

</style>