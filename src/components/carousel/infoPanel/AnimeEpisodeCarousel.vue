<template>
  <div class="ep-carousel--wrapper">
    <Carousel
      class="ep-carousel"
      :perPage="perPage"
      :navigationEnabled="true"
      :paginationEnabled="false"
      @navigation-click="pageHandler"
      @pageChange="pageHandler"
    >
      <Slide
        v-for="episode in episodes"
        :key="episode.attributes.id"
        :data-id="episode.id"
      >
        <AnimeEpisodeCard
          :episode="episode"
          :fallbackImg="anime.attributes.posterImage.small"
        />
      </Slide>
    </Carousel>
  </div>
</template>

<script>
import KitsuService from '@/services/KitsuService.js'
import { Carousel, Slide } from 'vue-carousel'
import AnimeEpisodeCard from '@/components/carousel/infoPanel/AnimeEpisodeCard'

export default {
  components: {
    Carousel,
    Slide,
    AnimeEpisodeCard
  },
  props: {
    anime: {
      type: Object,
      required: true
    },
    imgWidth: {
      type: String,
      default: '400'
    },
    perPage: {
      type: Number,
      default: 4
    }
  },
  data() {
    return {
      episodes: [],
      selectedItem: null,
      lastCall: '',
      nextCall: ''
    }
  },
  created() {
    this.getEpisodes()
  },
  methods: {
    getEpisodes() {
      // call kitsu for proper episode list.
      KitsuService.getData(this.anime.relationships.episodes.links.related)
        .then(response => {
          console.log(response)
          this.nextCall = response.data.links.next
          this.episodes = response.data.data
          console.log(this.episodes)
        })
        .catch(err => {
          console.error('There was an error fetching episodes', err)
        })
    },
    getAdditionalEpisodes() {
      if (this.lastCall !== this.nextCall) {
        this.lastCall = this.nextCall
        KitsuService.getData(this.nextCall)
          .then(response => {
            response.data.data.forEach(item => {
              this.episodes.push(item)
            })
            this.nextCall = response.data.links.next
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    pageHandler(page) {
      console.log(page)
      if (page >= this.pages - 1) {
        // At end of list, fetch more data
        console.log('get more episodes')
        this.getAdditionalEpisodes()
      }
    }
  },
  computed: {
    imgStyle() {
      return `width: ${this.imgWidth}px; height: auto`
    },
    pages() {
      return Math.floor(this.episodes.length / this.perPage)
    }
  }
}
</script>

<style lang="scss" scoped>
.ep-carousel--wrapper {
  width: 100%;
}

.ep-carousel {
  margin: auto 0;
}
</style>
