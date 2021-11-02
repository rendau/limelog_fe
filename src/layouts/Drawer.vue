<template>
  <q-drawer :value="$store.state.app.drawer" show-if-above bordered
            content-class="bg-grey-1" :width="280"
            @input="$store.commit('app/setDrawer', $event)">
    <q-list>
      <q-item-label header class="text-body2 text-grey-6 q-pl-sm q-pb-sm">
        Tags:
      </q-item-label>

      <div v-if="$store.state.tag.loading && !$store.state.tag.data.length" class="row justify-center">
        <ac-spn color="primary" size="1.5rem"/>
      </div>

      <template v-else>
        <q-item dense clickable
                :class="{'bg-lime-8 text-white': $_.isNull($store.state.tag.selected)}"
                @click="$store.dispatch('tag/select', null)">
          <q-item-section side>
            <q-icon name="extension" size="1rem" color="lime-6"/>
          </q-item-section>

          <q-item-section class="q-py-sm q-pl-sm">
            All
          </q-item-section>
        </q-item>

        <q-item v-for="tag in $store.state.tag.data" :key="`tag-${tag}`" dense clickable
                :class="{'bg-lime-8 text-white': tag === $store.state.tag.selected}"
                @click="$store.dispatch('tag/select', tag)">
          <q-item-section side>
            <q-icon name="extension" size="1rem" color="lime-6"/>
          </q-item-section>

          <q-item-section class="q-py-sm q-pl-sm">
            {{ tag || 'All' }}
          </q-item-section>
        </q-item>
      </template>
    </q-list>
  </q-drawer>
</template>
