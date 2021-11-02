<template>
  <div>
    <q-select dense outlined bg-color="white"
              emit-value map-options
              :value="$store.state.log.period_type"
              :options="$cns.PeriodTypes"
              @input="$store.dispatch('log/changePeriodType', $event)"/>
  </div>
</template>

<script>

export default {}
</script>
