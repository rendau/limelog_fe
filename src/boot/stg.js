export default async ({ store }) => {
  return store.dispatch('stg/loadFromFs').catch(e => {
    console.log('FAIL TO LOAD STG FROM LS', e)
  })
}
