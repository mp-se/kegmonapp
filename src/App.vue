<template>
  <dialog id="spinner" class="loading">
    <div class="container text-center">
      <div class="row align-items-center" style="height: 170px">
        <div class="col">
          <div class="spinner-border" role="status" style="width: 5rem; height: 5rem">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  </dialog>

  <div v-if="!global.initialized" class="container text-center">
    <BsMessage
      message="Initalizing Kegmon App interface"
      class="h2"
      :dismissable="false"
      alert="info"
    ></BsMessage>
  </div>

  <BsMenuBar v-if="global.initialized" :disabled="global.disabled" brand="Kegmon App" />

  <div class="container">
    <div>
      <p></p>
    </div>
    <BsMessage
      v-if="global.isError"
      :close="close"
      :dismissable="true"
      :message="global.messageError"
      alert="danger"
    />
    <BsMessage
      v-if="global.isWarning"
      :close="close"
      :dismissable="true"
      :message="global.messageWarning"
      alert="warning"
    />
    <BsMessage
      v-if="global.isSuccess"
      :close="close"
      :dismissable="true"
      :message="global.messageSuccess"
      alert="success"
    />
    <BsMessage
      v-if="global.isInfo"
      :close="close"
      :dismissable="true"
      :message="global.messageInfo"
      alert="info"
    />
  </div>

  <router-view v-if="global.initialized" />
</template>

<script setup>
import BsMenuBar from '@/components/BsMenuBar2.vue'
import { onMounted, watch } from 'vue'
import { global, config, brewfatherStore } from '@/modules/pinia'
import { storeToRefs } from 'pinia'
import { logDebug } from '@/modules/logger'

const { disabled } = storeToRefs(global)

const close = (alert) => {
  logDebug('App.close()', alert)

  if (alert == 'danger') global.messageError = ''
  else if (alert == 'warning') global.messageWarning = ''
  else if (alert == 'success') global.messageSuccess = ''
  else if (alert == 'info') global.messageInfo = ''
}

watch(disabled, () => {
  logDebug('App.watch(disabled)')

  if (global.disabled) document.body.style.cursor = 'wait'
  else document.body.style.cursor = 'default'
})

onMounted(() => {
  logDebug('App.onMounted()')

  config.load()
  brewfatherStore.load()
  global.initialized = true
})
</script>

<style>
.loading {
  position: fixed;
  width: 200px;
  height: 200px;
  padding: 10px;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border: 0;
}

dialog::backdrop {
  background-color: black;
  opacity: 60%;
}
</style>
