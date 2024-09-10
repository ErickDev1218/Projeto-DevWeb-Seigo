<script lang="ts">
</script>

<template>
    <div class="registerContainer">
        <div class="insideImg">
            <img src="/images/registerimg.jpeg" alt="ilustracao registrar-se" class="imgLateral">
        </div>
        <div class="insideContent">
            <h5 class="regTitle">Registre-se</h5>
            <form class="regForm">
                <input type="text" id="name" name="name" placeholder="Nome" class="regInput">
                <input type="email" id="email" name="email" placeholder="Email" class="regInput">
                <input type="password" id="password" name="password" placeholder="Senha" class="regInput">
                <input type="password" id="confPassword" name="confPassword" placeholder="Confirme a senha" class="regInput">
                <button type="submit" class="regButton">Registrar</button>
            </form>
        </div>
    </div>
</template>

<style scoped>
    .regForm{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1em;
    }
    .registerContainer{
        margin-top: 5%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        width: 40%;
        min-height: 55vh;
        border-radius: 1em;
        background-color: white ;
        padding: 20px;
    }
    .insideImg{
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .insideImg > img{
        width: 100%;
        object-fit: cover;
    }
    .insideContent{
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2em;
    }
    .regTitle{
        color: #333;
        font-size: 25px;
        font-family: Poppins-Bold;
        text-align: center;
    }
    .regInput{
        appearance: none;
        outline: none;
        font-family: Poppins-Regular;
        font-size: 15px;
        color:white;
        margin: auto;
        width: 90%;
        background-color: #777777;
        height: 50px;
        border-radius: 25px;
        line-height: 1.5;
        padding: 0 30px 0 70px;
        border: 2px solid black;
    }
    .regButton{
        width: 90%;
        background-color: black;
        font-size: 1em;
        border-radius: 2em;
        color: #fff;
        height: 3.2em;
        font-family: Poppins-Bold;
    }
    .regButton:hover{
        width: 100%;
        background-color: orange;
        color: black;
        transition: background-color 0.5s, color 0.5s,width 0.3s;
    }
    .regInput::placeholder{
        color: white;
    }
    .regInput:focus {
        width: 100%;
        border: 2px solid orange;
        transition: width 0.3s, border 0s;
    }

</style>