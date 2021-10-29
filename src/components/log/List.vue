<template>
  <div>
    <q-markup-table wrap-cells class="relative-position">
      <thead class="dense">
      <tr class="bg-grey-2">
        <th class="min-width">Time</th>

        <th class="min-width">Level</th>

        <th>Massage</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="item in results" :key="`item-${item._id}`" class="cursor-pointer">
        <td class="text-no-wrap">
          {{ $u.fmtDatetimeMini(item[$cns.SfTsFieldName]) }}
        </td>

        <td class="text-no-wrap">
          {{ item[$cns.SystemFieldPrefix+'level'] }}
        </td>

        <td>
          {{ item[$cns.SfMessageFieldName] }}
        </td>
      </tr>

      <ac-tr-no-rows v-if="!loading && !results.length"/>
      </tbody>

      <ac-spinner :showing="loading"/>
    </q-markup-table>

    <!-- Footer -->
    <ac-table-tools :std-params="params" :data="data" class="q-mt-md"
                    @page="onPage"/>
  </div>
</template>

<script>
import { changePage } from 'src/store/log/actions'

export default {
  computed: {
    loading () {
      return this.$store.state.log.loading
    },
    data () {
      return this.$store.state.log.data || {}
    },
    results () {
      return this.data.results || []
    },
    params () {
      return this.$store.state.log.params
    },
  },
  methods: {
    onPage (page) {
      this.$store.dispatch('log/changePage', page)
    },
  },
}
</script>
