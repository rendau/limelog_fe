import { dom } from 'quasar'

const { height } = dom

export default {
  data () {
    return {
      dialogMaxHeight: '95vh',
      bodyMaxHeightPercent: 80,
      bodySize: undefined,
    }
  },
  computed: {
    scrollAreaHeight () {
      if (!this.bodySize) {
        return 0
      }

      if (((this.bodySize.height * 100) / height(window)) < this.bodyMaxHeightPercent) {
        return `${this.bodySize.height}px`
      }

      return `${this.bodyMaxHeightPercent}vh`
    },
  },
  methods: {
    show () {
      this.$refs.dialog.show()
    },
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      this.$emit('hide')
    },
    onOk (v) {
      this.$emit('ok', v)
      this.hide()
    },
    onCancel () {
      this.hide()
    },

    onBodyResize (size) {
      this.bodySize = size
    },
  },
}
