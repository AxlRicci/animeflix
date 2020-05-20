<template>
  <div class="container">
    <div class="trending">
      <Carousel
        resource="trending/anime"
        :coverNumber="5"
        @panelOpen="toggleInfoPanel('trending')"
        :panelState="carousel.infoPanelState.trending"
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
        :coverNumber="7"
        @panelOpen="toggleInfoPanel('topAiring')"
        :panelState="carousel.infoPanelState.topAiring"
      />
    </div>
    <div class="top-upcoming">
      <Carousel
        resource="anime"
        :filter="[{ attribute: 'status', value: 'upcoming' }]"
        :sort="['popularityRank']"
        :coverNumber="7"
        @panelOpen="toggleInfoPanel('topUpcoming')"
        :panelState="carousel.infoPanelState.topUpcoming"
      />
    </div>
    <div class="top-rated">
      <Carousel
        resource="anime"
        :filter="[{ attribute: 'averageRating', value: '5..' }]"
        :sort="['-averageRating']"
        :coverNumber="7"
        @panelOpen="toggleInfoPanel('topRated')"
        :panelState="carousel.infoPanelState.topRated"
      />
    </div>
    <div class="most-popular">
      <Carousel
        resource="anime"
        :sort="['popularityRank']"
        :coverNumber="7"
        @panelOpen="toggleInfoPanel('mostPopular')"
        :panelState="carousel.infoPanelState.mostPopular"
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
          trending: false,
          topAiring: false,
          topUpcoming: false,
          topRated: false,
          mostPopular: false
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

<style lang="scss" scoped>
.container {
  display: flex;
  width: 95%;
  margin: 0 auto;
  justify-items: center;
  flex-direction: column;
}
</style>
