<template>
  <div class="row items-start q-col-gutter-sm cursor-pointer">
    <div style="width: 170px">
      <q-field outlined dense :label="label" :stack-label="!!date" bg-color="white" class="cursor-pointer">
        <template v-slot:control>
          <div class="self-center full-width no-outline">{{ date }}</div>
        </template>

        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer label-color" size="1.4rem"/>
        </template>

        <q-popup-proxy ref="qDateProxy">
          <div>
            <q-date :value="date" today-btn mask="YYYY-MM-DD" @input="onDateValueInput"/>
          </div>
        </q-popup-proxy>
      </q-field>
    </div>

    <div style="width: 100px">
      <q-field outlined dense :label="timeLabel" :stack-label="!!time" bg-color="white" class="cursor-pointer">
        <template v-slot:control>
          <div class="self-center full-width no-outline">{{ time }}</div>
        </template>

        <template v-slot:append>
          <q-icon name="schedule" class="cursor-pointer label-color" size="1.4rem"/>
        </template>

        <q-popup-proxy ref="qDateProxy">
          <div>
            <q-time :value="time" now-btn format24h mask="HH:mm" @input="onTimeValueInput"/>
          </div>
        </q-popup-proxy>
      </q-field>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    value: {},
    label: { type: String },
    timeLabel: { type: String },
    withTime: { type: Boolean, default: false },
    endOfDay: { type: Boolean, default: false },
  },
  data () {
    return {
      date: null,
      time: null,
    }
  },
  watch: {
    value () {
      this.onValueChange()
    },
  },
  methods: {
    onValueChange () { // from parent
      if (!this.value) {
        this.date = null
        this.time = null
      } else {
        let v = moment(this.value)
        this.date = v.format('YYYY-MM-DD')
        this.time = v.format('HH:mm')
      }
    },
    onDateValueInput (v) {
      if (this.$refs.qDateProxy) {
        this.$refs.qDateProxy.hide()
      }
      this.date = v
      if (!this.date) {
        this.time = null
      }
      this.emitInput()
    },
    onTimeValueInput (v) {
      if (this.$refs.qTimeProxy) {
        this.$refs.qTimeProxy.hide()
      }
      this.time = v
      this.emitInput()
    },
    emitInput () {
      let value = null

      if (this.date) {
        let time = this.time

        if (!time) {
          time = this.endOfDay ? '23:59' : '00:00'
        }

        console.log(time)

        value = moment(this.date + ' ' + time, 'YYYY-MM-DD HH:mm').valueOf()
      } else {
        this.time = null
      }

      this.$emit('input', value)
    },
  },
  created () {
    this.onValueChange()
  },
}
</script>
