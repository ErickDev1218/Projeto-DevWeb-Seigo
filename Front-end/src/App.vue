<script setup lang="ts">
  import { RouterLink, RouterView } from 'vue-router'
  import { useUserStore } from './stores/userStore';

  const userStore = useUserStore()
</script>

<template>
  <div class="masterContainer">
    
    <div class="headerContainer">
      <img src="/images/Top-Image.jpeg" alt="Logo" class="header">

      <ul class="list" v-if="!userStore.jwt">
        <li>
          <RouterLink :to="'/'" class="listItem">Tela inicial</RouterLink>
        </li>
        <li>
          <RouterLink :to="'/register'" class="listItem">Registrar</RouterLink>
        </li>
        <li>
          <RouterLink :to="'/login'" class="listItem">Login</RouterLink>
        </li>
      </ul>

      <ul class="list" v-else>
        <li>
          <RouterLink :to="'/'" class="listItem">Tela inicial</RouterLink>
        </li>
        <li>
          <RouterLink :to="userStore.role === 'Admin' ? '/admin' : '/profile/:id' " class="listItem">{{ userStore.user.username }}</RouterLink>
        </li>
        <li class="userAndLogout">
          <RouterLink :to="'/'" class="listItem" @click="userStore.logout">Logout</RouterLink>
        </li>
      </ul>
    </div>
    <img src="/images/teste.jpeg" alt="background img" class="backgroundFullPic">
    <div class="pageRest">
      <RouterView />
    </div>
  </div>
</template>



<style scoped>
  .masterContainer {
    width: 100%;
    height: 100vh;
  }
  .pageRest{
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .backgroundFullPic{
      width: 100%;
      height: 85vh;
      object-fit: cover;
      position: absolute;
      z-index: -1;
      filter: grayscale(100%) blur(5px) brightness(0.3);   
      overflow: hidden;
  }
  .list{
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 50%;
    margin-bottom: 1em;
  }
  .listItem{
    font-family: Poppins-Bold;
    padding: 0.5em;
    cursor: pointer;
    text-decoration: none;
  }
  .listItem:hover{
    border-radius: 1em;
    background-color: orange;
    color: black;
    transition: background-color 0.3s,color 0.3s;

  }
  .headerContainer{
    background-repeat: no-repeat;
    background-size: cover;
    filter: blur();
    height: 15vh;
    width: 100%;
    display: flex;
    align-items: end;
    justify-content: end;
    background-color: rgba(0,0,0,0.3);
    background-blend-mode:overlay;
    overflow : hidden;
  }
  .header{
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    filter : blur(0px);
  }



</style>