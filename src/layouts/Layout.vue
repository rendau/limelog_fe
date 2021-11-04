<template>
  <q-layout view="hHh LpR lFf">
    <Header/>

    <Drawer/>

    <RDrawer/>

    <q-page-container>
      <q-page>
        <router-view/>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from 'layouts/Header'
import Drawer from 'layouts/Drawer'
import RDrawer from 'layouts/RDrawer'

export default {
  components: { Header, Drawer, RDrawer },
}
</script>
