<script setup lang="ts">
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import CustomModal from './CustomModal.vue';
import { BASE_URL, api } from '@/api'
import { useUserStore } from '@/stores/userStore';
import type { actionCardProps } from '@/types';
interface CapCardProps  {
    url:string
    idCapCover : string
    isRouter ?: boolean
    forAdmin ?: boolean
}
const user = useUserStore()
const { jwt } = user
const isOpenModalForUpdate = ref<boolean>(false)
const isOpenModalForDelete = ref<boolean>(false)
const novaCapa = ref()
const newNumber = ref<string>('')
const props = defineProps<CapCardProps>()

function handleIsOpenModalForUpdate () {
    isOpenModalForUpdate.value = !isOpenModalForUpdate.value
}
async function handleUpdate () {
    if(newNumber.value === '') newNumber.value = props.idCapCover
    try{
        const datas = new FormData()
        datas.append('data', JSON.stringify({
            idCapCover: newNumber.value
        }))
        datas.append('files.capCover', novaCapa.value) // Adiciona o arquivo
        const {data} = await api.get(`/cap-covers/?populate=*`)
        const realId = data.data.filter((ea : CapCardProps) => ea.idCapCover === props.idCapCover)[0].id
        const res = await api.put(`/cap-covers/${realId}`,datas, {
            headers: {
                Authorization : `Bearer ${jwt}`
            }
        })
        if(res.status === 200){
            window.location.reload()
        }
    }catch(e){
        console.log(`Error ao atualizar dados ${e}`)
    }
}
function handleDetails(e : Event){
    const input = e.target as HTMLInputElement;
    if (input.value) {
        newNumber.value = input.value;
    }
}
function handleFile(e : Event){
    const input = e.target as HTMLInputElement;
    if (input.files) {
        novaCapa.value = input.files[0];
    }
}
function handleOpenModalForDelete () {
    isOpenModalForDelete.value = !isOpenModalForDelete.value
}
async function handleDeleteCap () {
    try{ 
        //tenho que apagar o cap cover e o mangaPictures.
        const { data } = await api.get(`/cap-covers/?populate=*`)
        const realObj = data.data.filter((ea : actionCardProps) => ea.idCapCover === props.idCapCover)[0]
        const mangaId = realObj.manga_pictures[0].id
        const capId = realObj.id
        const resManga = await api.delete(`/manga-pictures/${mangaId}`, {
                headers : {
                    Authorization : `Bearer ${jwt}`
                }
            })
        const resCap = await api.delete(`/cap-covers/${capId}`, {
                headers : {
                    Authorization : `Bearer ${jwt}`
                }
            })
        if(resManga.status === 200 && resCap.status === 200){
            window.location.reload()
        }
    }catch(e){
        console.log(`Error ao deletar o capitulo ${e}`)
    }
}
</script>

<template>
    <CustomModal v-if="isOpenModalForDelete" @close="handleOpenModalForDelete">
        <template v-slot:text>
            <h1 class="titleBlack">Tem certeza que deseja deletar o capítulo {{ idCapCover }} ?</h1>
            <div class="buttonContainer">
                <button @click="handleOpenModalForDelete" class="button cancel">
                    Cancelar
                </button>
                <button @click="handleDeleteCap" class="button confirm">
                    Confirmar
                </button>
            </div>
        </template> 
    </CustomModal>

    <CustomModal v-if="isOpenModalForUpdate" @close="handleIsOpenModalForUpdate">
        <template v-slot:text>
            <h2 class="orange">Atualizar dados do capítulo {{ idCapCover }}</h2>
            <form class="attForm" @submit.prevent="handleUpdate">
                <label for="numero">Novo número do capítulo:</label>
                <input type="text" :placeholder="'Número do capítulo ' + idCapCover " name="numero" id="numero" :value="idCapCover" :minlength="1" @change="handleDetails">
                <label for="capa">Nova capa:</label>
                <input type="file" name="capa" id="capa" accept=".png" @change="handleFile">
                <div class="buttonContainer">
                    <button @click="handleIsOpenModalForUpdate" class="button cancel">
                        Cancelar
                    </button>
                    <button type="submit" class="button confirm">
                        Confirmar
                    </button>
                </div>
            </form>
        </template>
    </CustomModal>
    <div v-if="isRouter">
    <RouterLink :to="`/capDetails/${idCapCover}`" class="capContainer">
        <img :src="BASE_URL + url" :alt="`Capa do capitulo ${idCapCover}`"> 
        <h1>Capítulo {{ idCapCover }}</h1>
    </RouterLink>
    </div>
    <div v-else-if="forAdmin" class="imgContainer">
        <img :src="BASE_URL + url" :alt="`Capa do capitulo ${idCapCover}`"> 
        <h3>Capítulo {{ idCapCover }}</h3>
        <span class="rowContainer">
            <button @click="handleIsOpenModalForUpdate">🆙</button>
            <button @click="handleOpenModalForDelete">❌</button>
        </span>
    </div>
    <div v-else>
        <div class="capContainer" id="noRouter">
            <img :src="BASE_URL + url" :alt="`Capa do capitulo ${idCapCover}`"> 
            <h1>Capítulo {{ idCapCover }}</h1>
        </div>
    </div>
    
</template>

<style scoped>
    .titleBlack{
        color: black;
    }
    .rowContainer{
        display: flex;
        justify-content: space-around;
        align-items: center;
        width: 100%;
        >button {
            all: unset;
            cursor: pointer;
            font-size: x-large;
        }
    }
    .imgContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: ceter;
        > img {
            width: 225px;
            height: 361px;
        }
        >h3 {
            color: orange;
        }
    }
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
    .orange {
        color: orange;
    }
    .attForm{
        color: black;
        display: flex;
        flex-direction: column;
        gap: 2em;
        >label {
            color: black;
        }
        >input {
            all: unset;
            padding: 1em;
            border: 1px solid black;
            border-radius: 1em;
            color: black;
        }
    }
</style>