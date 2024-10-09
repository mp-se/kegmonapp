<template>
  <div class="container">

    <div class="row">
      <div class="col col-sm-6">
        <div class="card border text-bg-light border-light h-100 gy-4">
          <KegmonCardFragment :batch="tap1" v-if="tap1 != null"></KegmonCardFragment>
        </div>
      </div>

      <div class="col col-sm-6">
        <div class="card border text-bg-light border-light h-100 gy-4">
          <KegmonCardFragment :batch="tap2" v-if="tap2 != null"></KegmonCardFragment>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="card border text-bg-light border-light h-100 gy-4" v-for="(b, index) in brewfatherStore.batches"
        :key="index">
        <BatchCardFragment :batch="b"></BatchCardFragment>
      </div>
    </div>

    <div class="row gy-2">
      <div class="col-md-12">
        <hr />
      </div>
      <div class="col-md-12">
        <button type="button" @click="fetchBrewfather()" class="btn btn-secondary w-2" :disabled="config.brewfather_userkey == '' || config.brewfather_apikey == '' || global.disabled
          ">
          Fetch from brewfather</button>&nbsp;
      </div>
    </div>
  </div>
</template>

<script setup>
import { brewfatherStore, global, config } from '@/modules/pinia'
import { logDebug, logError } from '@/modules/logger'
import { onMounted, onBeforeUnmount, ref } from 'vue'
import BatchCardFragment from '@/views/BatchCardFragment.vue'
import KegmonCardFragment from '@/views/KegmonCardFragment.vue'
import { BrewfatherBatch } from '@/modules/brewfatherStore'

const polling = ref(null)
const tap1 = ref(null)
const tap2 = ref(null)

onBeforeUnmount(() => {
  if (polling.value != null)
    clearInterval(polling.value)
})

function fetchStatus() {
  global.clearMessages()

  fetch(config.kegmon_url + 'api/status', {
    method: 'GET',
    signal: AbortSignal.timeout(3000)
  })
    .then((res) => res.json())
    .then((json) => {
      logDebug('HomeView.fetchStatus()', json)
      //status.value = json

      // TODO: Add status info on remaning volume

    })
    .catch((err) => {
      logError('HomeView.fetchStatus()', err)
      global.messageError = 'Failed to fetch status from Kegmon device'
    })
}

onMounted(() => {
  logDebug('HomeView.onMounted()')
  polling.value = setInterval(fetchStatus, 5000)

  var base = btoa('kegmon:password')
  var token = ""

  fetch(config.kegmon_url + 'api/auth', {
    method: 'GET',
    headers: { Authorization: 'Basic ' + base },
    signal: AbortSignal.timeout(global.fetchTimout)
  })
    .then((res) => res.json())
    .then((json) => {
      token = json.token

      fetch(config.kegmon_url + 'api/config', {
        method: 'GET',
        headers: { Authorization: 'Bearer ' + token },
        signal: AbortSignal.timeout(global.fetchTimout)
      })
        .then((res) => res.json())
        .then((json) => {
          logDebug('HomeView.onMounted()', json)

          tap1.value = new BrewfatherBatch("", json.beer_name1, "", "", "", json.beer_abv1, json.beer_ebc1, json.beer_ibu1, "")
          tap2.value = new BrewfatherBatch("", json.beer_name2, "", "", "", json.beer_abv2, json.beer_ebc2, json.beer_ibu2, "")

          global.disabled = false
        })
        .catch((err) => {
          global.disabled = false
          logError('HomeView.onMounted()', err)
          global.messageError = 'Failed to fetch configuration from Kegmon device'
        })

    })
    .catch((err) => {
      logError('HomeView.importSettingsFromKegmon()', err)
      global.messageError = 'Failed to authenticate with Kegmon device'
    })
})

const fetchBrewfather = () => {
  logDebug('HomeView.fetchBrewfather()')
  brewfatherStore.getBatchList((success) => {
    if (!success) global.messageError('Failed to fetch batches from brewfather!')
  })
}
</script>
