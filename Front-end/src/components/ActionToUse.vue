<script setup lang="ts">
import { BASE_URL } from '@/api';
import type { actionCardProps } from '@/types'
defineProps<actionCardProps>()
</script>

<template>
    <img v-if="isReady" :src="BASE_URL + url" :alt="`Capa do ato ${idCover}`" class='imagem'>
    <h1 class="title">ATO - {{ idCover }}</h1>
</template>

<style scoped>
    .imagem{
        width: 100%;
        height: 100%;
    }
    .title{
        color: orange;
    }
</style>