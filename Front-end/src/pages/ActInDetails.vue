<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '@/api';
import type { actionCardProps, capCardProps } from '@/types'
import ActionToUse from '@/components/ActionToUse.vue'
import CapCard from '@/components/CapCard.vue'
const actObj = ref<actionCardProps>({} as actionCardProps)
const allCaps = ref<capCardProps[]>([])
const loading = ref(true)

onMounted( async () => {
    const route = useRoute();
    const id = route.params.id;
    try{
        const { data } = await api.get(`/act-covers?populate=*`)
        const obj = data.data.filter((ea : actionCardProps) => ea.idCover === id)[0]
        const resAct = await api.get(`/act-covers/${obj.id}?populate=*`) 
        const resCap  = await api.get(`/cap-covers?populate=*`)
        actObj.value = resAct.data.data
        allCaps.value = resCap.data.data.filter((each : capCardProps) => each.act_cover?.idCover === id)
    }catch(e){
        console.log(e)
    }
    finally{
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
        <div v-else class="fullSize">
            <div class="cardContainer">
                <ActionToUse 
                :key="actObj.idCover" 
                :url="actObj.actCover !== null ? actObj.actCover?.url : ''"
                :idCover="actObj.idCover"
                :actDetails="actObj.actDetails"
                :isReady="actObj.isReady"
                />
            </div>
            <div class="infoContainer">
                <h1>{{ actObj.actDetails }}</h1>
                 <div class="allCapsContainer">
                     <CapCard v-for="(cap) in allCaps" 
                     :url="cap.capCover.url" 
                     :idCapCover="cap.idCapCover" 
                     :key="cap.idCapCover" 
                     :isRouter="true"/>
                 </div>
            </div>
        </div>
    </div>
</template>


<style scoped>
    .mainContainer{
        width: 100%;
        height: 85vh;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-around;
        padding: 1em;
    }
    .fullSize{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .cardContainer{
        width: 450px;
        height: 600px;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-self: center;
    }
    .cardContainer > .imagem {
        width: 270px;
        height: 360px;
    }
    .infoContainer{
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2em;
    }
    .infoContainer h1 {
        color: orange;
    }
    .infoContainer > .capContainer {
        border: 1px solid purple;
    }
    .allCapsContainer {
        width: 100%;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
</style>
