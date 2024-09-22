<script setup lang="ts">
    import { useUserStore } from '@/stores/userStore';
    import { ref, onMounted } from 'vue';
    import CapCard from '@/components/CapCard.vue';
    import type { capCardProps, FavoritesFormatResponse } from '@/types';
    import { api } from '@/api'


    const useStore = useUserStore()
    const { jwt } = useStore
    const allCap = ref<capCardProps[]>()
    
    onMounted(async () => {
        try {
            const { data } = await api.get(`/favoritos/?populate=*`, {
                headers : {
                    Authorization : `Bearer ${jwt}`
                }
            })
            const aux = data.data.filter((ea : FavoritesFormatResponse) => {
                return ea.user.id === Number(useStore.id) && ea.isFavorit === true
            })

            if(aux.length >= 1){
                const res = await api.get(`/cap-covers/?populate=*`)
                allCap.value = res.data.data.filter((ea: capCardProps) => {
                    return aux.some((auxEle: FavoritesFormatResponse) => {
                        return ea.idCapCover === auxEle.cap_cover.idCapCover;
                    });
                });
            }
        }catch(e){ 
            console.log(`Error ao buscar favoritos ${e}`)
        }
    })
</script>

<template>
    <div class="mainContainer">
        <h1>Bem-vindo de volta, {{ useStore.user.username }}!</h1>
        <div class="headerContainer">
            <h2>User: {{ useStore.user.username }}</h2>
            <h2>E-mail: {{ useStore.user.email }}</h2>
        </div>
        <h1>Favoritos:</h1>
        <div class="listCaps">
            <div v-for="(cap) in allCap" :key="cap.idCapCover" >
                <CapCard
                :url="cap.capCover.url" 
                :idCapCover="cap.idCapCover" 
                :isRouter="true"
                :forAdmin="false"
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
    .listCaps{
        display: flex;
        align-items: center;
        flex-wrap: nowrap;
        gap: 1em;
    }
</style>