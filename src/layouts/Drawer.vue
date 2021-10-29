<template>
  <q-drawer :value="$store.state.app.drawer" show-if-above bordered
            content-class="bg-grey-1" :width="300"
            @input="$store.commit('app/setDrawer', $event)">
    <q-list>
      <q-item-label header class="text-body2 text-grey-6 q-pl-sm q-pb-sm">
        Tags:
      </q-item-label>

      <q-item dense clickable>
        <q-item-section class="q-py-sm q-pl-sm">
          hello
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script>
export default {}
</script>
