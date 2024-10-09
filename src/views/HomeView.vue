<template>
  <div class="container">
    <div
      class="card border text-bg-light border-light h-100 gy-4"
      v-for="(b, index) in brewfatherStore.batches"
      :key="index"
    >
      <div class="card">
        <div class="card-header">
          {{ b.name }}
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col col-sm-9">
              <div class="row">
                <div class="col">
                  <p class="card-text">{{ b.description }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col col-sm-4">
                  <p class="card-text">
                    Date: {{ new Date(b.brewDate).toISOString().substring(0, 10) }}
                  </p>
                </div>
                <div class="col col-sm-8">
                  <p class="card-text">Style: {{ b.style }}</p>
                </div>
              </div>
              <div class="row">
                <div class="col col-sm-4">
                  <p class="card-text">ABV: {{ b.abv }}%</p>
                </div>
                <div class="col col-sm-4">
                  <p class="card-text">EBC: {{ b.ebc }}</p>
                </div>
                <div class="col col-sm-4">
                  <p class="card-text">IBU: {{ b.ibu }}</p>
                </div>
              </div>
            </div>
            <div class="col col-sm-3">
              <BsImageBeerColor :ebc="b.ebc" width="100"></BsImageBeerColor>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="row gy-2">
      <div class="col-md-12">
        <hr />
      </div>
      <div class="col-md-12">
        <button
          type="button"
          @click="fetchBrewfather()"
          class="btn btn-secondary w-2"
          :disabled="
            config.brewfather_userkey == '' || config.brewfather_apikey == '' || global.disabled
          "
        >
          Fetch from brewfather</button
        >&nbsp;
      </div>
    </div>
  </div>
</template>

<script setup>
import { brewfatherStore, global, config } from '@/modules/pinia'
import { logDebug } from '@/modules/logger'

const fetchBrewfather = () => {
  logDebug('HomeView.fetchBrewfather()')
  brewfatherStore.getBatchList((success) => {
    if (!success) global.messageError('Failed to fetch batches from brewfather!')
  })
}
</script>
