<script setup lang="ts">
    import { useUserStore } from '@/stores/userStore';
    import { ref } from 'vue';
    import CapCard from '@/components/CapCard.vue';
    import type { capCardProps, actionCardProps } from '@/types';


    const useStore = useUserStore()
    const allActs = ref<actionCardProps[]>()
    const allCap = ref<capCardProps[]>()

</script>

<template>
    <div class="mainContainer">
        <h1>Bem-vindo de volta, {{ useStore.user.username }}!</h1>
        <div class="headerContainer">
            <h2>User: {{ useStore.user.username }}</h2>
            <h2>E-mail: {{ useStore.user.email }}</h2>
        </div>
        <h1>Favoritos:</h1>
        <div class="listCaps" v-for="(actObj) of allActs" :key="actObj?.idCover">
            <div v-for="(cap) in allCap" :key="cap.idCapCover" >
                <CapCard v-if="cap.act_cover?.idCover === actObj?.idCover"
                :url="cap.capCover.url" 
                :idCapCover="cap.idCapCover" 
                :isRouter="true"
                :forAdmin="false"
                class="capCardContainer"
                />
            </div>
        </div>

    </div>
    
</template>

<style scoped>
    .mainContainer{
        width: 100%;
        height: 85vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 1em;
    }
</style>