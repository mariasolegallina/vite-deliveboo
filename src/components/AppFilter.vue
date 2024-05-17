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

        <ul>
            <li v-for="currentType in store.types">
                <a href="#">{{ currentType.name }}</a>
            </li>
        </ul>

    </div>

</template>

<style lang="scss">

</style>