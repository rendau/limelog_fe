<template>
  <tr class="cursor-pointer">
    <td class="text-no-wrap">
      {{ $u.fmtDatetimeMini(data[$cns.SfTsFieldName]) }}
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
