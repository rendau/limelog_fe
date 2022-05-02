<template>
  <q-dialog ref="dialog" @show="onDialogShow" @hide="onDialogHide">
    <q-card style="width: 900px; max-width: 95vw;"
            :style="{'max-height': dialogMaxHeight}"
            class="relative-position bg-white">
      <div class="column no-wrap items-stretch">
        <!-- toolbar -->
        <div class="row items-center q-px-md q-py-xs bg-grey-4">
          <div class="text-h5 text-grey-7">
            Settings
          </div>

          <q-space/>

          <q-btn no-caps dense color="grey-7" class="q-px-sm" label="close" @click="onCancel"/>

          <div class="q-pr-sm"/>

          <q-btn no-caps dense color="positive" class="q-px-sm" :disable="loading"
                 label="save" @click="onSubmitClick"/>
        </div>

        <!-- body -->
        <div class="q-px-xs q-pb-xs relative-position" style="height: 75vh">
          <div v-if="data" class="fit column no-wrap items-stretch">
            <div class="col-auto">
              <q-tabs v-model="tab" dense :breakpoint="0">
                <q-tab name="rotation" no-caps>
                  <div class="row no-wrap items-center">
                    <q-icon name="access_time"/>

                    <div class="q-pl-xs">
                      Log TTL
                    </div>
                  </div>
                </q-tab>
              </q-tabs>
            </div>

            <div class="col q-pa-md">
              <div class="fit scroll">
                <!-- default value -->
                <div class="row items-center">
                  <div class="text-grey-8 q-pr-md">
                    Default value
                  </div>

                  <div>
                    <q-input dense outlined type="tel"
                             mask="##############"
                             placeholder="munites" suffix="min"
                             style="width: 140px"
                             v-model="data.rotation.default_dur">
                    </q-input>
                  </div>

                  <div class="text-caption text-italic text-grey-6 q-pl-sm">
                    0 - never delete
                  </div>
                </div>

                <div class="q-pt-md q-pb-md"/>

                <!-- exception rules -->
                <div>
                  <div class="row items-center q-pb-sm">
                    <div class="text-subtitle1 text-grey-8">
                      Rules
                    </div>

                    <q-space/>

                    <div>
                      <q-btn no-caps dense rounded size=".75rem"
                             color="positive" class="q-px-sm"
                             label="+ add" @click="onRotationAddRuleClick"/>
                    </div>
                  </div>

                  <table class="full-width relative-position">
                    <tr v-for="(r, rI) in data.rotation.exceptions" :key="`rule-${rI}`">
                      <td>
                        <q-select dense outlined use-input hide-dropdown-icon
                                  :multiple="false"
                                  placeholder="tag"
                                  input-debounce="300"
                                  v-model="r.tag" :options="tagOps"
                                  @filter="tagOpsFilterFn"/>
                      </td>

                      <td class="min-width">
                        <q-input dense outlined type="tel"
                                 mask="##############"
                                 unmasked-value
                                 placeholder="munites" suffix="min"
                                 style="width: 140px"
                                 v-model="r.dur">
                        </q-input>
                      </td>

                      <td class="min-width">
                        <div class="q-pl-md">
                          <q-btn no-caps dense rounded size=".75rem"
                                 color="negative" class="q-px-xs"
                                 icon="remove" @click="onRotationRemoveRuleClick(r)"/>
                        </div>
                      </td>
                    </tr>

                    <tr v-if="!data.rotation.exceptions.length">
                      <td colspan="100%" class="text-center text-grey-5">
                        --- no rules ---
                      </td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>

          <ac-spinner :showing="loading"/>
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>
import _ from 'lodash'
import dialog from 'src/mixins/dialog'

export default {
  mixins: [dialog],
  data () {
    return {
      loading: false,
      tab: 'rotation',
      data: {
        rotation: {
          default_dur: 0,
          exceptions: [],
        },
      },
      tagOps: [],
    }
  },
  methods: {
    fetch () {
      this.data = _.cloneDeep(this.$store.state.config.v)
    },
    tagOpsFilterFn (val, update) {
      if (val === '') {
        update(() => {
          this.tagOps = []
        })
      } else {
        update(() => {
          this.tagOps = _.filter(this.$store.state.tag.data, tag => {
            return _.lowerCase(tag).indexOf(_.lowerCase(val)) > -1
          })
        })
        // this.$store.dispatch('usrs/list', {
        //   page_size: 50,
        //   type_id: this.$cns.UsrTypeClient,
        //   search: val,
        // }).then(({ data }) => {
        //   update(() => {
        //     this.tagOps = this.$u.lOps(data.results, 'id', x => {
        //       if (x.company_name) {
        //         return `${x.company_name} (${this.$u.fmtFNShort(x)})`
        //       }
        //     })
        //   })
        // })
      }
    },
    onDialogShow () {
      this.fetch()
    },
    onRotationAddRuleClick () {
      this.data.rotation.exceptions = [{
        tag: '',
        dur: null,
      }, ...(this.data.rotation.exceptions || [])]
    },
    onRotationRemoveRuleClick (item) {
      this.data.rotation.exceptions = _.reject(this.data.rotation.exceptions, x => x === item)
    },
    onSubmitClick () {
      this.loading = true

      let data = _.cloneDeep(this.data)

      data.rotation.default_dur = parseInt(data.rotation.default_dur) || 0
      _.each(data.rotation.exceptions, x => {
        x.dur = parseInt(x.dur) || 0
      })

      this.$store.dispatch('config/set', data).then(() => {
        this.$q.notify({ type: 'positive', message: 'Successfully saved' })
        this.onOk()
      }, err => {
        this.$q.notify({ type: 'negative', message: err.data.desc })
      }).then(() => {
        this.loading = false
        this.fetch()
      })
    },
  },
}
</script>
