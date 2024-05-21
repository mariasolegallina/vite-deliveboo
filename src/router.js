import { createRouter, createWebHistory } from "vue-router";

import HomePage from './pages/HomePage.vue';
import SingleRestaurant from './pages/SingleRestaurant.vue';
import Basket from "./pages/Basket.vue";

const router = createRouter ({
    history: createWebHistory(),

    // rotte gestite 
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomePage
        },
        {
            path: '/restaurants/:id',
            name: 'single-restaurant',
            component: SingleRestaurant
        },
        {
            path: '/basket',
            name: 'basket',
            component: Basket
        }
    ]
});

export { router };