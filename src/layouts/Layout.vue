<template>
  <q-layout view="hHh Lpr lFf">
    <q-header bordered class="q-py-none bg-grey-2">
      <q-toolbar class="q-py-none" style="min-height: 50px">
        <div>
          <div class="row items-center q-gutter-x-sm">
            <q-img src="~assets/logo.svg" width="27px" height="27px"/>

            <div class="text-h6 text-lime-7">
              LimeLog
            </div>
          </div>
        </div>

        <q-space/>

        <div>
          <q-btn flat dense round color="primary" @click="onLogoutClick">
            <q-icon name="logout" size="1.2rem"/>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above bordered content-class="bg-grey-1">
      <q-list>
        <q-item-label header class="text-grey-8">
          Essential Links
        </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <q-page>
        <router-view/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
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
