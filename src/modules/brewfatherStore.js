import { defineStore } from 'pinia'
import { global, config } from '@/modules/pinia'
import { logDebug, logError } from '@/modules/logger'

export class BrewfatherBatch {
  constructor(brewfatherId, name, brewDate, style, brewer, abv, ebc, ibu, description) {
    this.name = name === undefined ? '' : name
    this.brewDate = brewDate === undefined ? '' : brewDate
    this.style = style === undefined ? '' : style
    this.brewer = brewer === undefined ? '' : brewer
    this.abv = abv === undefined ? 0 : abv
    this.ebc = ebc === undefined ? 0 : ebc
    this.ibu = ibu === undefined ? 0 : ibu
    this.brewfatherId = brewfatherId === undefined ? '' : brewfatherId
    this.description = description === undefined ? '' : description
  }

  static fromJson(d) {
    return new BrewfatherBatch(
      d.brewfatherId,
      d.name,
      d.brewDate,
      d.style,
      d.brewer,
      d.abv,
      d.ebc,
      d.ibu,
      d.description
    )
  }

  get brewfatherId() {
    return this._brewfatherId
  }
  get name() {
    return this._name
  }
  get brewDate() {
    return this._brewDate
  }
  get style() {
    return this._style
  }
  get brewer() {
    return this._brewer
  }
  get abv() {
    return this._abv
  }
  get ebc() {
    return this._ebc
  }
  get ibu() {
    return this._ibu
  }
  get description() {
    return this._description
  }

  set brewfatherId(brewfatherId) {
    this._brewfatherId = brewfatherId
  }
  set name(name) {
    this._name = name
  }
  set brewDate(brewDate) {
    this._brewDate = brewDate
  }
  set style(style) {
    this._style = style
  }
  set brewer(brewer) {
    this._brewer = brewer
  }
  set abv(abv) {
    this._abv = abv
  }
  set ebc(ebc) {
    this._ebc = ebc
  }
  set ibu(ibu) {
    this._ibu = ibu
  }
  set description(description) {
    this._description = description
  }
}

export const useBrewfatherStore = defineStore('brewfatherStore', {
  state: () => {
    return { batches: [] }
  },
  getters: {
    isValid() {
      return this.valid
    },
    batchList() {
      return this.batches
    }
  },
  actions: {
    save() {
      logDebug('brewfatherStore.save()')
      localStorage.setItem('brewfather_tapList', JSON.stringify(this.batches))
    },
    load() {
      var s = localStorage.getItem('brewfather_tapList')

      this.batches = []

      logDebug('brewfatherStore.load()', s)
      if (s !== undefined && s !== null) {
        var lst = JSON.parse(s)
        lst.forEach((l) => {
          this.batches.push(
            new BrewfatherBatch(
              l._id,
              l._name,
              l._brewDate,
              l._style,
              l._brewer,
              l._abv,
              l._ebc,
              l._ibu,
              l._description
            )
          )
        })
      }

      logDebug('brewfatherStore.load()', this.batches)
    },
    getBatchList(callback) {
      // callback => (success)
      logDebug('brewfatherStore.getBatchList()')
      global.disabled = true

      fetch(
        'https://api.brewfather.app/v2/batches?include=recipe.abv,tasteNotes,recipe.color,recipe.ibu,recipe.style.name&limit=100&status=Completed',
        {
          method: 'GET',
          headers: {
            Authorization:
              'Basic ' + btoa(config.brewfather_userkey + ':' + config.brewfather_apikey)
          },
          signal: AbortSignal.timeout(global.fetchTimout)
        }
      )
        .then((res) => {
          logDebug('brewfatherStore.getBatchList()', res.status)
          if (!res.ok) throw res
          return res.json()
        })
        .then((json) => {
          logDebug('brewfatherStore.getBatchList()', json)

          this.batches = []

          json.forEach((b) => {
            var batch = new BrewfatherBatch(
              b._id,
              b.name == 'Batch' ? b.recipe.name : b.name,
              b.brewDate,
              b.recipe.style.name,
              b.brewer,
              b.recipe.abv,
              b.recipe.color,
              b.recipe.ibu,
              b.tasteNotes
            )
            this.batches.push(batch)
          })

          logDebug('brewfatherStore.getBatchList()', this.batches)
          this.save()

          /*
          {
            "_id": "CnAu0YxxdF5G710LBVMuyGty3c12vm",
            "batchNo": 75,
            "brewDate": 1720303200000,
            "brewer": "Magnus Persson",
            "name": "Batch",
            "recipe": {
                "abv": 8.93,
                "color": 52.8,
                "ibu": 78.5,
                "name": "68. Imperial Stout 2024 - Licorice ",
                "style": {
                    "name": "Imperial Stout"
                }
            },
            "status": "Completed"
          }*/

          callback(true)
          global.disabled = false
        })
        .catch((err) => {
          global.disabled = false
          logError('brewfatherStore.getBatchList()', err)
          callback(false)
        })
    }
  }
})
