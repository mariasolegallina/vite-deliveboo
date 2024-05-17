<script>

import { store } from '../store.js';

export default {

    name: 'AppFilter',

    data(){
        return{
            store,
        }
    },
}

</script>

<template>
    
    <div>

        <ul class="d-flex justify-content-center gap-4">
            <li v-for="currentType in types">
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