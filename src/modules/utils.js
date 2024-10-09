import { logDebug } from '@/modules/logger'

export function validateCurrentForm() {
  let valid = true
  const forms = document.querySelectorAll('.needs-validation')

  Array.from(forms).forEach((form) => {
    if (!form.checkValidity()) valid = false

    form.classList.add('was-validated')
  })

  return valid
}

export const abv = (og, fg) => {
  return Math.round(((76.08 * (og - fg)) / (1.775 - og)) * (fg / 0.794) * 100) / 100
}

export const gravityToPlato = (sg) => {
  return 259 - 259 / sg
}

export function tempToF(c) {
  return c * 1.8 + 32.0
}

export function tempToC(f) {
  return (f - 32.0) / 1.8
}

export function isValidJson(s) {
  try {
    JSON.stringify(JSON.parse(s))
    return true
  } catch (e) {
    logDebug('utils.isValidJson()')
  }

  return false
}

export function isValidMqttData(s) {
  logDebug('utils.isValidMqttData()', s)
  return false // Used in common components so it needs to be defined
}

export function isValidFormData(s) {
  logDebug('utils.isValidFormData()', s)
  return false // Used in common components so it needs to be defined
}
