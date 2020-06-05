<template>
  <div class="info-panel--wrapper">
    <InfoPanelOverview
      v-if="this.view.overview"
      class="info-panel--view info-panel--view__overview"
      @removeSelected="removeSelected"
      :itemInfo="this.item"
    />
    <InfoPanelEpisodes
      v-if="this.view.episodes"
      class="info-panel--view info-panel--view__episodes"
      @removeSelected="removeSelected"
      :anime="this.item"
    />
    <InfoPanelNavbar class="info-panel--navbar" @selectedView="selectView" />
  </div>

  <!-- add more panel view components -->
</template>

<script>
import InfoPanelNavbar from '@/components/carousel/infoPanel/InfoPanelNavbar'
import InfoPanelOverview from '@/components/carousel/infoPanel/InfoPanelOverview'
import InfoPanelEpisodes from '@/components/carousel/infoPanel/InfoPanelEpisodes'

export default {
  components: {
    InfoPanelOverview,
    InfoPanelNavbar,
    InfoPanelEpisodes
  },
  props: {
    item: {
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
  },
  watch: {
    item: function() {
      this.selectView('overview')
    }
  }
}
</script>

<style lang="scss" scoped>
.info-panel {
  &--wrapper {
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: repeat(12, 1fr);
    background: #000;
    height: 100%;
  }

  &--view {
    grid-row: 1/12;
    grid-column: 1/2;
  }

  &--navbar {
    grid-row: 12/13;
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
