<script setup lang="ts">
import { BASE_URL } from '@/api';
import { actionCardProps } from '@/types'
import { RouterLink } from 'vue-router'
defineProps<actionCardProps>()
</script>

<template>
        <RouterLink class="card" :to="`/actDetails/${idCover}`">
            <img :src="BASE_URL + url" :alt="`Capa do ato ${idCover}`" class='imagem'>
            <h1 class="title">ATO - {{ idCover }}</h1>
        </RouterLink>
</template>

<style scoped>
    .card{
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .imagem{
        width: 100%;
        height: 100%;
        z-index: -1;
        position: absolute;
    }
    .card:hover{
        box-shadow: 0px 0px 20px orange;
        transition: box-shadow 0.3s;
    }
    .title{
        font-family: Poppins-Bold;
        color: orange;
    }
    .card:hover  .title{
        text-shadow: 0px 0px 10px black;
        transition: text-shadow 0.3s;
    }
    
        

</style>