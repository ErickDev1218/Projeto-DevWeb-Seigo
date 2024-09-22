<script lang="ts" setup>
    //Zod imports
    import { useField, useForm } from 'vee-validate';
    import { toTypedSchema } from '@vee-validate/zod';
    import { useUserStore } from '@/stores/userStore';
    import { api } from '@/api'
    import router from '@/router'
    import * as zod from 'zod';

    const userStore = useUserStore();
    
    const scheme = toTypedSchema(
        zod.object({
            name : zod.string().min(4,{message: `Digite um nome válido!`}),
            email: zod.string().email({message : 'Digite um email válido!'}),
            password: zod.string().min(6, {message : 'Digite uma senha com pelo menos 6 caracteres!'}),
            confPassword: zod.string()
        }).refine((data) => data.password === data.confPassword,{
            message: 'As senhas devem ser iguais!',
            path: ['confPassword']
        })
    )
    const { handleSubmit, errors } = useForm({
        validationSchema:scheme,
    })
    const {value : name} = useField('name')
    const {value : email} = useField('email')
    const {value : password} = useField('password')
    const {value : confPassword} = useField('confPassword')

    const handleRegister = handleSubmit( async value => {
        //Escrever a funcao de registrar aqui
        try{
            const { data } = await api.post('/auth/local/register', {
                username : value.name,
                password : value.password,
                email : value.email,
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

            if(role === 'authenticated'){
                router.push(`/`)
            }else{
                console.log(`Error no login pos registrar`)
            }
        }catch(e){
            console.log(`Error ao criar usuario ${e}`)
        }
        
    })
</script>

<template>
    <div class="registerContainer">
        <div class="insideImg">
            <img src="/images/registerimg.jpeg" alt="ilustracao registrar-se" class="imgLateral">
        </div>
        <div class="insideContent">
            <h5 class="regTitle">Registre-se</h5>
            <form class="regForm" @submit.prevent="handleRegister">
                <input v-model="name" type="text" id="name" name="name" placeholder="Nome" class="regInput">
                <p class="errorMessage">{{ errors.name === 'Required' ? `Este campo é obrigatório!` : errors.name }}</p>
                <input v-model="email" type="email" id="email" name="email" placeholder="Email" class="regInput">
                <p class="errorMessage">{{ errors.email === 'Required' ? `Este campo é obrigatório!` : errors.email }}</p>
                <input v-model="password" type="password" id="password" name="password" placeholder="Senha" class="regInput">
                <p class="errorMessage">{{ errors.password === 'Required' ? `Este campo é obrigatório!` : errors.password }}</p>
                <input v-model="confPassword" type="password" id="confPassword" name="confPassword" placeholder="Confirme a senha" class="regInput">
                <p class="errorMessage">{{ errors.confPassword === 'Required' ? `Este campo é obrigatório!` : errors.confPassword }}</p>   
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
    .errorMessage{
        color: red;
    }
</style>