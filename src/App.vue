<template>
  <div id="q-app">
    <div v-if="$store.state.app.loading > 0" class="fullscreen">
      <ac-spinner :showing="true"/>
    </div>

    <template v-else-if="$store.state.app.appError">
      <div class="fullscreen column flex-center q-px-lg text-center">
        <div class="q-py-md">
          <q-icon name="warning" color="negative" size="3.5rem"/>
        </div>

        <div class="text-body1 text-negative">
          {{ $store.state.app.appError }}
        </div>
      </div>
    </template>

    <router-view v-else/>
  </div>
</template>

<script>
export default {
  computed: {
    authed () {
      return this.$store.getters['profile/isAuthed']
    },
  },
  methods: {
    async start () {
      console.log('App created')

      this.$store.commit('app/addLoading')

      if (process.env.NODE_ENV !== 'production') {
        // this.$store.commit('stg/setAuthToken', 'upsent')
        // this.$store.commit('stg/updateAuthToken', '...')
      }

      try {
        await Promise.all([
          this.$store.dispatch('config/get'),
          this.$store.dispatch('profile/refreshSinceAppStart'),
        ])
      } catch (err) {
        console.error('app init error:', err)
        this.$store.commit('app/setAppError', this.$t('failed_access_server'))
      }

      this.refreshTags()

      this.$store.commit('app/removeLoading')

      return this.$store.dispatch('app/resolveAppStartPr')
    },
    async refreshTags () {
      if (this.authed) {
        await this.$store.dispatch('tag/list').catch(() => {})
      }
      setTimeout(() => this.refreshTags(), 10000)
    },
  },
  created () {
    this.start()
  },
}
</script>
