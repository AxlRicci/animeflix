<template>
  <div class="info-panel--wrapper">
    <InfoPanelMain
      v-if="this.view.overview"
      class="info-panel--view info-panel--view__overview"
      @removeSelected="removeSelected"
      :itemInfo="itemInfo"
    />
    <InfoPanelNavbar class="info-panel--navbar" @selectedView="selectView" />
  </div>

  <!-- add more panel view components -->
</template>

<script>
import InfoPanelNavbar from '@/components/carousel/infoPanel/InfoPanelNavbar'
import InfoPanelMain from '@/components/carousel/infoPanel/InfoPanelMain'

export default {
  components: {
    InfoPanelMain,
    InfoPanelNavbar
  },
  props: {
    itemInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      view: {
        overview: true,
        episodes: false,
        related: false,
        details: false
      }
    }
  },
  methods: {
    removeSelected() {
      this.$emit('removeSelected')
    },
    selectView(view) {
      console.log(view)
      Object.keys(this.view).forEach(item => {
        if (view == item) {
          this.view[item] = true
        } else {
          this.view[item] = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.info-panel {
  &--wrapper {
    display: grid;
    grid-template-columns: auto;
    grid-template-rows: auto auto;
  }

  &--view {
    grid-row: 1/3;
    grid-column: 1/2;
  }

  &--navbar {
    grid-row: 2/3;
    grid-column: 1/2;
    z-index: 1;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.6446953781512605) 50%,
      rgba(0, 0, 0, 0) 100%
    );
  }
}
</style>
