<template>
  <div>
    <div class="row no-wrap items-center">
      <div>
        <ac-input-date :withTime="withTime"
                       :value="tsGte" @input="$emit('update:ts-gte', $event)"/>
      </div>

      <div class="text-color5 q-px-sm">
        --
      </div>

      <div>
        <ac-input-date :withTime="withTime" end-of-day
                       :value="tsLte" @input="$emit('update:ts-lte', $event)"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tsGte: { type: Number },
    tsLte: { type: Number },
    withTime: { type: Boolean },
  },
}
</script>
