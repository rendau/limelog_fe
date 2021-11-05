<template>
  <q-drawer :value="!!selectedMsg" elevated side="right"
            content-class="bg-grey-1" :width="350"
            @input="onDrawerInput">
    <div class="fit column items-stretch">
      <div class="col-auto q-pa-xs">
        <q-btn dense outline icon="chevron_right" color="primary" class="q-px-xs"
               @click="onDrawerInput(false)"/>
      </div>

      <div class="col fit">
        <div class="fit overflow-auto">
          <div class="full-width row items-center q-pt-md q-px-sm q-pb-lg" style="min-height: 100%">
            <div class="full-width">
              <div class="column items-stretch q-gutter-y-md">
                <!-- header -->
                <div class="full-width text-center">
                  <div>
                    <ac-level-badge :data="msg"/>
                  </div>

                  <div class="text-bold text-grey-9 q-pt-sm">
                    {{ msg[$cns.SfTagFieldName] || '---' }}
                  </div>

                  <div class="text-grey-9 q-pt-sm">
                    {{ $u.fmtDatetimeSimple(msg[$cns.SfTsFieldName]) || '---' }}
                  </div>
                </div>

                <div>
                  <q-separator/>
                </div>

                <!-- main data -->
                <div v-for="item in mainData" :key="`main-field-${item.k}`" class="full-width">
                  <div class="text-subtitle2 lh-1_1 text-blue-grey-4 q-pb-xs">
                    {{ item.k }}:
                  </div>

                  <div class="text-body2 lh-1_3 q-pl-md" style="word-wrap: break-word">
                    {{ item.v || '---' }}
                  </div>
                </div>

                <!-- rest data -->
                <div v-for="item in restData" :key="`rest-field-${item.k}`" class="full-width">
                  <div class="text-subtitle2 lh-1_1 text-lime-8 q-pb-xs">
                    {{ item.k }}:
                  </div>

                  <div class="text-body2 lh-1_3 q-pl-md" style="word-wrap: break-word">
                    {{ item.v || '---' }}
                  </div>
                </div>

                <!-- expand/shrink button -->
                <div class="text-center">
                  <q-btn flat dense no-caps size=".8rem"
                         :icon-right="$store.state.log.selectedMsgExpanded ? 'expand_less' : 'expand_more'"
                         :label="$store.state.log.selectedMsgExpanded ? 'shrink' : 'expand'"
                         color="primary"
                         class="q-px-sm"
                         @click="$store.commit('log/toggleSelectedMsgExpanded')"/>
                </div>

                <!-- expandable data -->
                <template v-if="$store.state.log.selectedMsgExpanded">
                  <div v-for="item in expandableData" :key="`expandable-field-${item.k}`" class="full-width">
                    <div class="text-subtitle2 lh-1_1 text-lime-8 q-pb-xs">
                      {{ item.k }}:
                    </div>

                    <div class="text-body2 lh-1_3 q-pl-md" style="word-wrap: break-word">
                      {{ item.v || '---' }}
                    </div>
                  </div>
                </template>
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

/*
  body: "{\r\n\"guid\": null\r\n}"
  caller: "shop/index.go:71"
  error: null
  level: "error"
  message: "Fail to send http-request, bad status code"
  msg: "Fail to send http-request, bad status code"
  sf_command: "./svc"
  sf_container_id: "7d7a441a49981892449896e80b5dbbf10a417c65e41c4e4c3889161c32247120"
  sf_container_name: "services_credit-broker.1.wittqffg5st2kggp5h0siqx5x"
  sf_created: "2021-11-04T11:57:39.351017503Z"
  sf_image_id: "sha256:28d47187f4eec3c1ef8a143c1d5c507644ca4722a4daafbf440733033fe43c83"
  sf_image_name: "cr.yandex/crpudpvldr9mndfsmads/credit-broker:latest@sha256:a2bde1d7570d0661cd2ba881c0edaf71fd3ecf34ccabadb5f6961b0223219b1b"
  sf_message: "{\"level\":\"error\",\"ts\":\"2021-11-04T17:58:52+06:00\",\"caller\":\"shop/index.go:71\",\"msg\":\"Fail to send http-request, bad status code\",\"error\":null,\"status_code\":500,\"body\":\"{\\r\\n\\\"guid\\\": null\\r\\n}\",\"stacktrace\":\"github.com/mechta-market/credit-broker/internal/adapters/shop/shop.(*St).SendWebhook\\n\\t/app/internal/adapters/shop/shop/index.go:71\\ngithub.com/mechta-market/credit-broker/internal/domain/core.(*Ord).bgShopWebhookSendRoutine\\n\\t/app/internal/domain/core/ord.go:492\"}"
  sf_tag: "credit-broker"
  sf_ts: 1636027132641
  stacktrace: "github.com/mechta-market/credit-broker/internal/adapters/shop/shop.(*St).SendWebhook\n\t/app/internal/adapters/shop/shop/index.go:71\ngithub.com/mechta-market/credit-broker/internal/domain/core.(*Ord).bgShopWebhookSendRoutine\n\t/app/internal/domain/core/ord.go:492"
  status_code: 500
  ts: "2021-11-04T17:58:52+06:00"
  _id: "6183cafc5c166b1d5db8d5a9"
 */

export default {
  data () {
    return {
      ignoredKeys: [
        'sf_created',
        'msg',
        this.$cns.SfTagFieldName,
        this.$cns.LevelFieldName,
        this.$cns.SfTsFieldName,
      ],
    }
  },
  computed: {
    selectedMsg () {
      return this.$store.state.log.selectedMsg
    },
    msg () {
      return _.assign({}, this.selectedMsg)
    },
    msgKeys () {
      return _.filter(_.keys(this.msg || {}), x => this.ignoredKeys.indexOf(x) < 0)
    },
    mainData () {
      if (!this.msg) return []
      let keys = _.filter([
        this.$cns.IdFieldName,
        this.$cns.MessageFieldName,
        'error',
        'err',
      ], k => _.has(this.msg, k))
      return _.map(keys, k => ({ k, v: this.msg[k] }))
    },
    expandableData () {
      if (!this.msg) return []
      let keys = _.filter([
        'stacktrace',
        'sf_message',
        'ts',
        'timestamp',
        'time',
        'dt',
        'sf_command',
        'sf_image_name',
        'sf_image_id',
        'sf_container_name',
        'sf_container_id',
      ], k => _.has(this.msg, k))
      return _.map(keys, k => ({ k, v: this.msg[k] }))
    },
    restData () {
      if (!this.msg) return []
      let keys = _.filter(this.msgKeys, k => {
        return (_.map(this.mainData, 'k').indexOf(k) < 0) && (_.map(this.expandableData, 'k').indexOf(k) < 0)
      })
      return _.map(keys, k => ({ k, v: this.msg[k] }))
    },
  },
  methods: {
    onDrawerInput (v) {
      this.$store.commit('log/setSelectedMsg', v ? this.selectedMsg : null)
    },
  },
}
</script>
