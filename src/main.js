import { createApp } from 'vue'

import App from './App.vue'

const app = createApp(App)

import piniaInstance from './modules/pinia.js'
app.use(piniaInstance)

import router from './modules/router.js'
app.use(router)

import BsMessage from '@/components/BsMessage.vue'
import BsInputBase from '@/components/BsInputBase.vue'
import BsInputText from '@/components/BsInputText.vue'
import BsInputRadio from '@/components/BsInputRadio.vue'
import BsModalConfirm from '@/components/BsModalConfirm.vue'

app.component('BsMessage', BsMessage)
app.component('BsInputBase', BsInputBase)
app.component('BsInputText', BsInputText)
app.component('BsInputRadio', BsInputRadio)
app.component('BsModalConfirm', BsModalConfirm)

import IconHome from './components/IconHome.vue'
import IconTools from './components/IconTools.vue'

app.component('IconHome', IconHome)
app.component('IconTools', IconTools)

import BsImageBeerColor from './assets/BsImageBeerColor.vue'
app.component('BsImageBeerColor', BsImageBeerColor)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

app.mount('#app')

import '@popperjs/core/dist/umd/popper.min.js'
import 'bootstrap/dist/js/bootstrap.bundle.js'
