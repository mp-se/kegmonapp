<template>
  <div class="container">
    <div class="row">
      <div class="col col-sm-6">
        <div class="card border text-bg-light border-light h-100 gy-4">
          <KegmonCardFragment :batch="tap1" :progress="progress1" v-if="tap1 != null"></KegmonCardFragment>
        </div>
      </div>

      <div class="col col-sm-6">
        <div class="card border text-bg-light border-light h-100 gy-4">
          <KegmonCardFragment :batch="tap2" :progress="progress2" v-if="tap2 != null"></KegmonCardFragment>
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
          Fetch from Brewfather</button>&nbsp;
      </div>
    </div>
  </div>
</template>

<script setup>
import { brewfatherStore, global, config } from '@/modules/pinia'
import { logDebug, logError } from '@/modules/logger'
import { onMounted, onBeforeUnmount, ref, computed } from 'vue'
import BatchCardFragment from '@/views/BatchCardFragment.vue'
import KegmonCardFragment from '@/views/KegmonCardFragment.vue'
import { BrewfatherBatch } from '@/modules/brewfatherStore'

const polling = ref(null)
const tap1 = ref(null)
const tap2 = ref(null)

const progress1 = computed(() => {
  logDebug(tap1.value)
  if (tap1.value == null || tap1.value.kegVolume == 0) return 0
  return (tap1.value.beerVolume / tap1.value.kegVolume) * 100
})

const progress2 = computed(() => {
  logDebug(tap2.value)
  if (tap2.value == null || tap2.value.kegVolume == 0) return 0
  return (tap2.value.beerVolume / tap2.value.kegVolume) * 100
})

onBeforeUnmount(() => {
  if (polling.value != null) clearInterval(polling.value)
})

function fetchStatus() {
  logDebug('HomeView.fetchStatus()')

  global.clearMessages()

  if (config.kegmon_url == '') return

  fetch(config.kegmon_url + 'api/status', {
    method: 'GET',
    signal: AbortSignal.timeout(3000)
  })
    .then((res) => res.json())
    .then((json) => {
      logDebug('HomeView.fetchStatus()', json)

      if (tap1.value != null) {
        tap1.value.glasses = json.glass1
        tap1.value.beerVolume = json.beer_volume1
        tap1.value.kegVolume = json.keg_volume1
      }

      if (tap1.value != null) {
        tap2.value.glasses = json.glass2
        tap2.value.beerVolume = json.beer_volume2
        tap2.value.kegVolume = json.keg_volume2
      }
    })
    .catch((err) => {
      logError('HomeView.fetchStatus()', err)
      global.messageError = 'Failed to fetch status from Kegmon device'
    })
}

onMounted(() => {
  logDebug('HomeView.onMounted()')
  polling.value = setInterval(fetchStatus, 5000)

  if (config.kegmon_url == '') {
    global.messageError = 'No url to kegmon device is specified, go to settings.'
    return
  }

  var base = btoa('kegmon:password')
  var token = ''

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

          tap1.value = new BrewfatherBatch(
            '',
            'Tap 1: ' + json.beer_name1,
            '',
            '',
            '',
            json.beer_abv1,
            json.beer_ebc1,
            json.beer_ibu1,
            ''
          )
          tap2.value = new BrewfatherBatch(
            '',
            'Tap 2: ' + json.beer_name2,
            '',
            '',
            '',
            json.beer_abv2,
            json.beer_ebc2,
            json.beer_ibu2,
            ''
          )

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
