<template>
  <InfoPanelMain @removeSelected="removeSelected" :itemInfo="itemInfo" />
  <!-- add more panel view components -->
</template>

<script>
import InfoPanelMain from '@/components/carousel/infoPanel/InfoPanelMain'

export default {
  components: {
    InfoPanelMain
  },
  props: {
    itemInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeSelected() {
      this.$emit('removeSelected')
    }
  }
}
</script>

<style lang="scss" scoped></style>
