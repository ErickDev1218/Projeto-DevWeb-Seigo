<script setup lang="ts">
    import { RouterLink } from 'vue-router';
    import router from '@/router'
    import { api } from '@/api'
    import { useUserStore } from '@/stores/userStore';
    import { ref } from 'vue';

    //Zod imports
    import { useField, useForm } from 'vee-validate';
    import { toTypedSchema } from '@vee-validate/zod';
    import * as zod from 'zod';

    const userStore = useUserStore();

    const scheme = toTypedSchema(
        zod.object({
            email: zod.string().email({message : 'Digite um email válido!'}),
            password: zod.string().min(5, {message : 'Digite uma senha válida!'})
        })
    )
    const { handleSubmit, errors } = useForm({
        validationSchema: scheme,
    })
    let exception = ref('');
    const {value : email } = useField('email')
    const {value : password} = useField('password')
    const handleAuthenticate = handleSubmit (async values => {
        // Escrever função de autenticacao aqui
        try{
            //Pq .post ? O codigo do Bruno esta assim
            const { data } = await api.post(`/auth/local`, {
                identifier: values.email,
                password: values.password
            })
            const {jwt} = data
            const res = await api.get('/users/me',{
                headers: {
                    Authorization: `Bearer ${jwt}`
                },
                params: {
                    populate: 'role'
                }
            })
            const role = res.data.role.type

            userStore.authenticated(res.data, jwt)

            if(role === 'admin'){
                router.push(`/admin`)
            }else{
                router.push(`/`)
            }
        }catch(e){
            console.log(`Error ao autenticar ${e}`)
            exception.value = 'Credenciais incorretas!';
        }
        finally{
            setTimeout(()=> {
                exception.value = '';
            }, 5000)
        }
    })
</script>


<template>
    <div class="loginSquare">
        <div class="logo" >
            <img class='imagem' src="/images/logo2.png" alt="">
        </div>
        <div class="loginSItems">
            <h5 class="loginTitle">Login</h5>
            <form class="loginForm" @submit.prevent="handleAuthenticate">
                <input type="email" class="loginKey" id="email" placeholder="Email" v-model="email" >
                <p class="errorMessage">{{ errors.email === 'Required' ? 'Este campo é obrigatório!' : errors.email }}</p>
                <input type="password" class="loginKey" id="password" placeholder="Senha" v-model="password" >
                <p class="errorMessage">{{ errors.password === 'Required' ? 'Este campo é obrigatório!' : errors.password }}</p>
                <button class="loginButton" type="submit">Login</button>
                <p v-if="exception" class="errorMessage">{{ exception }}</p>
            </form>
            <RouterLink class="create" :to="'/register'">Crie sua conta</RouterLink>

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
        transition: width 0.3s, border 0s;
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
    .errorMessage{
        color: red;
    }

</style>