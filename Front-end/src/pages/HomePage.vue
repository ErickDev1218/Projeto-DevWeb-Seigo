<script setup lang="ts">
import ActionCard from '@/components/ActionCard.vue'
</script>

<template>
    <div class="mainContainer">
        <img src="/images/teste.jpeg" alt="background img">
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
    justify-content: center;
    gap: 1.2em;
    align-items: start;
    padding-top: 1em;
    flex-wrap: wrap;
}
.mainContainer img{
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    z-index: -1;
    filter: grayscale(100%) blur(5px) brightness(0.3);   
}

.color{
    color: white;
}
</style>