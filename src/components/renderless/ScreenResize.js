export default {
  render: () => null,
  created() {
    window.addEventListener('resize', this.myEventHandler)
    this.myEventHandler()
  },
  destroyed() {
    window.removeEventListener('resize', this.myEventHandler)
  },
  methods: {
    myEventHandler() {
      let width = window.innerWidth

      let windowSize = {
        width: window.innerWidth,
        height: window.innerHeight,
        containerWidth: null
      }

      if (width > 1200) {
        windowSize.containerWidth = 1170
      } else if (width >= 992 && width < 1200) {
        windowSize.containerWidth = 970
      } else if (width >= 768 && width < 992) {
        windowSize.containerWidth = 750
      } else {
        windowSize.containerWidth = window.innerWidth
      }

      this.$emit('resize', windowSize)
    }
  }
}
