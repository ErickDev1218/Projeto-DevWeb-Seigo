<script setup lang="ts">
import { RouterLink } from 'vue-router'
interface CapCardProps  {
    url:string
    idCapCover : string
    isRouter : boolean
}

defineProps<CapCardProps>()
import { BASE_URL } from '@/api'
</script>

<template>
    <div v-if="isRouter">
    <RouterLink :to="`/capDetails/${idCapCover}`" class="capContainer">
        <img :src="BASE_URL + url" :alt="`Capa do capitulo ${idCapCover}`"> 
        <h1>Capítulo {{ idCapCover }}</h1>
    </RouterLink>
    </div>
    <div v-else>
        <div class="capContainer" id="noRouter">
        <img :src="BASE_URL + url" :alt="`Capa do capitulo ${idCapCover}`"> 
        <h1>Capítulo {{ idCapCover }}</h1>
        </div>
    </div>
</template>

<style scoped>
    #noRouter {
        cursor: auto;
        > img {
            width: 100%;
            height: 500px;
            object-fit: cover;
        }
        > h1 {
            color: orange;
            text-shadow: none;
        }
    }
    .capContainer{
        width: fit-content;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 1em;
        flex-wrap: wrap;
        cursor: pointer;
    }
    .capContainer img {
        width: 248px;
        height: 350px;
    }
    .capContainer:hover h1{
        color: orange;
        text-shadow: 0px 0px 5px white;
        transition: color 0.5s, text-shadow 0.5s;
    }
</style>