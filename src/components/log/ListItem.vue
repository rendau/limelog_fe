<template>
  <tr class="cursor-pointer" :class="{'bg-lime-2': active}">
    <td class="text-center" :class="{'text-no-wrap': $q.screen.gt.xs}">
      {{ $u.fmtDatetimeMini(data[$cns.SfTsFieldName]) }}
    </td>

    <td class="text-no-wrap text-center">
      {{ data[$cns.SfTagFieldName] }}
    </td>

    <td class="text-no-wrap text-center">
      <ac-level-badge :data="data"/>
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
}
</script>
