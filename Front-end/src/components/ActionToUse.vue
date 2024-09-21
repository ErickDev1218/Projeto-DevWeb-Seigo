<script setup lang="ts">
const props = defineProps<actionCardProps>()
import { ref } from 'vue'
import { BASE_URL,api } from '@/api';
import { useUserStore } from '@/stores/userStore'
import type { actionCardProps } from '@/types'
import CustomModal from '@/components/CustomModal.vue'

const useStore = useUserStore()
const jwt = useStore.jwt
const isOpenModalForDelete = ref<boolean>(false)
const isOpenModalForUpdate = ref<boolean>(false)
const details = ref<string>('')
const novaCapa = ref()

function handleIsOpenModalForDelete () {
    isOpenModalForDelete.value = !isOpenModalForDelete.value
}
function handleIsOpenModalForUpdate () {
    isOpenModalForUpdate.value = !isOpenModalForUpdate.value
}
async function handleUpdate() {
    if(details.value === ''){
        details.value = props.actDetails
    }
    try{
        const { data } = await api.get(`/act-covers/?populate=*`)
        const realId = data.data.filter((ea : actionCardProps ) => ea.idCover === props.idCover)[0].id
        const datas = new FormData()
        datas.append('data', JSON.stringify({
            actDetails: details.value
        }))
        datas.append('files.actCover', novaCapa.value) // Adiciona o arquivo
        const res = await api.put(`/act-covers/${realId}`,datas, {
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
function handleFile(e : Event){
    const input = e.target as HTMLInputElement;
    if (input.files) {
        novaCapa.value = input.files[0];
    }
}
function handleDetails(e : Event){
    const input = e.target as HTMLInputElement;
    if (input.value) {
        details.value = input.value;
    }
}
</script>

<template>

    <CustomModal v-if="isOpenModalForDelete" @close="handleIsOpenModalForDelete">
        <template v-slot:text>
            <h1 class="titleBlack">Tem certeza que deseja deletar o ATO {{ idCover }} ?</h1>
            <div class="buttonContainer">
                <button @click="handleIsOpenModalForDelete" class="button cancel">
                    Cancelar
                </button>
                <button @click="handleDelete && handleDelete(idCover)" class="button confirm">
                    Confirmar
                </button>
            </div>
        </template> 
    </CustomModal>

    <CustomModal v-if="isOpenModalForUpdate" @close="handleIsOpenModalForUpdate">
        <template v-slot:text>
            <h2 class="orange">Atualizar dados do ato {{ idCover }}</h2>
            <form class="attForm" @submit.prevent="handleUpdate">
                <label for="detalhes">Detalhes:</label>
                <input type="text" :placeholder="'Detalhes do ato ' + idCover " name="detalhes" id="detalhes" :value="actDetails" :minlength="1" @change="handleDetails">
                <label for="novaCapa">Nova capa:</label>
                <input type="file" name="novaCapa" id="novaCapa" accept=".png" @change="handleFile">
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


    <div class="container">
        <img v-if="isReady" :src="BASE_URL + url" :alt="`Capa do ato ${idCover}`" class='imagem'>
        <h1 class="title" v-if="!handleDelete">ATO - {{ idCover }}</h1>
        <span class="rowContainer" v-if="handleDelete">
            <button class="update" @click="handleIsOpenModalForUpdate">🆙</button>
            <button class="delete" @click="handleIsOpenModalForDelete">❌</button>
        </span>
    </div>
</template>

<style scoped> 
    .titleBlack{
        color: black;
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
    .container {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .imagem{
        width: 100%;
        height: 100%;
    }
    .title{
        color: orange;
    }
</style>