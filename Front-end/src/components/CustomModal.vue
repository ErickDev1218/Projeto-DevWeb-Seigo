<script setup lang="ts">
    import { defineEmits } from 'vue'
    import { BASE_URL } from '@/api'

    interface CustomModalProps {
        toSee ?: boolean
        onConfirm ?: () => void
        url ?: string

    }
    defineProps<CustomModalProps>()
    const emit = defineEmits(['close','previous','next'])
    const closeModal = () : void => {
        emit('close')
    }
    const previousPage = () : void => {
        emit('previous')
    }
    const nextPage = () : void => {
        emit('next')
    }
    const handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'ArrowRight') {
        nextPage()
    } else if (event.key === 'ArrowLeft') {
        previousPage()
    }else if(event.key === 'Escape'){
        closeModal()
    }
}
    
</script>

<template>
    <div id="allPage">

        <div class="mangaContainer" @keydown="handleKeydown" v-if="toSee">
            <button class="stepButton" @click="previousPage">⏪</button>
            <img :src="BASE_URL + url" alt="pagina" class="renderImage">
            <button class="stepButton" @click="nextPage">⏩</button>
            <button @click="closeModal" id="closeButton">❌</button>
        </div>

        <div class="modalContainer" v-else>
            <slot name="text">
                Insira o texto aqui
                <div class="buttonContainer">
                    <button @click="closeModal" class="button cancel">
                        Cancelar
                    </button>
                    <button @click="onConfirm && onConfirm()" class="button confirm">
                        Confirmar
                    </button>
                </div>
            </slot>

            <button @click="closeModal" id="closeButton">❌</button>
        </div>
    </div>
</template>

<style scoped>
    #allPage{
        width: 100%;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.8);
        z-index: 10;
    }
    #closeButton{
        font-size: x-large;
        cursor: pointer;
        position: absolute;
        top: 20px;
        right: 25px;
        background: none;
        border: none;
        outline: none;
        box-shadow: none;
    }
    .modalContainer{
        min-width: 30%;
        min-height: 30%;
        background-color: white;
        border-radius: 2em;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        position: relative;
        color: black;
        padding: 1em;
        gap: 2em;
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
    .mangaContainer{
        width: 80%;
        height: 80%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 2em;
    }
    .renderImage{
        max-width: 100vw;
        max-height: 100vh;
        /* width: 80%;
        height: 90%;
        max-height: 100%; */
    }
    .stepButton{
        all: unset;
        font-weight: bolder;
        font-size: xx-large;
        cursor: pointer;
    }
</style>