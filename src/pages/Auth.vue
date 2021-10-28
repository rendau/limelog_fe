<template>
  <div class="fullscreen flex flex-center q-pa-lg">
    <q-card class="relative-position" style="width: 370px">
      <div class="column items-stretch q-gutter-y-md q-pa-xl">
        <div>
          <div class="column flex-center q-gutter-y-sm">
            <div>
              <q-img src="~assets/logo.svg" width="50px" height="50px"/>
            </div>

            <div class="text-h4 text-lime-7">
              LimeLog
            </div>
          </div>
        </div>

        <div class="self-center" style="width: 250px">
          <q-input type="password"
                   v-model="password"
                   label="Пароль"
                   @keyup.enter="onSubmit"/>
        </div>

        <div class="self-center">
          <div class="q-pt-lg"/>

          <q-btn label="войти" color="primary" class="q-px-lg" @click="onSubmit"/>
        </div>
      </div>

      <ac-spinner :showing="loading"/>
    </q-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      password: '',
    }
  },
  methods: {
    onSubmit () {
      if (this.password === '') {
        this.$q.notify({
          type: 'negative',
          message: 'Введите пароль',
        })
        return
      }

      this.loading = true
      this.$store.dispatch('profile/auth', {
        password: this.password,
      }).then(() => {
        this.$router.push({ name: this.$cns.indexRouteName }).catch(() => {})
      },err => {
        this.$q.notify({
          type: 'negative',
          message: err.data.desc,
        })
      }).then(() => {
        this.loading = false
      })
    },
  },
}
</script>
