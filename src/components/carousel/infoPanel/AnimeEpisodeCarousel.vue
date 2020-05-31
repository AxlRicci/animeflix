<template>
  <div class="ep-carousel--wrapper">
    <div class="ep-carousel--nav__left">BACK</div>
    <div class="ep-carousel">
      <div class="ep-carousel--overflow-container">
        <div
          class="ep-carousel-cards"
          :style="{
            transform: 'translateX' + '(' + currentOffset + 'px' + ')'
          }"
        >
          <div
            class="ep-carousel--card"
            v-for="episode in episodes"
            :key="episode.id"
          >
            <img :src="episode.attributes.thumbnail.original" />
          </div>
        </div>
      </div>
    </div>
    <div class="ep-carousel--nav__right" @click="moveCarousel(1)">
      <p @click="moveCarousel(1)">forward</p>
      <p @click="getEpisodes()"></p>
    </div>
  </div>
</template>

<script>
import KitsuService from '@/services/KitsuService.js'

export default {
  props: {
    anime: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      episodes: [],
      selectedItem: null,
      currentOffset: 0
    }
  },
  created() {
    this.getEpisodes()
  },
  methods: {
    moveCarousel(direction) {
      console.log('moved', direction)
      if (direction === 1 && !this.atEndofList) {
        this.currentOffset -= this.scrollInterval
      } else if (direction === -1 && !this.atHeadofList) {
        this.currentOffset += this.scrollInterval
      }
    },
    getEpisodes() {
      // call kitsu for proper episode list.
      KitsuService.getData(this.anime.relationships.episodes.links.related)
        .then(response => {
          console.log(response)
          this.episodes = response.data.data
          console.log(this.episodes)
        })
        .catch(err => {
          console.error('There was an error fetching episodes', err)
        })
    }
  },
  computed: {
    atEndofList() {
      return this.currentOffset < -1 * (this.listLength - this.containerWidth)
    },
    atHeadofList() {
      return this.currentOffset === 0
    },
    listLength() {
      return (
        this.items.length +
        this.gap * this.coverNumber +
        this.items.length * this.width
      )
    },
    scrollInterval() {
      return this.containerWidth + this.gap
    },
    width() {
      return (
        ((this.containerWidth - this.gap) * (this.coverNumber - 1)) /
        this.coverNumer
      )
    },
    imgStyle() {
      return 'width: ' + this.width + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
.ep-carousel--wrapper {
  width: 100%;
}

.ep-carousel {
  display: flex;
  justify-self: center;
  width: 90%;

  &--overflow-container {
    overflow: hidden;
  }

  // Add nav styles here.
}

.ep-carousel-cards {
  display: flex;
  transition: transform 150ms ease-out;
  transform: translatex(0px);

  .ep-carousel--card {
    margin: 10px 5px 10px 0;
    cursor: pointer;
    background-color: #999;
    z-index: 3;
    margin-bottom: 2px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    img {
      width: 200px;
      vertical-align: bottom;
      border-radius: 4px;
      transition: opacity 150ms linear;
      user-select: none;

      &:hover {
        opacity: 0.5;
      }
    }
  }
}
</style>
