<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { BASE_URL } from './api'


</script>

<template>
    <div class="img">
      <img src="/images/Top-Image.jpeg" alt="Logo">
      <li class="list">
        <RouterLink :to="'/'" class="listItem">Home</RouterLink>
        <ul class="listItem">Contato</ul>
        <ul class="listItem">Login</ul>
      </li>
    </div>
  
  <RouterView />
</template>

<style scoped>
  .list{
    list-style-type: none;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 50%;
    margin-bottom: 1em;
  }
  .listItem{
    padding: 0.5em;
    cursor: pointer;
  }
  .listItem:hover{
    border-radius: 1em;
    background-color: rgb(128, 2, 128);
    color: black;
    transition: background-color 0.3s,color 0.3s;

  }
  .img{
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
  .img img{
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
