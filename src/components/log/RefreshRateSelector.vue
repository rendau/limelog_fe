<template>
  <div>
    <div class="row items-center">
      <div class="q-pr-xs text-grey-7">
        Refresh:
      </div>

      <q-select dense outlined bg-color="white"
                emit-value map-options
                :value="$store.state.log.ar_dur"
                :options="$cns.RefreshRates"
                @input="$store.dispatch('log/changeArDur', $event)"/>
    </div>
  </div>
</template>

<script>
export default {}
</script>
