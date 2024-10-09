<template>
  <div id="app">
    <img :src="img" v-bind="$attrs" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import img0 from '@/assets/beer-color-0.png'
import img4 from '@/assets/beer-color-4.png'
import img6 from '@/assets/beer-color-6.png'
import img8 from '@/assets/beer-color-8.png'
import img12 from '@/assets/beer-color-12.png'
import img16 from '@/assets/beer-color-16.png'
import img20 from '@/assets/beer-color-20.png'
import img26 from '@/assets/beer-color-26.png'
import img33 from '@/assets/beer-color-33.png'
import img39 from '@/assets/beer-color-39.png'
import img47 from '@/assets/beer-color-47.png'
import img57 from '@/assets/beer-color-57.png'
import img69 from '@/assets/beer-color-69.png'

const ebc = defineModel('ebc')

const img = computed(() => {
  if (ebc.value <= 0) return img0
  if (ebc.value <= 4) return img4
  if (ebc.value <= 6) return img6
  if (ebc.value <= 8) return img8
  if (ebc.value <= 12) return img12
  if (ebc.value <= 16) return img16
  if (ebc.value <= 20) return img20
  if (ebc.value <= 26) return img26
  if (ebc.value <= 33) return img33
  if (ebc.value <= 39) return img39
  if (ebc.value <= 47) return img47
  if (ebc.value <= 57) return img57
  return img69
})
</script>
