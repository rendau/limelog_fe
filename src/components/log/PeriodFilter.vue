<template>
  <div>
    <div class="row items-center">
      <div class="q-pr-xs text-grey-7">
        Period:
      </div>

      <q-select dense outlined bg-color="white"
                :value="$store.state.log.period_type"
                :options="$cns.PeriodTypes"
                @input="$store.dispatch('log/changePeriodType', $event)"/>
    </div>
  </div>
</template>
