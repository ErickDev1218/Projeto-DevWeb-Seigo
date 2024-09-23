<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { BASE_URL, api } from '@/api'
import { useRoute } from 'vue-router'
import CommentCard from '@/components/CommentCard.vue'
import type { CommentFormatResponse, FavoritesFormatResponse, Nota } from '@/types'
import CapCard from '@/components/CapCard.vue'
import CustomModal from '@/components/CustomModal.vue'
import { useUserStore } from '@/stores/userStore'
import type { capCardProps } from '@/types'
import JSZip from 'jszip'

interface capInfFormat {
    capCover : {
        idCapCover : string
        url : string
    }
    idCapCover : string
    id : number
}
interface capInfFormatObject {
    cap_cover : {
        idCapCover : string
        url : string
    }
    idCapCover : string
    id : number
}

interface picturesFormat {
    name : string
    url : string
    cap_cover : capCardProps
}
const capInf = ref<capInfFormat>({} as capInfFormat)
const actualPage = ref<number>(0)
let pictures : picturesFormat[] = [] 
const load = ref(true)
const openModal = ref(false)
const openModalForCheck = ref(false)
const userStore = useUserStore();
const jwt = userStore.jwt;
const textAreaInput = ref('')
const route = useRoute()
const id = route.params.id
const comments = ref<CommentFormatResponse[]>([])
const valor = ref<number>(1)
const isFav = ref<boolean>(false)
const notaCap = ref<number>(0)

