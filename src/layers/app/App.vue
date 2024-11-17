<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <RouterView />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');


#app {
  font-family: "Poppins", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid #ccc; */
  padding: 16px;

  background: radial-gradient(circle, #21d3d34e 0%, #fff 70%);
  background-position: -270px -50px;
  background-size: 200% 200%;
  background-repeat: no-repeat;
}

body {
  margin: 0px;
}
</style>
