<template>
  <div class="info-panel">
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
    </div>
    <div class="info-panel--cover" v-if="this.coverAvailable">
      <img class="cover-image" :src="this.coverSource" alt="" />
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
  },
  data() {
    return {
      coverAvailable: false,
      coverSource: ''
    }
  },
  created() {
    this.getCover()
  },
  watch: {
    anime: function() {
      this.getCover()
    }
  },
  methods: {
    getCover() {
      if (
        Object.prototype.hasOwnProperty.call(
          this.anime.attributes.coverImage,
          'original'
        )
      ) {
        this.coverSource = this.anime.attributes.coverImage.original
        this.coverAvailable = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.info-panel {
  position: relative;
  background: #000000;
  color: #fff;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 100%;

  &--details {
    display: grid;
    grid-column: 1/8;
    grid-row: 1/2;
    z-index: 1;
    grid-template-rows: repeat(3, min-content);
    grid-template-columns: 1fr 1fr;
    grid-template-areas: 'title title' 'names production' 'airing airing';
    margin: 20px;
  }

  &--cover {
    grid-column: 1/13;
    grid-row: 1/2;
  }
}

.details {
  &--title {
    grid-area: title;
    color: #fff;
  }

  &--names {
    z-index: 2;
    grid-area: names;
  }

  &--airing {
    z-index: 2;
    grid-area: airing;
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
