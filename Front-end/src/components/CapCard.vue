<script setup lang="ts">
interface CapCardProps  {
    text:string
}
defineProps<CapCardProps>()
</script>

<template>
    <div class="capContainer">
        <p>
            {{ text }}
        </p>    
    </div>
</template>

<style scoped>
    .capContainer{
        width: 100%;
        height: 80px;
    }
</style>