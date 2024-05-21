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
        <li v-for="currentType in store.types" :key="currentType.name">
            <div class="type">
                <a href="#" 
                :class="['', activeTypes.includes(currentType.name) ? 'active' : 'deactive']"
                @click="filterByTypes(currentType.name)"
            ><i :class="activeTypes.includes(currentType.name) ? 'fa-regular fa-square-check' : 'fa-regular fa-square'"></i></a>
            <span>{{ currentType.name }}</span>
            </div>
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
    gap: 10px;

    padding: 0;

    .type {
        display: flex;
        align-items: center;
        gap: 10px;
    }
 
    .active {
        i {
            color: $primary1;
        }
    }

    .deactive {
        i {
            color: $grey8;
        }
    }

    .deactive:hover {
        i {
            color: $primary1;

        }
    }

}

</style>