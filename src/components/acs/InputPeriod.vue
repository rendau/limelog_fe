<template>
  <div>
    <div v-if="!noLabel" class="text-caption text-color5">
      Период:
    </div>

    <div class="row no-wrap items-center">
      <div>
        <q-input dense outlined v-model="tsGteV" style="width: 170px" @input="onTsGteVInput">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale" ref="tsGtePopupProxy">
                <q-date v-model="tsGteV" today-btn mask="DD.MM.YYYY" @input="onTsGteVInput"/>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>

      <div class="text-color5 q-px-sm">
        -
      </div>

      <div>
        <q-input dense outlined v-model="tsLteV" style="width: 170px" @input="onTsLteVInput">
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale" ref="tsLtePopupProxy">
                <q-date v-model="tsLteV" today-btn mask="DD.MM.YYYY" @input="onTsLteVInput"/>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    props: {
      tsGte: { type: String },
      tsLte: { type: String },
      noLabel: { type: Boolean },
    },
    data () {
      return {
        tsGteV: null,
        tsLteV: null,
      }
    },
    methods: {
      onTsGteVInput () {
        this.$refs.tsGtePopupProxy && this.$refs.tsGtePopupProxy.hide()
        if (this.tsGteV) {
          this.$emit('update:ts-gte', moment(this.tsGteV, 'DD.MM.YYYY').startOf('day').toJSON())
        } else {
          this.$emit('update:ts-gte', null)
        }
      },
      onTsLteVInput () {
        this.$refs.tsLtePopupProxy && this.$refs.tsLtePopupProxy.hide()
        if (this.tsLteV) {
          this.$emit('update:ts-lte', moment(this.tsLteV, 'DD.MM.YYYY').endOf('day').toJSON())
        } else {
          this.$emit('update:ts-lte', null)
        }
      },
    },
    mounted () {
      if (this.tsGte) {
        this.tsGteV = moment(this.tsGte).format('DD.MM.YYYY')
      }
      if (this.tsLte) {
        this.tsLteV = moment(this.tsLte).format('DD.MM.YYYY')
      }
    },
  }
</script>
