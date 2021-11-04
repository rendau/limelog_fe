<template>
  <tr class="cursor-pointer" :class="{'bg-lime-2': active}">
    <td class="text-center" :class="{'text-no-wrap': $q.screen.gt.xs}">
      {{ $u.fmtDatetimeMini(data[$cns.SfTsFieldName]) }}
    </td>

    <td class="text-no-wrap text-center">
      {{ data[$cns.SfTagFieldName] }}
    </td>

    <td class="text-no-wrap text-center">
      <q-badge :color="levelColor || 'transparent'"
               :text-color="levelColor ? undefined : 'black'">
        {{ data[$cns.LevelFieldName] }}
      </q-badge>
    </td>

    <td>
      {{ data[$cns.MessageFieldName] }}
    </td>
  </tr>
</template>

<script>

export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
    },
  },
  computed: {
    levelColor () {
      switch (this.data[this.$cns.LevelFieldName]) {
        case 'debug':
          return 'grey-5'
        case 'warn':
          return 'orange'
        case 'error':
          return 'red'
        case 'fatal':
          return 'purple'
        default:
          return null
      }
    },
  },
}
</script>
