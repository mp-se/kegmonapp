import { defineStore } from 'pinia'
import { logInfo, logDebug } from '@/modules/logger'

export const useGlobalStore = defineStore('global', {
  state: () => {
    return {
      initialized: false,
      disabled: false,

      messageError: '',
      messageWarning: '',
      messageSuccess: '',
      messageInfo: '',

      fetchTimout: 8000,
      url: undefined
    }
  },
  getters: {
    isError() {
      return this.messageError != '' ? true : false
    },
    isWarning() {
      return this.messageWarning != '' ? true : false
    },
    isSuccess() {
      return this.messageSuccess != '' ? true : false
    },
    isInfo() {
      return this.messageInfo != '' ? true : false
    },
    baseURL() {
      if (this.url !== undefined) return this.url

      if (import.meta.env.VITE_APP_HOST === undefined) {
        logInfo('configStore:baseURL()', 'Using base URL from env', window.location.href)
        this.url = window.location.href
      } else {
        logInfo('configStore:baseURL()', 'Using base URL from env', import.meta.env.VITE_APP_HOST)
        this.url = import.meta.env.VITE_APP_HOST
      }

      return this.url
    },
    token() {
      logDebug(
        'globalStore.token()',
        'env:',
        import.meta.env.VITE_APP_TOKEN,
        'js:',
        window.VITE_APP_TOKEN
      )

      // If the token is not defined in the env-config.js then use the environment instead
      if (window.VITE_APP_TOKEN === undefined || window.VITE_APP_TOKEN === '__TOKEN__')
        return 'Bearer ' + import.meta.env.VITE_APP_TOKEN

      return 'Bearer ' + window.VITE_APP_TOKEN
    },
    uiVersion() {
      return import.meta.env.VITE_APP_VERSION
    },
    uiBuild() {
      return import.meta.env.VITE_APP_BUILD
    }
  },
  actions: {
    clearMessages() {
      this.messageError = ''
      this.messageWarning = ''
      this.messageSuccess = ''
      this.messageInfo = ''
    }
  }
})
