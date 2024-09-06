<script setup lang="ts">
    import { ref } from 'vue'

    const identifier = ref('')
    const password = ref('')
    const loading = ref(false)
    const error = ref<Error>()

    async function authenticate() {
        
    }
</script>


<template>
    <div class="loginSquare">
        <div class="logo" >
            <img class='imagem' src="/images/logo2.png" alt="">
        </div>
        <div class="loginSItems">
            <div v-if="error" class="AlertaErro" role="alert">
                {{ error.message }}
            </div>
            <div v-if="loading" class="spinner-grow" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
            <form v-else class="loginForm" @submit.prevent="authenticate">
                <h5 class="loginTitle">Login</h5>
                <div class="login">
                    <input type="email" class="loginKey" id="emailInput" placeholder="Email" v-model="identifier" required>
                    <span class="loginBox"></span>
                    <!-- <div class="invalidFeedback">
                            Você deve informar um email válido.
                    </div> -->
                </div>
                <div class="login">
                    <input type="password" class="loginKey" id="passInput" placeholder="Senha" v-model="password" required>
                    <span class="loginBox"></span>
                    <!-- <div class="invalidFeedback">
                            Preencha este campo!
                    </div> -->
                </div>
                <div class="loginCont">
                    <button class="loginButton">Login</button>
                </div>
                <div class="loginCreate">
                    <a class="create" href="#">"Create your Account"</a>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped>
    .loginSquare{
        display: flex;
        flex-wrap: wrap;
        background-color: #fff;
        width: 700px;
        height: 480px;
        border-radius: 10px;
        justify-content: space-between;
        margin: auto;
        margin-top: 5%;
        padding: 20px;
        background-color: #ffffff;
    }

    .logo{
        margin: auto;
    }

    .imagem{
        width: 100%;
        height: 350px;
    }

    .loginSItems{
        width: 50%;
        /* background-color:#f2f2f2 ; */
        border-radius: 10px;
    }
    
    .loginTitle{
        color: #333;
        font-size: 25px;
        font-family: Poppins-Bold;
        text-align: center;
        width: 100%;
        padding-bottom: 80px;
        padding-top: 10px;
    }
    
    .login{
        padding: 5px;
    }
    
    .loginKey{
        display: block;
        font-family: Poppins-Regular;
        font-size: 15px;
        color:#666;
        margin: auto;
        width: 90%;
        background: #e5e5e5;
        height: 50px;
        border-radius: 25px;
        line-height: 1.5;
        padding: 0 30px 0 70px;
    }

    .loginKey:focus {
        width: 100%;
    }

    .loginBox{
        display: block;
        position: absolute;
        border-radius: 25px;
        bottom: 0;
        left: 0;
        z-index: -1;
        width: 100%;
        height: 100%;
        box-shadow: 0 0;
        color: rgba(87, 184, 70, .8);
    }
    
    .loginCont{
        margin: auto;
        width: 90%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        padding-top: 20px;
    }

    .loginButton{
        display: flex;
        background-color: rgba(87, 184, 70, .8);
        font-size: 15px;
        font-family: Poppins-Regular;
        border-radius: 25px;
        line-height: 1.5;
        color: #fff;
        text-transform: uppercase;
        width: 100%;
        height: 50px;
        padding: 0 25px;
        justify-content: center;
        align-items: center;
    }

    .loginCreate {
        padding-top: 115px;
        text-align: center;
    }

    .create{
        font-size: 13px;
        font-family: Poppins-Regular;
        text-decoration: none;
        line-height: 1.5;
        color: #333;
    }

    .create:hover {
        color:rgba(87, 184, 70, .8);
    }
</style>