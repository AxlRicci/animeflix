<template>
  <div class="info-panel--wrapper">
    <div class="close">
      <img @click="removeSelected" src="../../../assets/clear.svg" />
    </div>
    <InfoPanelOverview
      v-if="this.views.overview.active"
      class="info-panel--view info-panel--view__overview"
      @removeSelected="removeSelected"
      :itemInfo="this.item"
    />
    <InfoPanelEpisodes
      v-if="this.views.episodes.active"
      class="info-panel--view info-panel--view__episodes"
      @removeSelected="removeSelected"
      :anime="this.item"
    />
    <InfoPanelNavbar
      class="info-panel--navbar"
      @selectedView="selectView"
      :views="views"
    />
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
      views: {
        overview: {
          name: 'overview',
          active: true
        },
        episodes: {
          name: 'episodes',
          active: false
        },
        related: {
          name: 'related',
          active: false
        },
        details: {
          name: 'details',
          active: false
        }
      }
    }
  },
  methods: {
    removeSelected() {
      this.$emit('removeSelected')
    },
    selectView(view) {
      console.log(view)
      Object.keys(this.views).forEach(item => {
        if (view == item) {
          this.views[item].active = true
        } else {
          this.views[item].active = false
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
    grid-template-columns: repeat(12, 1fr);
    grid-template-rows: repeat(12, 1fr);
    background: #000;
    height: 100%;
  }

  &--view {
    grid-row: 1/12;
    grid-column: 1/13;
  }

  &--navbar {
    grid-row: 12/13;
    grid-column: 1/13;
    z-index: 1;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.6446953781512605) 50%,
      rgba(0, 0, 0, 0) 100%
    );
  }
}

.close {
  grid-row: 1/2;
  grid-column: 1/2;
  display: flex;
  z-index: 3;
  justify-self: start;
  cursor: pointer;
  & img {
    height: 24px;
  }
}
</style>
