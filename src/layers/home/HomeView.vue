<template>
  <div>
    <h1>Home</h1>
    <p>Welcome to the Home page!</p>
    <p>last request: {{ lastRequest }}</p>
    <p>response: {{ response }}</p>


    <input type="text" v-model="input" />
    <button @click="request">make request</button>

  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import homeScript from './home-script';

export default defineComponent({
  ...homeScript
});
</script>

<style scoped></style>