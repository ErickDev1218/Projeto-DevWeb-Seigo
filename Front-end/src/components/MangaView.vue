<script setup lang="ts">
    import { defineEmits } from 'vue'

    const emit = defineEmits(['close'])
    const closeModal = () : void => {
        emit('close')
    }
</script>

<template>
    <div id="allPage">
        <div class="modalContainer">
            <h1>Hello World</h1>
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
        width: 80%;
        height: 90%;
        background-color: white;
        border-radius: 2em;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
        position: relative;
        > h1 {
            color: black;
        }
    }
</style>