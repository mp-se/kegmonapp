import { defineStore } from 'pinia'
import { logDebug } from './logger'

export const useConfigStore = defineStore('config', {
  state: () => {
    return {
      kegmon_url: '',
      brewfather_apikey: '',
      brewfather_userkey: '',
      dark_mode: false
    }
  },
  actions: {
    load() {
      logDebug('configStore.load()')

      this.dark_mode = localStorage.getItem('dark_mode') == 'true' ? true : false
      this.kegmon_url = localStorage.getItem('kegmon_url')
      this.brewfather_apikey = localStorage.getItem('brewfather_apikey')
      this.brewfather_userkey = localStorage.getItem('brewfather_userkey')

      if (this.dark_mode === undefined || this.dark_mode === null) this.dark_mode = false
      if (this.kegmon_url === undefined || this.kegmon_url === null) this.kegmon_url = ''
      if (this.brewfather_apikey === undefined || this.brewfather_apikey === null)
        this.brewfather_apikey = ''
      if (this.brewfather_userkey === undefined || this.brewfather_userkey === null)
        this.brewfather_userkey = ''
    },
    save() {
      logDebug('configStore.save()')

      localStorage.setItem('dark_mode', this.dark_mode)
      localStorage.setItem('kegmon_url', this.kegmon_url)
      localStorage.setItem('brewfather_apikey', this.brewfather_apikey)
      localStorage.setItem('brewfather_userkey', this.brewfather_userkey)
    }
  }
})
