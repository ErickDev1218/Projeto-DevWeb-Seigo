<script setup lang="ts">
import { defineProps } from 'vue'

interface CommentProps {
    user: string
    comment: string
}

const props = defineProps<CommentProps>()

</script>

<template>
    <div class="comentario">
        <h3>{{ user }}</h3>
        <p>{{ comment }}</p>
    </div>
</template>

<style scoped>
    .comentario{
        max-width: 100%;
        background-color: rgba(10,23,55,0.5);;
        border-radius: 10px;
        padding: 2em;
        border-radius: 1em;
        border : 1px solid orange;;
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
</style>