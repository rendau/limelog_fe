<template>
  <q-layout view="hHh Lpr lFf">
    <Header/>

    <Drawer/>

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

export default {
  components: { Drawer, Header },
}
</script>
