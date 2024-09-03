<script setup lang="ts">
import ActionCard from '@/components/ActionCard.vue'
</script>

<template>
    <div class="mainContainer">
        <ActionCard />
        <ActionCard />
        
        <ActionCard />
    </div>
</template>

<style scoped>
.mainContainer{
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: space-around;
    align-items: start;
    padding-top: 1em;
    flex-wrap: wrap;
}
.color{
    color: white;
}
</style>