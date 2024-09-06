<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { api } from '@/api';
import ActionToUse from '@/components/ActionToUse.vue'
import CapCard from '@/components/CapCard.vue'
const actObj = ref(null)
const loading = ref(true)
const aux = [1,2,3]

onMounted( async () => {
    const route = useRoute();
    const id = route.params.id;
    try{
       const { data } = await api.get(`/act-covers/${id}?populate=*`) 
       console.log(data.data)
       actObj.value = data.data
    }catch(e){
        console.log(e)
    }
    finally{
        loading.value = false
    }
    console.log(id.value)
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
            <ActionToUse 
            :key="actObj.attributes.idCover" 
            :url="actObj.attributes.actCover.data.attributes.url"
            :idCover="actObj.attributes.idCover"
            />
        </div>
        <div class="infoContainer">
            <h1>Informacoes</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime et iste nostrum quis eius rem dolores, quaerat ab. Molestiae quos illo pariatur rem corporis earum accusamus sint eligendi natus odio? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consequatur explicabo libero beatae ut impedit! Praesentium vel corrupti, natus alias, provident vitae quo nisi atque assumenda animi repellat delectus officiis consequuntur! Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo cum accusantium debitis harum earum, quibusdam nam vitae repellendus optio illum aut tempora non et at tempore obcaecati facilis, necessitatibus eius!</p>
            <CapCard v-for="(i) in aux" :text="'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Illo cum accusantium debitis harum earum, quibusdam nam vitae repellendus optio illum aut tempora non et at tempore obcaecati facilis, necessitatibus eius!'" :key="i"/>
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
        border: 1px solid white;
    }
    .cardContainer{
        width: 20%;
        height: 360px;
    }
    .cardContainer > .imagem {
        width: 270px;
        height: 360px;
    }
    .infoContainer{
        border: 1px solid orange;
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .infoContainer > .capContainer {
        border: 1px solid purple;
    }
</style>
