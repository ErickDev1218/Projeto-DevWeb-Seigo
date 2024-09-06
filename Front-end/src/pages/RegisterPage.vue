<script lang="ts">
</script>

<template>
    <div class="mainContainer">
        <div class="registerContainer">
            <div class="insideImg">
                <img src="/images/registerimg.jpeg" alt="ilustracao registrar-se" class="imgLateral">
            </div>
            <div class="insideContent">
                <h1>Registre-se</h1>
                <label for="name">Nome</label>
                <input type="text" id="name" name="name">
                <label for="email">Email</label>
                <input type="email" id="email" name="email">
                <label for="password">Senha</label>
                <input type="password" id="password" name="password">
                <button type="submit">Registrar-se</button>
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
        justify-content: center;
        gap: 1em;
    }
    .registerContainer{
        width: 50%;
        height: 60%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        background-color: white ;
        border-radius: 1em;
    }
    .insideImg{
        width: 35%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .insideImg > img{
        width: 80%;
        height: 80%;
        object-fit: cover;
        border-radius : 1em;
    }
    .insideContent{
        width: 65%;
        height: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 1.2em;
    }
    .insideContent > h1{
        color: black;
    }

    .insideContent > label{
        color: black;
    }
    .insideContent > input{
        width: 50%;
        height: 2.5em;
        color: black;
        background-color: lightgray;
        border-radius: 1em;
    }

    .insideContent > button{
        width: 50%;
        height: 2.5em;
        background-color: lightgreen;
        color: black;
        border-radius: 1em;
        cursor: pointer;
    }

</style>