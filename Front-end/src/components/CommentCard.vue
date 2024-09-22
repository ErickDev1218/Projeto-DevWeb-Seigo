<script setup lang="ts">
import { defineProps } from 'vue'
import { api } from '@/api';
import { useUserStore } from '@/stores/userStore';

interface CommentProps {
    user: string
    comment: string
    id: number
}
const userStore = useUserStore()
const { jwt } = userStore
const role = userStore.role
const props = defineProps<CommentProps>()

async function deleteComment () {
    const id = props.id
    try {
        const res = await api.delete(`/comentarios/${id}`,{
            headers : {
                Authorization : `Bearer ${jwt}`
            }
        })
        if(res.status === 200) window.location.reload()
    }catch(e){  
        console.log(`Error ao apagar comentario ${e}`)
    }
}

</script>

<template>
    <div class="comentario" v-if="role === `Admin`">
        <div class="infosAdmin">
            <h3>{{ user }}</h3>
            <p>{{ comment }}</p>
            <button class="deleteButton" @click="deleteComment">
                Apagar
            </button>
        </div>
    </div>
    <div class="comentario" v-else>
        <div class="infos">
            <h3>{{ user }}</h3>
            <p>{{ comment }}</p>
        </div>
    </div>
</template>

<style scoped>
    .infosAdmin{
        padding: 1em;
        display: flex;
        width: 80%;
        height: 100%;
        align-items: center;
        justify-content: start;
        gap: 1em;
        max-height: 100%;
        overflow-y: auto;
        >h3{
            font-family: Poppins-Bold;
            font-size: 20px;
            color: orange;
        }
        >p{
            font-family: Poppins-Regular;
            font-size: 15px;
            color: white;
            white-space: normal;
            word-wrap: break-word;
            word-break: break-word;
        }
    }
    .deleteButton{
        all: unset;
        padding: 1em;
        border: 1px solid orange;
        border-radius: 1em;
        position: absolute;
        right: 1em;
        cursor: pointer;
    }
    .deleteButton:hover {
        background-color: red;
        color: white;
        border: 1px solid black;
        transition: background-color 0.3s, color 0.3s, border 0.2s;
    }
    .infos{
        padding: 1em;
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: start;
        gap: 1em;
        max-height: 100%;
        overflow-y: auto;
        >h3{
            font-family: Poppins-Bold;
            font-size: 20px;
            color: orange;
        }
        >p{
            font-family: Poppins-Regular;
            font-size: 15px;
            color: white;
            white-space: normal;
            word-wrap: break-word;
            word-break: break-word;
        }
    }
    .comentario{
        position: relative;
        max-width: 100%;
        min-height: 10vh;
        background-color: rgba(5, 11, 26, 0.5);;
        border-radius: 10px;
        border-radius: 1em;
        border : 1px solid orange;;
        
    }
</style>