<template>
  <div class="info-panel--details">
    <div class="details--title">
      <AnimeTitle :anime="anime" />
    </div>
    <div class="details--names">
      <AnimeDetailsNames :anime="anime" />
    </div>
    <div class="details--airing">
      <AnimeDetailsAiring :anime="anime" />
    </div>
    <div class="details--production">
      <AnimeDetailsProduction :anime="anime" />
    </div>
    <div class="cover-image--container">
      <img
        class="cover-image"
        :src="anime.attributes.coverImage.original"
        alt=""
      />
    </div>
  </div>
</template>

<script>
import AnimeTitle from '@/components/carousel/infoPanel/AnimeTitle'
import AnimeDetailsNames from '@/components/carousel/infoPanel/AnimeDetailsNames'
import AnimeDetailsAiring from '@/components/carousel/infoPanel/AnimeDetailsAiring'
import AnimeDetailsProduction from '@/components/carousel/infoPanel/AnimeDetailsProduction'

export default {
  components: {
    AnimeTitle,
    AnimeDetailsNames,
    AnimeDetailsAiring,
    AnimeDetailsProduction
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
.info-panel--details {
  height: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  grid-template-rows: 1fr 1fr 1fr;
  grid-template-areas: 'title title title' 'names production .' 'details . .';
  margin: 20px;
}

.details {
  &--title {
    z-index: 2;
    color: #fff;
    grid-area: title;
  }

  &--names {
    z-index: 2;
    grid-area: names;
  }

  &--airing {
    z-index: 2;
    grid-area: details;
  }

  &--production {
    z-index: 2;
    grid-area: production;
  }
}
.cover-image--container {
  z-index: 1;
  grid-column: 2/4;
  grid-row: 1/5;
  width: 100%;
  height: 100%;
}

.cover-image {
  width: 100%;
  max-height: 100%;
  object-fit: cover;
  opacity: 0.2;
}
</style>
