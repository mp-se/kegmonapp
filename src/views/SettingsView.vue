<template>
  <div class="container">
    <p></p>
    <p class="h3">Settings</p>
    <hr />

    <form @submit.prevent="saveSettings" class="needs-validation" novalidate>
      <div class="row">
        <div class="col-md-12">
          <BsInputText
            v-model="config.kegmon_url"
            label="Kegmon URL"
            type="url"
            help=""
            :disabled="global.disabled"
          >
          </BsInputText>
        </div>

        <div class="col-md-6">
          <BsInputText
            v-model="config.brewfather_apikey"
            label="Brewfather API Key"
            type="passwrod"
            help=""
            :disabled="global.disabled"
          >
          </BsInputText>
        </div>

        <div class="col-md-6">
          <BsInputText
            v-model="config.brewfather_userkey"
            label="Brewfather USER Key"
            type="passwrod"
            help=""
            :disabled="global.disabled"
          >
          </BsInputText>
        </div>

        <div class="col-md-4">
          <BsInputRadio
            v-model="config.dark_mode"
            :options="darkModeOptions"
            label="Dark mode"
            :disabled="global.disabled"
          ></BsInputRadio>
        </div>
      </div>

      <div class="row gy-2">
        <div class="col-md-12">
          <hr />
        </div>
        <div class="col-md-12">
          <button type="submit" class="btn btn-primary w-2" :disabled="global.disabled">Save</button
          >&nbsp;
          <button
            type="button"
            @click="importSettingsFromKegmon()"
            class="btn btn-secondary w-2"
            :disabled="global.disabled"
          >
            Fetch settings from Kegmon</button
          >&nbsp;
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { global, config } from '@/modules/pinia'
import { logDebug, logError } from '@/modules/logger'
import { validateCurrentForm } from '@/modules/utils'

const darkModeOptions = ref([
  { label: 'Dark Mode', value: true },
  { label: 'Day Mode', value: false }
])

const importSettingsFromKegmon = () => {
  logDebug('SettingsView.importSettingsFromKegmon()')

  var base = btoa('kegmon:password')
  var token = ''

  global.clearMessages()
  global.disabled = true

  if (config.kegmon_url == '') {
    global.messageError = 'You need to enter an URL to the local kegmon device'
    return
  }

  if (!config.kegmon_url.endsWith('/')) config.kegmon_url += '/'

  fetch(config.kegmon_url + 'api/auth', {
    method: 'GET',
    headers: { Authorization: 'Basic ' + base },
    signal: AbortSignal.timeout(global.fetchTimout)
  })
    .then((res) => res.json())
    .then((json) => {
      logDebug('SettingsView.importSettingsFromKegmon()', json)
      token = json.token

      fetch(config.kegmon_url + 'api/config', {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + token },
        signal: AbortSignal.timeout(global.fetchTimout)
      })
        .then((res) => res.json())
        .then((json) => {
          logDebug('SettingsView.importSettingsFromKegmon()', json)
          config.brewfather_apikey = json.brewfather_apikey
          config.brewfather_userkey = json.brewfather_userkey
          global.disabled = false
        })
        .catch((err) => {
          global.disabled = false
          logError('SettingsView.importSettingsFromKegmon()', err)
          global.messageError = 'Failed to fetch configuration from Kegmon device'
        })
    })
    .catch((err) => {
      global.disabled = false
      logError('SettingsView.importSettingsFromKegmon()', err)
      global.messageError = 'Failed to authenticate with Kegmon device'
    })
}

const saveSettings = () => {
  logDebug('SettingsView.saveSettings()')

  if (!validateCurrentForm()) return

  config.save()
  global.messageSuccess = 'Settings saved'
}
</script>
