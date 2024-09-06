<script setup lang="ts">
    import { ref } from 'vue'
    import { RouterLink } from 'vue-router';

    const identifier = ref('')
    const password = ref('')

    async function authenticate() {
        
    }
</script>


<template>
    <div class="loginSquare">
        <div class="logo" >
            <img class='imagem' src="/images/logo2.png" alt="">
        </div>
        <div class="loginSItems">
            <h5 class="loginTitle">Login</h5>
            <form class="loginForm" @submit.prevent="authenticate">
                <input type="email" class="loginKey" id="emailInput" placeholder="Email" v-model="identifier" required>
                <input type="password" class="loginKey" id="passInput" placeholder="Senha" v-model="password" required>
                <button class="loginButton" type="submit">Login</button>
            </form>
            <RouterLink class="create" :to="'/'">Crie sua conta</RouterLink>

        </div>
    </div>
</template>

<style scoped>
    .loginSquare{
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        width: 40%;
        height: 55vh;
        border-radius: 1em;
        justify-content: space-between;
        margin-top: 5%;
        padding: 20px;
        background-color: #ffffff;
    }

    .logo{
       width: 50%;
       display: flex;
       flex-direction: column;
       justify-content: center;
       align-items: center;
    }
    .imagem{
        width: 80%;
        height: 80%;
        object-fit:cover ;
    }

    .loginSItems{
        width: 50%;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 2em;
    }
    
    .loginTitle{
        color: #333;
        font-size: 25px;
        font-family: Poppins-Bold;
        text-align: center;
    }
    
    .login{
        padding: 1em;
    }
    
    .loginKey{
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
    .loginKey::placeholder{
        color: white;
    }
    .loginKey:focus {
        width: 100%;
        border: 2px solid orange;
    }

    .loginButton{
        width: 90%;
        background-color: black;
        font-size: 1em;
        border-radius: 2em;
        color: #fff;
        height: 3.2em;
        font-family: Poppins-Bold;
    }
    .loginButton:hover{
        width: 100%;
        background-color: orange;
        color: black;
        transition: background-color 0.5s, color 0.5s,width 0.3s;
    }

    .create{
        font-size: 1em;
        font-family: Poppins-Regular;
        text-decoration: none;
        line-height: 1.5;
        color: black;
    }

    .create:hover {
        color:orange;
    }

    .loginForm{
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1em;
    }

</style>