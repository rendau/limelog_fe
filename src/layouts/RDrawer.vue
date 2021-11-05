<template>
  <q-drawer :value="!!msg" elevated side="right"
            content-class="bg-grey-1" :width="350"
            @input="onDrawerInput">
    <div class="fit column items-stretch">
      <div class="col-auto q-pa-xs">
        <q-btn dense outline icon="chevron_right" color="primary" class="q-px-xs"
               @click="onDrawerInput(false)"/>
      </div>

      <div class="col fit">
        <div class="fit overflow-auto">
          <div class="full-width row items-center q-pt-md q-px-sm q-pb-md" style="min-height: 100%">
            <div class="full-width">
              <div class="column items-stretch q-gutter-y-md">
                <div v-for="(v, k) in msg" :key="`field-${k}`" class="full-width">
                  <div class="text-subtitle2 lh-1_1 text-lime-9 q-pb-xs">
                    {{ k }}:
                  </div>

                  <div class="text-body2 lh-1_3 q-pl-md" style="word-wrap: break-word">
                    {{ v }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </q-drawer>
</template>

<script>
import _ from 'lodash'

export default {
  computed: {
    selectedMsg () {
      return this.$store.state.log.selectedMsg
    },
    msg () {
      if (!this.selectedMsg) return null
      let res = _.omit(this.selectedMsg, [
        this.$cns.SfMessageFieldName,
        'sf_created',
        'sf_image_id',
        'sf_image_name',
        'sf_container_name',
        'sf_command',
        'msg',
      ])
      if (res[this.$cns.SfTsFieldName]) {
        res[this.$cns.SfTsFieldName] = this.$u.fmtDatetimeSimple(res[this.$cns.SfTsFieldName])
      }
      return res
    },
  },
  methods: {
    onDrawerInput (v) {
      this.$store.commit('log/setSelectedMsg', v ? this.selectedMsg : null)
    },
  },
}
</script>
