<template>
  <div class="container">
    <div class="trending">
      <Carousel
        label="Trending"
        resource="trending/anime"
        @panelOpen="toggleInfoPanel('recent')"
        :panelState="carousel.infoPanelState.recent"
      />
    </div>
    <div class="top-airing">
      <Carousel
        resource="anime"
        :filter="[
          { attribute: 'status', value: 'current' },
          { attribute: 'averageRating', value: '5..' }
        ]"
        :sort="['popularityRank']"
        @panelOpen="toggleInfoPanel('recent')"
        :panelState="carousel.infoPanelState.recent"
      />
    </div>
    <div class="top-upcoming">
      <Carousel
        resource="anime"
        :filter="[{ attribute: 'status', value: 'upcoming' }]"
        :sort="['popularityRank']"
        @panelOpen="toggleInfoPanel('recent')"
        :panelState="carousel.infoPanelState.recent"
      />
    </div>
    <div class="top-rated">
      <Carousel
        resource="anime"
        :filter="[{ attribute: 'averageRating', value: '5..' }]"
        :sort="['-averageRating']"
        @panelOpen="toggleInfoPanel('recent')"
        :panelState="carousel.infoPanelState.recent"
      />
    </div>
    <div class="most-popular">
      <Carousel
        resource="anime"
        :sort="['popularityRank']"
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
