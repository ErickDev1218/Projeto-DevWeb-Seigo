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
        height: 80%;
        background-color: black;
        border: 0x solid black;
        display: flex;
        justify-content: center;
        flex-direction: column;
        flex-wrap: wrap;
        filter: grayscale(100%);
        transition: filter 0.5s ease;
    }
    .container:hover{
        filter: grayscale(0%);
        transition: grayscale 0.5s;
    }

    .imagem{
        width: 100%;
        height: 100%;
        border-radius: 0em;
    }
    .imagem:hover{
        box-shadow: 0px 0px 20px rgb(128, 2, 128);
        transition: border-radius 0.3s, box-shadow 0.3s;
    }

</style>