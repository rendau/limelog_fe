<template>
  <q-header bordered class="q-py-none bg-grey-2 text-black">
    <q-toolbar class="q-py-none" style="min-height: 50px">
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

          <q-space/>

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

export default {
  components: { PeriodFilter },
  methods: {
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
