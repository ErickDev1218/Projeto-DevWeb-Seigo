<script setup lang="ts">
import { onMounted, ref } from 'vue'
import ActionCard from '@/components/ActionCard.vue'
import { api } from '@/api';
import type { actionCardProps } from '@/types';
const covers = ref<actionCardProps[]>([])
const loading = ref(true)
onMounted( async () => {
    try{
       const { data } = await api.get('/act-covers?populate=actCover') 
    //    console.log(data.data)
       covers.value = data.data
    }catch(e){
        console.log(e)
    }finally{
        loading.value = false
    }
})
</script>

<template>
    <div class="mainContainer">
        <div v-if="loading">
            <p>
                Aguarde...
            </p>
        </div>
        <div v-else class="cardContainer">
            <ActionCard v-for="(cover) in covers " 
            :key="cover.idCover" 
            :url="cover.actCover !== null ? cover.actCover?.url : ''"
            :idCover="cover.idCover"
            :actDetails="cover.actDetails"
            :isReady="cover.isReady"
            />
        </div>
    </div>
</template>

<style scoped>
.mainContainer{
    width: 100%;
    height: 85vh;
    display: flex;
    align-items: start;
    justify-content: space-around;
    padding: 1em;
}
.cardContainer{
    width: 85%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 1em;
    flex-wrap: wrap;
    overflow-y: auto;
}
.cardContainer > .card {
    width: 270px;
    height: 360px;
    background-color: black;
    display: flex;
    justify-content: center;
    flex-direction: column;
    flex-wrap: wrap;
    filter: grayscale(100%);
    transition: filter 0.5s, width 0.5s, height 0.5s;
    cursor: pointer;
}
.cardContainer > .card:hover{
    filter: grayscale(0%);
    /* width: 405px;
    height: 540px; */
    transition: grayscale 0.5s;
}

</style>