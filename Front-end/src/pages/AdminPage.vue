<script setup lang="ts">
    import { api } from '@/api'
    import { ref, onMounted } from 'vue'
    import CustomModal from '@/components/CustomModal.vue'
    import { useUserStore } from '@/stores/userStore'
    import type { actionCardProps, capCardProps } from '@/types'
    import ActionToUse from '@/components/ActionToUse.vue'
    import CapCard from '@/components/CapCard.vue'

    const useStore = useUserStore()
    const jwt = useStore.jwt
    const allActs = ref<actionCardProps[]>()
    const allCap = ref<capCardProps[]>()
    const loading = ref<boolean>(true)
    const isOpenModalToCreateNewAct = ref<boolean>(false)
    const isOpenModalToCreateNewCap = ref<boolean>(false)
    //Varaveis de criar um ato.
    const createIdCover = ref('')
    const createActDetails = ref('')
    const createIsReady = ref<boolean>(false)
    const createActCover = ref()
    //Variaveis de criar um capítulo
    const createIdCap = ref('')
    const createIdAct = ref('')
    const createCapCover = ref()
    const createCapPages = ref()

    function handleIdCover(e : Event){
        const input = e.target as HTMLInputElement;
        if (input.value) {
            createIdCover.value = input.value;
        }
    }
    function handleActDetails(e : Event){
        const input = e.target as HTMLInputElement;
        if (input.value) {
            createActDetails.value = input.value;
        }
    }
    function handleIsReady(e : Event){
        const input = e.target as HTMLInputElement;
        createIsReady.value = input.checked;
    }
    function handleActCover(e : Event){
        const input = e.target as HTMLInputElement;
        if (input.files) {
            createActCover.value = input.files[0];
        }
    }
    async function handleCreateAct() {
        try{
            const datas = new FormData()
            datas.append('data', JSON.stringify({
                idCover: createIdCover.value,
                actDetails: createActDetails.value,
                isReady: createIsReady.value
            }))
            datas.append('files.actCover', createActCover.value) // Adiciona o arquivo
            const res = await api.post('/act-covers',datas,{
                headers : {
                    Authorization : `Bearer ${jwt}`
                }
            })
            if(res.status === 200){
                window.location.reload()
            }
        }catch(e){  
            console.log(`Error ao criar um ato ${e}`)
        }
    }
    //Fim das coisas de criar um ato.
    //Deletando ato
    async function handleDeleteAct(id : string){
        try{
            const { data } = await api.get(`/act-covers`)
            const obj = data.data.filter((ea : actionCardProps) => ea.idCover === id)
            const res = await api.delete(`/act-covers/${obj[0].id}`,{
                headers : {
                    Authorization : `Bearer ${jwt}`
                }
            })
            if(res.status === 200){
                window.location.reload()
            }

        }catch(e){
            console.log(`Error ao deletar o ato ${e}`)
        }
    }
    // Fim do delete no ato.
    //Inicio comandos para criar capítulo
    function handleIdCap(e : Event){
        const input = e.target as HTMLInputElement;
        if (input.value) {
            createIdCap.value = input.value;
        }
    }
    function handleIdAct (e : Event){
        const input = e.target as HTMLInputElement;
        if (input.value) {
            createIdAct.value = input.value;
        }
    }
    function handleCapCover (e : Event) {
        const input = e.target as HTMLInputElement;
        if (input.files) {
            createCapCover.value = input.files[0];
        }
    }
    function handleCapPages(e : Event){
        const input = e.target as HTMLInputElement;
        if (input.files) {
            createCapPages.value = [... input.files]
        }
    }
    async function handleCreateCap () {
        try{
            //Cria o manga
            let datas = new FormData()
            datas.append('data', JSON.stringify({
                idMangaPicture: createIdCap.value
            }))
            createCapPages.value.forEach((file: File) => {
                datas.append('files.pictures', file);
            }); 
            
            let res = await api.post(`/manga-pictures`,datas,{
                headers : {
                    Authorization : `Bearer ${jwt}`,
                    'Content-Type': 'multipart/form-data',
                }
            })
            const mangaToCap = res.data.data.id
            //Pega o id verdadeiro do ato
            const { data } = await api.get(`/act-covers/?populate=*`)
            //Cria a capa do capitulo
            datas = new FormData()
            datas.append(`data`,JSON.stringify({
                idCapCover: createIdCap.value,
                manga_pictures : mangaToCap,
                act_cover : data.data.filter((ea : actionCardProps) => ea.idCover === createIdAct.value)[0].id
            }))

            datas.append('files.capCover', createCapCover.value) // Adiciona o arquivo

            res = await api.post(`/cap-covers`,datas,{
                headers : {
                    Authorization : `Bearer ${jwt}`,
                }
            })
            if(res.status === 200){
                window.location.reload()
            }
        }catch(e){
            console.log(`Error ao criar um capitulo ${e}`)
        }
    }
    onMounted(async () => {
        try{
            const { data } = await api.get(`/act-covers?populate=*`)
            allActs.value = data.data.filter((ea : actionCardProps) => ea.isReady)
            const res = await api.get(`/cap-covers?populate=*`)
            allCap.value = res.data.data
        }catch(e){  
            console.log(`Error ao tentar pegar todos os atos ${e}`)
        }
        finally {
            loading.value = false
        }
    })

