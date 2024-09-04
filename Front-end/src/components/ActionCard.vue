<script setup lang="ts">
import { api } from '@/api';
import { ref, onMounted } from 'vue';
import { BASE_URL } from '@/api';
const object = ref(undefined) 
const url = ref(undefined)
onMounted( async () =>{
    try{
        const {data} = await api.get('/primeira-tabelas?populate=*')
        object.value = data.data
        console.log(typeof data.data[0].attributes.Cover.data.attributes.url)
        url.value = data.data[0].attributes.Cover.data.attributes.url
    }catch(e){console.log(e)}
})
</script>

<template>
    <div v-if="object" class="container">
        <img :src="BASE_URL + url" :alt="`Capa do ato ${object[0].id}`" class='imagem' v-if="url" >
    </div>
</template>

<style scoped>
    .container{
        width: 250px;
        height: 350px;
        background-color: black;
        border: 1px solid white;
        display: flex;
        flex-direction: column;
        padding: 1em;
        border-radius: 1.5em;
        
    }
    .container:hover{
        box-shadow: 5px 5px 5px white;
        background-color: orange;
        transition: background-color 0.5s, box-shadow 0.3s;
    }

    .imagem{
        width: 100%;
        height: 100%;
    }
</style>