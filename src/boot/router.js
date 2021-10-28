import { cns } from 'boot/cns'

export default ({ router, store }) => {
  router.beforeEach((to, from, next) => {
    // if (process.env.NODE_ENV === 'production') {
    //   console.log('router beforeEach', from, to.fullPath)
    // }
    store.dispatch('app/appStartPr').then(() => {
      return store.dispatch('profile/refreshSinceAppStart')
    }).then(() => {
      if (to.matched.some(r => r.meta.requiresAuth)) {
        if (store.state.profile.ctx) {
          next()
        } else {
          next({ name: cns.authRouteName })
        }
      } else if (to.matched.some(r => r.meta.restrictAuth)) {
        if (store.state.profile.ctx) {
          next({ name: cns.indexRouteName })
        } else {
          next()
        }
      } else {
        next()
      }
    }, () => {
      next()
    })
  })
}