</script>
<template>
    <div class="mainContainer">
        <h1>Bem-vindo de volta, administrador!</h1>

        <CustomModal 
        v-if="isOpenModalToCreateNewAct" 
        @close="()=>{isOpenModalToCreateNewAct = !isOpenModalToCreateNewAct}"
        >
            <template v-slot:text>
                <h2 class="orange">Criar um novo ato</h2>
                <form class="createForm" @submit.prevent="handleCreateAct">
                    <label for="idCover">Id Cover:</label>
                    <input type="text" required @change="handleIdCover">
                    <label for="actDetails">Detalhes do ato:</label>
                    <input type="text" required @change="handleActDetails">
                    <span class="lineInput">
                        <label for="isReady">O ato está pronto ?</label>
                        <input type="checkbox" name="isReady" id="isReady" @change="handleIsReady">
                    </span>
                    <label for="actCover">Foto do ato:</label>
                    <input type="file" name="actCover" id="actCover" accept=".png" @change="handleActCover">
                    <div class="buttonContainer">
                        <button class="button cancel" @click="()=>{isOpenModalToCreateNewAct = !isOpenModalToCreateNewAct}">
                            Cancelar
                        </button>
                        <button class="button confirm" type="submit">
                            Confirmar
                        </button>
                    </div>
                </form>
            </template>
        </CustomModal>
        
        <CustomModal 
        v-if="isOpenModalToCreateNewCap" 
        @close="()=>{isOpenModalToCreateNewCap = !isOpenModalToCreateNewCap}"
        >
            <template v-slot:text>
                <h2 class="orange">Criar um novo capítulo</h2>
                <form class="createForm" @submit.prevent="handleCreateCap">
                    <label for="idCap">Id do capítulo:</label>
                    <input type="text" required @change="handleIdCap">
                    <label for="idAct">Id do ato:</label>
                    <input type="text" id="idAct" required @change="handleIdAct">
                    <label for="capCover">Capa do capítulo:</label>
                    <input type="file" name="capCover" id="capCover" accept=".png" @change="handleCapCover">
                    <label for="capPage">Páginas do capítulo:</label>
                    <input type="file" name="capPage" id="capPage" multiple accept=".png" @change="handleCapPages">
                    <div class="buttonContainer">
                        <button class="button cancel" @click="()=>{isOpenModalToCreateNewCap = !isOpenModalToCreateNewCap}">
                            Cancelar
                        </button>
                        <button class="button confirm" type="submit">
                            Confirmar
                        </button>
                    </div>
                </form>
            </template>
        </CustomModal>

        <span v-if="!loading" class="buttonContainer">
            <button class="addNew" @click="()=>{isOpenModalToCreateNewAct = !isOpenModalToCreateNewAct}">Adicionar novo ato</button>
            <button class="addNew" @click="()=> {isOpenModalToCreateNewCap = !isOpenModalToCreateNewCap}">Adicionar novo capítulo</button>
        </span>
        <p v-if="loading">Carregando ...</p>
        <div class="actContainer" v-else>
                <div class="rowInfoContainer" v-for="(actObj) of allActs" :key="actObj?.idCover">
                    <div class="cardContainer">
                        <ActionToUse
                        :key="actObj?.idCover" 
                        :url="actObj?.actCover !== null ? actObj?.actCover?.url : ''"
                        :actDetails="actObj?.actDetails"
                        :isReady="actObj?.isReady"
                        :idCover="actObj?.idCover"
                        :handleDelete="handleDeleteAct"
                        />
                    </div>
                    <div class="capListContainer">
                        <template v-for="(cap) in allCap" :key="cap.idCapCover" >
                            <CapCard v-if="cap.act_cover?.idCover === actObj?.idCover"
                            :url="cap.capCover.url" 
                            :idCapCover="cap.idCapCover" 
                            :isRouter="false"
                            :forAdmin="true"
                            :key="cap.idCapCover"
                            />
                        </template>
                    </div>
                </div>
        </div>
    </div>
</template>
<style scoped>
    .capListContainer{
        width: 80%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    .rowInfoContainer{
        width: 100%;
        height: fit-content;
        display: flex;
        align-items: center;
        justify-content: space-between
    }
    .lineInput{
        display: flex;
        align-items: center;
        gap: 2em;
        >label {
            color: black;
        }
    }
    .createForm{
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
    .orange{
        color: orange;
    }
    .addNew{
        all: unset;
        padding: 1em;
        background-color: orange;
        color: white;
        border-radius: 1em;
        cursor: pointer;
    }
    .addNew:hover{
        box-shadow: 0px 0px 10px white;
        transition: box-shadow 0.2s;
    }
    .cardContainer{
        width: 232px;
        height: 416px;
        display: flex;
        align-items: center;
        justify-items: end;
    }
    .actContainer{
        /* border: 1px solid white; */
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 80vh;
        overflow-y: auto;
        padding-left: 2em;
        gap: 3em;
    }
    .mainContainer{
        width: 100%;
        height: 85vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        padding: 1em;
        gap: 1em;
    }
    .buttonContainer{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
        color: black;
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
</style>
