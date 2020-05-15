<template>
  <div class="container">
    <div class="trending">
      <Carousel
        resource="anime"
        :filter="[
          { attribute: 'status', value: 'current' },
          { attribute: 'averageRating', value: '80..90' }
        ]"
        @panelOpen="toggleInfoPanel('recent')"
        :panelState="carousel.infoPanelState.recent"
      />
    </div>
  </div>
</template>

<script>
import Carousel from '@/components/Carousel'
export default {
  name: 'Home',
  components: {
    Carousel
  },
  data() {
    return {
      carousel: {
        infoPanelState: {
          recent: false,
          trending: false
        }
      }
    }
  },
  methods: {
    toggleInfoPanel(name) {
      Object.keys(this.carousel.infoPanelState).forEach(key => {
        if (key != name) {
          this.carousel.infoPanelState[key] = false
        } else if (key == name) {
          this.carousel.infoPanelState[key] = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
