<template>
    <div class="card">
        <div class="card-header">
            {{ batch.name }}
        </div>
        <div class="card-body">
            <div class="row">
                <div class="col col-sm-9">
                    <div class="row">
                        <div class="col">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-sm-4">
                            <p class="card-text">
                            </p>
                        </div>
                        <div class="col col-sm-8">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col col-sm-4">
                            <p class="card-text">ABV: {{ batch.abv }}%</p>
                        </div>
                        <div class="col col-sm-4">
                            <p class="card-text">EBC: {{ batch.ebc }}</p>
                        </div>
                        <div class="col col-sm-4">
                            <p class="card-text">IBU: {{ batch.ibu }}</p>
                        </div>
                    </div>
                </div>
                <div class="col col-sm-3">
                    <BsImageBeerColor :ebc="batch.ebc" width="100"></BsImageBeerColor>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
defineOptions({
    inheritAttrs: false
})
const batch = defineModel('batch')
</script>
