<script setup lang="ts">
import { BASE_URL } from '@/api';
import type { actionCardProps } from '@/types'
import { RouterLink } from 'vue-router'
defineProps<actionCardProps>()
</script>

<template>
        <RouterLink v-if="isReady === true" class="card" :to="`/actDetails/${idCover}`">
            <img  :src="BASE_URL + url" :alt="`Capa do ato ${idCover}`" class='imagem'>
            <h1 class="title">ATO</h1>
            <h1 class="titleNumber">{{ idCover }}</h1>
        </RouterLink>
        <div v-else class="notReady card">
            <h1 class="title">ATO</h1>
            <h1 class="titleNumber">{{ idCover }}</h1>
            <h5>Em breve...</h5>
        </div>
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
        display: block;
    }
    .card:hover{
        box-shadow: 0px 0px 20px orange;
        transition: box-shadow 0.3s;
    }
    .title{
        font-family: Poppins-Bold;
        /* color: white; */
        /* align-self:last baseline; */
        font-size: 30px;
        font-weight: bold;
        color: white; /* Cor padrão */
        mix-blend-mode: difference; /* Mistura a cor do texto com a imagem */
    }
    .titleNumber{
        font-family: Poppins-Bold;
        /* color: white; */
        /* align-self:last baseline; */
        font-size: 45px;
        font-weight: bold;
        color: white; /* Cor padrão */
        mix-blend-mode: difference; /* Mistura a cor do texto com a imagem */
    }

    .card:hover .title{
        text-shadow: 0px 0px 10px black;
        transition: text-shadow 0.3s;
    }
    .notReady{
        border: 1px solid white;
    }
        

</style>