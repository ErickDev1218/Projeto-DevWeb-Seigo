<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { api } from '@/api'
import { useRoute } from 'vue-router'
import Comment from '@/components/Comment.vue'
import type { CommentFormatResponse } from '@/types'
import CapCard from '@/components/CapCard.vue'
import CustomModal from '@/components/CustomModal.vue'
import { useUserStore } from '@/stores/userStore'
import type { capCardProps } from '@/types'

interface capInfFormat {
    capCover : {
        url : string
    }
    idCapCover : string
}

interface picturesFormat {
    name : string
    url : string
    cap_cover : capCardProps
}

const capInf = ref<capInfFormat>({} as capInfFormat)
const actualPage = ref(0)
let pictures : picturesFormat[] = [] 
const load = ref(true)
const openModal = ref(false)
const userStore = useUserStore();
const jwt = userStore.jwt;
const textAreaInput = ref('')


const comments = ref<CommentFormatResponse[]>([])

const showManga = () : void =>{
    openModal.value = !openModal.value
}   
const previousPage = () : void => {
    if(actualPage.value > 0){
        actualPage.value--
    }
}
const nextPage = () : void => {
    if(actualPage.value < pictures.length -1){
        actualPage.value++
    }
}
onMounted( async () => {
    const route = useRoute()
    const id = route.params.id // 9
    try{
        const {data} = await api.get(`/cap-covers/?populate=*`)
        capInf.value = data.data.filter((ea : capInfFormat) => ea.idCapCover === id)[0]
        const res = await api.get(`/manga-pictures/?populate=*`)
        pictures = res.data.data.filter((ea : picturesFormat) => ea.cap_cover.idCapCover === id)[0].pictures?.sort((a : picturesFormat, b :picturesFormat) => {
            // Extrair o número da string antes de ".png"
            const numA = parseInt(a.name.split('.')[0], 10);
            const numB = parseInt(b.name.split('.')[0], 10);
            // Comparar os números
            return numA - numB;
        })
        const resCom = await api.get(`/comentarios/?populate=*`)
        comments.value = resCom.data.data.filter((ea : CommentFormatResponse) => ea.cap_cover.idCapCover === id);
        
    }catch(e){
        console.log(e)
    }finally{
        load.value = false
    }
})

function handleTextChange(event : Event) : void {
    const target = event.target as HTMLTextAreaElement
    textAreaInput.value = target.value
}

async function handleCreateComment(){
    try{
        const datas = new FormData()

        datas.append('data', JSON.stringify({
            text : textAreaInput.value,
            cap_cover : capInf.value.idCapCover,
            user : userStore.id
        }))

        const res = await api.post('/comentarios', datas ,{
            headers : {
                Authorization : `Bearer ${jwt}`
            }
        })
        if(res.status === 200){
            window.location.reload()
        }
    } catch(e){
        console.log(`Error ao criar comentario ${e}`)
    }
}

</script>

<template>
    <CustomModal v-if="openModal" 
    :toSee="true" 
    @close="showManga" 
    @previous="previousPage" 
    @next="nextPage" 
    :url="pictures[actualPage].url" 
    :topLimit="pictures.length" 
    :actualPage="actualPage"
    />
        
    
    <div  class="mainContainer">
        <div v-if="load">
            Aguarde...
        </div>
        <div v-else class="fullSize">
            <div class="capContainer">
                <CapCard :url="capInf.capCover.url"  :idCapCover="capInf?.idCapCover" :isRouter="false"/>
            </div>
            <div class="restPage">
                <h1 class="ler" @click="showManga">Ler mangá</h1>
                <template v-if="userStore.jwt">
                    <span class="options">
                        <label for="favoritar">Favoritar:</label>
                        <input type="checkbox" name="favoritar" id="favoritar">
                    </span>
                    <span class="options">
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
                        <div class="flexRow">
                            <h2>Deixar comentário</h2>
                            <button @click="handleCreateComment">Comentar</button>
                        </div>
                        <textarea @change="handleTextChange" name="comentario" id="comentario" maxlength="255"></textarea>
                        <div class="commentList">
                            <Comment v-for="(comment, index) in comments" 
                            :key="index"
                            :user="comment.user.username"
                            :comment="comment.text"/>
                        </div>
                    </div>
                </template>
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
    cursor: pointer;
}
.options{
    width: 30%;
    display: flex;
    align-items: center;
    justify-content: start;
    gap:2em;
    > label {
        color: orange;
    }
}
.comentario{
    width: 100%;
    height: 80%;
    display: flex;
    justify-content: start;
    align-items: center;
    flex-direction: column;
    gap: 2em;
    > h2 {
        color: orange;
    }
    > textarea{
        resize: none;
        color: black;
        padding: 1em;
        width: 80%;
        height: 20%;
        border-radius: 1em;
        font-size:large ;
        overflow-y: auto;
    }
    .h1Modal{
        color: black;
    }
}

.commentList{
    width: 80%;
    max-height: 80%;
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 1em;
    padding: 1em;
    > p {
        color: white;
    }
    overflow-y : auto;
}

.flexRow{
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 80%;
    >h2{
        color: orange;
    }
    >button{
        all: unset;
        padding: 1em;
        background-color: orange;
        color: white;
        border-radius: 1em;
        cursor: pointer;
    }
    >button:hover{
        box-shadow: 0px 0px 10px white;
        transition: box-shadow 0.2s;
    }
}

</style>