<template>
  <div class="home--wrapper">
    <div class="trending">
      <TitleCarousel
        resource="trending/anime"
        @panelOpen="toggleInfoPanel('trending')"
        :panelState="carousel.infoPanelState.trending"
        title="Trending"
      />
    </div>
    <div class="top-airing">
      <TitleCarousel
        title="Top Airing"
        resource="anime"
        :filter="[
          { attribute: 'status', value: 'current' },
          { attribute: 'averageRating', value: '5..' }
        ]"
        :sort="['popularityRank']"
        @panelOpen="toggleInfoPanel('topAiring')"
        :panelState="carousel.infoPanelState.topAiring"
      />
    </div>
    <div class="top-upcoming">
      <TitleCarousel
        title="Top Upcoming"
        resource="anime"
        :filter="[{ attribute: 'status', value: 'upcoming' }]"
        :sort="['popularityRank']"
        @panelOpen="toggleInfoPanel('topUpcoming')"
        :panelState="carousel.infoPanelState.topUpcoming"
      />
    </div>
    <div class="top-rated">
      <TitleCarousel
        title="Top Rated"
        resource="anime"
        :filter="[{ attribute: 'averageRating', value: '5..' }]"
        :sort="['-averageRating']"
        @panelOpen="toggleInfoPanel('topRated')"
        :panelState="carousel.infoPanelState.topRated"
      />
    </div>
    <div class="most-popular">
      <TitleCarousel
        title="Most Popular"
        resource="anime"
        :sort="['popularityRank']"
        @panelOpen="toggleInfoPanel('mostPopular')"
        :panelState="carousel.infoPanelState.mostPopular"
      />
    </div>
  </div>
</template>

<script>
import TitleCarousel from '@/components/carousel/TitleCarousel'
export default {
  name: 'Home',
  components: {
    TitleCarousel
  },
  data() {
    return {
      carousel: {
        infoPanelState: {
          trending: false,
          topAiring: false,
          topUpcoming: false,
          topRated: false,
          mostPopular: false,
          test: false
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
.home-wrapper {
  display: flex;
  justify-items: center;
  flex-direction: column;
}

@media (min-width: 640px) {
}

@media (min-width: 768px) {
}

@media (min-width: 1024px) {
}

@media (min-width: 1280px) {
}
</style>
