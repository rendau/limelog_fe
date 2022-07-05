<template>
  <q-header bordered class="q-py-none bg-grey-2 text-black">
    <q-toolbar class="q-py-xs" style="min-height: 50px">
      <div class="col">
        <div class="row items-center q-gutter-x-md">
          <div>
            <div class="row items-center q-gutter-x-sm">
              <div v-if="$q.screen.lt.md">
                <q-btn flat dense round color="grey-8" @click="$store.commit('app/toggleDrawer')">
                  <q-icon name="menu"/>
                </q-btn>
              </div>

              <q-img src="~assets/logo.svg" width="27px" height="27px"/>

              <div class="text-h6 text-lime-7">
                LimeLog
              </div>
            </div>
          </div>

          <div>
            <PeriodFilter/>
          </div>

          <div>
            <ac-input-period :ts-gte="$store.state.log.ts_gte" :ts-lte="$store.state.log.ts_lte"
                             @update:ts-gte="$store.dispatch('log/changeTsGte', $event)"
                             @update:ts-lte="$store.dispatch('log/changeTsLte', $event)"/>
          </div>

          <q-space/>

          <div>
            <RefreshRateSelector/>
          </div>

          <q-separator vertical/>

          <div>
            <q-btn flat dense round color="primary" @click="onSettingsClick">
              <q-icon name="settings" size="1.2rem"/>
            </q-btn>
          </div>

          <div v-if="$store.getters['profile/isAuthed']">
            <q-btn flat dense round color="primary" @click="onLogoutClick">
              <q-icon name="logout" size="1.2rem"/>
            </q-btn>
          </div>
        </div>
      </div>
    </q-toolbar>
  </q-header>
</template>

<script>
import PeriodFilter from 'components/log/PeriodFilter'
import RefreshRateSelector from 'components/log/RefreshRateSelector'
import DEdit from 'components/config/DEdit'

export default {
  components: { RefreshRateSelector, PeriodFilter },
  methods: {
    onSettingsClick () {
      this.$q.dialog({
        component: DEdit,
        parent: this,
      })
    },
    onLogoutClick () {
      this.$q.dialog({
        message: 'Вы действительно хотите выйти?',
        ok: { label: 'Да', noCaps: true },
        cancel: { label: 'Отмена', flat: true, noCaps: true },
      }).onOk(() => {
        this.$store.dispatch('profile/logout').then(() => {
          this.$router.push({ name: this.$cns.authRouteName })
        })
      })
    },
  },
}
</script>
