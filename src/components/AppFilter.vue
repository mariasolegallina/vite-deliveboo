<script>

import axios from 'axios';

export default{

    name: 'AppFilter',

    data(){
        return{
            types:[],

            baseApiUrl: 'http://127.0.0.1:8000/api',

        }
    },

    mounted() {
        axios.get(this.baseApiUrl + '/types').then(res=>[
        this.types = res.data.results,
        console.log(res)
        ])
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