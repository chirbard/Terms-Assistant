<template>
  <div class="header">
    <h1>term<span>sprint</span></h1>
  </div>
  <div class="chat-window">
    <li v-for="message in messages">
      <div class="message-bubble assistant glassmorphism" v-if="message.role === 'assistant'">{{
        formatMessageContent(message.content) }}</div>
      <div class="message-bubble user" v-if="message.role === 'user'">{{ formatMessageContent(message.content) }}
      </div>
    </li>
  </div>

  <div class="input-footer">
    <textarea type="text" v-model="input" placeholder="Ask anything" class="input-text glassmorphism"
      @input="autoResizeTextarea" @keydown.enter="handleEnter" />
    <button @click="request">
      <img src="./../../site/assets/svg/up-arrow.svg" alt="up arrow icon" />
    </button>
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
.header {
  width: 100%;
  text-align: left;
  border-bottom: 2px solid #BFDBDC;
  padding-bottom: 8px;
}

.header h1 {
  margin: 0;
  padding: 0px;
  font-weight: 800;
  font-size: 1.5rem;
  color: #004E66;
}

.header h1 span {
  font-weight: 400;
}

.glassmorphism {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 16px;
  box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  border: 1px solid #BFDBDC;
  color: #004E66;
  font-family: "Poppins", sans-serif;
}

.chat-window {
  height: fit-content;
  min-height: 200px;
  max-height: 400px;
  width: 100%;
  overflow: auto;
  padding: 8px 0px;
  margin-bottom: 4px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

::-webkit-scrollbar {
  width: 4px;
}

::-webkit-scrollbar-track {
  background: transparent;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #21d3d332;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #004E66;
}

li {
  list-style-type: none;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.message-bubble {
  margin: 4px 0px;
  padding: 10px;
  border-radius: 10px;
  width: fit-content;
  font-size: 0.8rem;
}

.assistant {
  margin-right: 16px;
}

.user {
  background-color: #004E66;
  color: #fff;
  margin-left: 16px;
  align-self: flex-end;
}


.input-footer {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.input-footer .input-text {
  flex-grow: 1;
  margin: 0;
  margin-right: 8px;
  padding: 10px;
  border-radius: 10px;
  font-size: 0.8rem;
  resize: none;
  overflow-y: auto;
  min-height: 20px;
  height: 20px;
  max-height: 60px;
}

.input-footer .input-text:focus {
  border-color: #21D3D3;
  outline: none;
}


.input-footer button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #21D3D3;
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input-footer button:hover {
  background-color: #21d3d3c4;
}
</style>