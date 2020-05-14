<template>
  <div class="container">
    <Carousel
      @nextPage="getAnimes(10)"
      imgWidth="155"
      :items="animeList"
      :scrollInterval="700"
      @panelOpen="toggleInfoPanel('recent')"
      :panelOpen="infoPanel.recent"
    />
    <Carousel
      @nextPage="getAnimes(10)"
      imgWidth="155"
      :items="animeList"
      :scrollInterval="700"
      @panelOpen="toggleInfoPanel('trending')"
      :panelOpen="infoPanel.trending"
    />
  </div>
</template>

<script>
import Carousel from '@/components/Carousel'
import KitsuService from '@/services/KitsuService.js'

export default {
  name: 'Home',
  components: {
    Carousel
  },
  data() {
    return {
      animeList: [],
      lastCall: '',
      currentCall: '',
      infoPanel: {
        recent: false,
        trending: false
      }
    }
  },
  created() {
    KitsuService.getData('anime')
      .then(response => {
        this.animeList = response.data.data
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    getAnimes(count) {
      let currentCall = `https://kitsu.io/api/edge/anime?page%5Blimit%5D=${count}&page%5Boffset%5D=${this
        .animeList.length +
        count -
        10}`
      if (this.lastCall !== currentCall) {
        this.lastCall = currentCall
        KitsuService.getData(currentCall)
          .then(response => {
            response.data.data.forEach(item => {
              this.animeList.push(item)
            })
            this.lastCall = currentCall
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    toggleInfoPanel(name) {
      Object.keys(this.infoPanel).forEach(key => {
        if (key != name) {
          this.infoPanel[key] = false
        } else if (key == name) {
          this.infoPanel[key] = true
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