const showManga = () : void =>{
    openModal.value = !openModal.value
    openModalForCheck.value = false
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
        const resCom = await api.get(`/comentarios/?populate=*`,)
        comments.value = resCom.data.data.filter((ea : CommentFormatResponse) => ea.cap_cover.idCapCover === id);

        const resNota = await api.get(`/notas/?populate=*`, {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        let test = resNota.data.data.filter((ea : Nota) => {
            return Number(ea.user.id) === Number(userStore.id) && ea.cap_cover.idCapCover === id
        })[0]
        if(test){
            valor.value = test.notaAtual
        }
        if(jwt){
            const resFav = await api.get(`/favoritos/?populate=*`, {
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            test = resFav.data.data.filter((ea : FavoritesFormatResponse) => {
                return Number(ea.user.id) === Number(userStore.id) && ea.cap_cover.idCapCover === id
            })[0]
            if(test){
                isFav.value = test.isFavorit
            }
        }
        const calcNota = await api.get(`/notas/?populate=*`)        
        test = calcNota.data.data.filter((ea : Nota) => ea.cap_cover.idCapCover === id)
        if(test){
            let aux = 0;
            test.forEach((nota : Nota) => aux += nota.notaAtual)
            const denominador = test.length === 0 ? 1 : test.length
            notaCap.value = aux/denominador
        }


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
        
        const findRealId = await api.get(`/cap-covers/?populate=*`,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        const realId = findRealId.data.data.filter((ea : capInfFormat) => ea.idCapCover === id)[0].id

        datas.append('data', JSON.stringify({
            text : textAreaInput.value,
            cap_cover : realId,
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

async function updateFavorite(e: Event) {
    const input = e.target as HTMLInputElement;

    try{

        const check = await api.get(`/favoritos/?populate=*`, {
            headers: {
                Authorization: `Bearer ${userStore.jwt}`
            }
        });
        const checkArray = check.data.data.filter((aux : FavoritesFormatResponse) =>
            {return aux.cap_cover.idCapCover === id && aux.user.id === Number(userStore.id)}
        )
        
        if(checkArray.length === 0){
            const findRealId = await api.get(`/cap-covers/?populate=*`,{
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })

            const realId = findRealId.data.data.filter((ea : capInfFormat) => ea.idCapCover === id)[0].id

            const datas = new FormData();
            datas.append('data', JSON.stringify({
                isFavorit: input.checked,
                user: Number(userStore.id),
                cap_cover: realId
            }))
        
            await api.post(`/favoritos`, datas, {
                headers: {
                    Authorization: `Bearer ${userStore.jwt}`
                }
            })
        }
        else {
            const datas = new FormData();
            datas.append('data', JSON.stringify({
                isFavorit: input.checked
            }))

            await api.put(`/favoritos/${checkArray[0].id}`, datas, {
                headers: {
                    Authorization: `Bearer ${userStore.jwt}`
                }
            })
        }
        
    }
    catch(e){
        console.log(`error ao atualizar favorito ${e}`);
    }
}

async function downloadZip() {
    try {
        const zip = new JSZip();
        const { data } = await api.get('/manga-pictures/?populate=*');
        const realId = data.data.filter((ea : capInfFormatObject) => ea.cap_cover.idCapCover == id)[0].id
        const pictures = data.data.filter((ea : capInfFormat)  => ea.id == realId)[0].pictures?.sort((a : picturesFormat , b : picturesFormat ) => 
        {
            // Extrair o número da string antes de ".png"
            const numA = parseInt(a.name.split('.')[0], 10);
            const numB = parseInt(b.name.split('.')[0], 10);
            // Comparar os números
            return numA - numB;
        })
        for (let i = 0; i < pictures.length; i++) {
            const image = pictures[i];
            const blobResponse = await api.get(BASE_URL + image.url, { responseType: 'blob' });
            const blob = blobResponse.data;
            zip.file(`imagem-${i+1}.png`, blob);
        }

        const content = await zip.generateAsync({ type: "blob" });
        const url = URL.createObjectURL(content);

        const link = document.createElement('a');
        link.href = url;
        link.download = 'imagens.zip';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    } catch (error) {
        console.error(`Erro ao criar o ZIP: ${error}`);
    }
}

async function Avaliation (e : Event) {
    let input = e.target as HTMLInputElement
    try{
        const { data } = await api.get(`/notas/?populate=*`,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        const check = data.data.filter((ea : Nota) => 
        {
            return Number(ea.user.id) === Number(userStore.id) && ea.cap_cover.idCapCover === id

        })  
        if(check.length >= 1){
            const datas = new FormData()
            datas.append('data',JSON.stringify({
                notaAtual : input.value
            }))
            await api.put(`/notas/${check[0].id}`,datas,{
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        })
        }else{
            const res = await api.get(`/cap-covers/?populate=*`,{
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
            const realId = res.data.data.filter((ea : capInfFormat) => ea.idCapCover === id)[0].id
            const datas = new FormData()
            datas.append('data',JSON.stringify({
                notaAtual : input.value,
                user : userStore.id,
                cap_cover: realId
            }))
            await api.post(`/notas`,datas,{
                headers: {
                    Authorization: `Bearer ${jwt}`
                }
            })
        }
    }catch(e){
        console.log(`Error ao buscar as notas ${e}`)
    }

}

function ReinitManga () {
    actualPage.value = 0
    showManga()
    openModalForCheck.value = !openModalForCheck.value
}
function Choose() {
    if(actualPage.value != 0){
        openModalForCheck.value = !openModalForCheck.value
    }else{
        showManga()
    }
}
</script>

<template>
    <CustomModal 
    @close="Choose"
    v-if="actualPage != 0 && openModalForCheck"
    >
    <template v-slot:text>
        <h1 class="black">
            Deseja continuar de onde parou ?
        </h1>
        <div class="buttonContainer">
            <button @click="ReinitManga" class="button cancel">
                Não
            </button>
            <button @click="showManga" class="button confirm">
                Sim
            </button>
        </div>
    </template>
    </CustomModal>

    <CustomModal  
    v-if="openModal"
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
                <h1 class="ler" @click="Choose">Ler mangá</h1>
                <template v-if="userStore.jwt">
                    <span class="options">
                        <label for="favoritar">Favoritar:</label>
                        <input type="checkbox" name="favoritar" id="favoritar" @change="updateFavorite" v-model="isFav">
                    </span>
                    <span class="options">
                        <label for="nota">Avaliar</label>
                        <select name="nota" id="nota" @change="Avaliation" v-model="valor">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <h3 class="avaliation">Nota: {{ notaCap === 0 ? 'Sem notas 😭' : notaCap }}</h3>
                    </span>
                    <div class="comentario">
                        <div class="flexRow">
                            <h2>Deixe um comentário!</h2>
                            <button @click="handleCreateComment">Comentar</button>
                            <button @click="downloadZip">Fazer download do capítulo {{ id }}</button>
                        </div>
                        <textarea @change="handleTextChange" name="comentario" id="comentario" maxlength="255"></textarea>
                        <div class="commentList">
                            <CommentCard v-for="(comment, index) in comments" 
                            :key="index"
                            :user="comment.user.username"
                            :comment="comment.text"
                            :id="comment.id"
                            />
                        </div>
                    </div>
                </template>
                <template v-else>
                    <h3 class="avaliation">Nota: {{ notaCap === 0 ? 'Sem notas 😭' : notaCap }}</h3>
                    <div class="comentario">
                        <div class="commentList">
                            <CommentCard v-for="(comment, index) in comments" 
                            :key="index"
                            :user="comment.user.username"
                            :comment="comment.text"
                            :id="comment.id"
                            />
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .buttonContainer{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .button{
        all: unset;
        cursor: pointer;
        padding: 0.5em;
        border: 1px solid orange;
        border-radius: 1em;
        color: black;
    }
    .confirm:hover{
        background-color: orange;
        color: white;
        transition: background-color 0.5s, color 0.5s;
    }
    .cancel:hover{
        background-color: red;
        color: white;
        transition: background-color 0.5s, color 0.5s;
    }
    .black{
        color: black;
    }
    #nota{
        color: orange;
        padding: 0.3em;
        > option {
            color: black;
        }
    }
    .avaliation{
        color: orange;
    }
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