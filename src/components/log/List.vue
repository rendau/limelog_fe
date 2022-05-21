<template>
  <div>
    <div :class="$q.screen.lt.sm ? 'column q-gutter-y-sm' : 'row q-gutter-x-lg'" class="items-center">
      <div class="col-auto">
        <q-btn-toggle no-caps rounded
                      :value="level" toggle-color="primary"
                      :options="levelOps" size=".8rem"
                      @input="onLevelInput"/>
      </div>

      <div class="col-auto">
        <q-input dense outlined clearable
                 placeholder="search"
                 :value="search"
                 :debounce="1400"
                 style="width: 340px"
                 @input="onSearchInput">
          <template #append>
            <q-icon name="search" size=".9rem" color="grey-5"/>
          </template>
        </q-input>
      </div>
    </div>

    <div class="q-pt-md"/>

    <q-markup-table wrap-cells :dense="$q.screen.lt.sm" class="relative-position">
      <thead class="dense">
      <tr class="bg-grey-2 text-lime-9">
        <th class="min-width">Time</th>

        <th class="min-width">Tag</th>

        <th class="min-width">Level</th>

        <th>Massage</th>
      </tr>
      </thead>

      <tbody>
      <ListItem v-for="item in results" :key="`item-${item._id}`" :data="item"
                :active="item._id === ($store.state.log.selectedMsg || {})._id"
                @click.native="$store.commit('log/setSelectedMsg', item)"/>

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
import ListItem from 'components/log/ListItem'

export default {
  components: { ListItem },
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
    level () {
      return this.$store.state.log.level
    },
    levelOps () {
      return [
        { value: undefined, label: 'all' },
        { value: 'debug', label: 'debug' },
        { value: 'info', label: 'info' },
        { value: 'warn', label: 'warn' },
        { value: 'error', label: 'error' },
        { value: 'fatal', label: 'fatal' },
      ]
    },
    search () {
      return this.$store.state.log.search
    },
  },
  methods: {
    onLevelInput (v) {
      this.$store.dispatch('log/changeLevel', v)
    },
    onSearchInput (v) {
      this.$store.dispatch('log/changeSearch', v)
    },
    onPage (page) {
      this.$store.dispatch('log/changePage', page)
    },
  },
}
</script>
