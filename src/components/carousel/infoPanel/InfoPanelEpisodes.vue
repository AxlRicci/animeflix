<template>
  <div class="info-panel--episodes">
    <div class="episode-info--title">
      <AnimeTitle :anime="anime" />
    </div>
    <div class="episode-info--carousel">
      <AnimeEpisodeCarousel :anime="anime" />
    </div>
  </div>
</template>

<script>
import AnimeTitle from '@/components/carousel/infoPanel/AnimeTitle'
import AnimeEpisodeCarousel from '@/components/carousel/infoPanel/AnimeEpisodeCarousel'

export default {
  components: {
    AnimeTitle,
    AnimeEpisodeCarousel
  },
  props: {
    anime: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.info-panel--episodes {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto auto;
  grid-template-areas: 'title' 'carousel';
  margin: 20px;
}

.episode-info {
  &--title {
    grid-area: title;
    color: #fff;
  }

  &--carousel {
    grid-area: carousel;
  }
}
</style>
