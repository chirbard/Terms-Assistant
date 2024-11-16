<template>
  <div>
    <h1>Home</h1>
    <div class="chat-window">
      <li v-for="message in messages">
        <div class="message-bubble assistant" v-if="message.role === 'assistant'">Assistant: {{
          formatMessageContent(message.content) }}</div>
        <div class="message-bubble user" v-if="message.role === 'user'">Me: {{ formatMessageContent(message.content) }}
        </div>
      </li>
    </div>

    <input type="text" v-model="input" placeholder="ask me" />
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

<style scoped>
.chat-window {
  height: 200px;
  width: 300px;
  overflow: auto;
  border: 1px solid #ccc;
  padding: 0px;
  display: flex;
  flex-direction: column;
  /* justify-content: flex-start; */
  /* align-items: flex-start; */
}

li {
  list-style-type: none;
}

.message-bubble {
  margin: 4px;
  padding: 10px;
  border-radius: 10px;
  width: fit-content;
}

.assistant {
  background-color: #f0f0f0;
  margin-right: 16px;
  /* align-self: flex-start; */
  /* justify-self: start; */
}

.user {
  background-color: #f0f0f0;
  margin-left: 16px;
  /* align-self: flex-end; */
  /* justify-self: end; */
}

input {
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
}

button {
  margin: 10px;
  padding: 10px;
  border-radius: 10px;
}

button:hover {
  background-color: #f0f0f0;
}

button:active {
  background-color: #e0e0e0;
}
</style>