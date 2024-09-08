<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { api, BASE_URL } from '@/api'
import { useRoute } from 'vue-router'
import CapCard from '@/components/CapCard.vue'
import MangaView from '@/components/MangaView.vue'
const capInf = ref(null)
const load = ref(true)
const openModal = ref(false)

const showManga = () : void =>{
    openModal.value = !openModal.value
}   
onMounted( async () => {
    const route = useRoute()
    const id = route.params.id
    try{
        const {data} = await api.get(`/cap-covers/${id}?populate=*`)
        capInf.value = data.data
    }catch(e){
        console.log(e)
    }finally{
        load.value = false
    }
})
</script>

<template>
    <MangaView v-if="openModal" @close="showManga"/>
    <div  class="mainContainer">
        <div v-if="load">
            Aguarde...
        </div>
        <div v-else class="fullSize">
            <div class="capContainer">
                <CapCard :url="capInf.capCover.url"  :idCapCover="capInf.idCapCover" :isRouter="false"/>
            </div>
            <div class="restPage">
                <h1 class="ler" @click="showManga">Ler mangá</h1>
                <span class="favBox">
                    <label for="favoritar">Favoritar:</label>
                    <input type="radio" name="favoritar" id="favoritar">
                </span>
                <span class="avalBox">
                    <label for="nota">Avaliar</label>
                    <select name="nota" id="nota">
                        <option value="1" selected>1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                </span>
                <div class="comentario">
                    <h2>Deixar comentário</h2>
                    <textarea name="comentario" id="comentario" maxlength="200"></textarea>
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
.capContainer {
    width: 550px;
}
.restPage{
    width: 80%;
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    
}

.ler{
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: orange;
}
.favBox{
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: start;
    gap:2em;
    > label {
        color: orange;
    }
}
.avalBox{
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 2em;
    > label {
        color: orange;
    }    
}
.comentario{
    width: 100%;
    height: 50%;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    gap: 1em;
    > h2 {
        color: orange;
    }
    > textarea{
        resize: none;
        color: black;
        padding: 1em;
        width: 80%;
        height: 50%;
        border-radius: 1em;
    }

}
</style>