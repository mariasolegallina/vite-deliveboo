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

        <ul>
            <li v-for="currentType in types">
                <a href="#">{{ currentType.name }}</a>
            </li>
        </ul>

    </div>

</template>

<style lang="scss">

</style>