<template>
  <div>
    <h1>Home</h1>
    <p>ask something using the prompt</p>
    <li v-for="message in messages">
      <span v-if="message.role === 'assistant'">Assistant: {{ formatMessageContent(message.content) }}</span>
      <span v-if="message.role === 'user'">Me: {{ formatMessageContent(message.content) }}</span>
    </li>


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