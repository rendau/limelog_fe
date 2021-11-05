<template>
  <q-badge :color="levelColor || 'transparent'"
           :text-color="levelColor ? undefined : 'black'">
    {{ data[$cns.LevelFieldName] || '---' }}
  </q-badge>
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
      return this.$u.levelColor(this.data[this.$cns.LevelFieldName])
    },
  },
}
</script>
