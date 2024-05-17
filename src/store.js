import { reactive } from 'vue'


export const store = reactive({
    types: [],
    restaurants: [],


    baseApiUrl: 'http://127.0.0.1:8000/api',
});