<template>
  <q-pagination :value="page"
                :max="pageMax"
                :max-pages="5"
                :direction-links="true"
                size=".9rem"
                color="primary"
                @input="onInput"/>
</template>

<script>
export default {
  props: {
    stdParams: { type: Object, default: () => ({}) },
    data: { type: Object, default: () => ({}) },
  },
  computed: {
    page () {
      return (this.stdParams.page || 0) + 1
    },
    pageSize () {
      return this.stdParams.page_size || 0
    },
    totalCount () {
      return this.data.total_count || 0
    },
    pageMax () {
      return Math.ceil((this.totalCount || 1) / (this.pageSize || 1))
    },
  },
  methods: {
    onInput (v) {
      if (v !== this.page) {
        this.$emit('page', v - 1)
      }
    },
  },
}
</script>
