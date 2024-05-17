<script>

import { store } from '../store.js';

export default {

    name: 'AppFilter',

    data(){
        return{
            store,
            activeType: null,
        }
    },

    methods: {
        filterByTypes(type) {
            if (this.activeType === type) {
                this.activeType = null;
                this.$emit('filter', null);
            } else {
                this.activeType = type;
                this.$emit('filter', type);
            }
        }
    },
}

</script>

<template>
    
    <div>

        <ul class="d-flex justify-content-center gap-4">
            <li v-for="currentType in store.types" :key="currentType.name">
                <a href="#" 
                :class="['badge rounded-pill fs-5', currentType.name === activeType ? 'active' : 'text-bg-secondary']"
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