<template>
  <div class="flex items-center">
    <ac-table-pagination v-if="showPagination"
                         :std-params="stdParams"
                         :data="data"
                         @page="onPage"/>

    <q-space/>

    <div class="q-pr-xs q-mr-sm">
      <ac-table-total-counter :value="totalCount"/>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      stdParams: { type: Object, default: () => ({}) },
      data: { type: Object, default: () => ({}) },
      noPagination: { type: Boolean, default: false },
    },
    computed: {
      pageSize () {
        return this.stdParams.page_size || 0
      },
      totalCount () {
        return this.data.total_count || 0
      },
      showPagination () {
        return this.pageSize && !this.noPagination && (this.totalCount > this.pageSize)
      },
    },
    methods: {
      onPage (page) {
        this.$emit('page', page)
      },
    },
  }
</script>
