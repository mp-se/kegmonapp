import { createPinia } from 'pinia'
import { useGlobalStore } from '@/modules/globalStore'
import { useConfigStore } from '@/modules/configStore'
import { useBrewfatherStore } from '@/modules/brewfatherStore'
import { logDebug } from '@/modules/logger'

const piniaInstance = createPinia()

export default piniaInstance

const global = useGlobalStore(piniaInstance)
const config = useConfigStore(piniaInstance)
const brewfatherStore = useBrewfatherStore(piniaInstance)

export { global, config, brewfatherStore }

const saveConfigState = () => {
  logDebug('pinia.saveConfigState()')
}

const getConfigChanges = () => {
  logDebug('pinia.getConfigChanges()')
  return {}
}

export { saveConfigState, getConfigChanges }
