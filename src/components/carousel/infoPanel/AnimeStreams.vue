<template>
  <div class="streams--wrapper">
    <div v-if="streamers.length > 0" class="stream-btn--group">
      <button
        class="stream-btn"
        v-for="stream in streamers"
        :key="stream.id"
        @click="streamLink(stream.attributes.url)"
      >
        <img class="stream-btn--icon" :src="icon(stream.attributes.url)" />
      </button>
    </div>
    <div v-if="streamers.length <= 0" class="stream-info">
      <p>No Streams Available</p>
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
      streamers: []
    }
  },
  created() {
    this.getStreams()
  },
  methods: {
    getStreams() {
      KitsuService.getData(
        this.anime.relationships.streamingLinks.links.related
      )
        .then(response => {
          this.streamers = response.data.data
        })
        .catch(err => {
          console.log('there was an error fetching streaming links:', err)
        })
    },
    icon(url) {
      let icon = url.match(/[a-z]{1,}((?=\.co)|(?=\.com)|(?=\.io))/)[0]
      return require('../../../assets/' + icon + '.svg')
    },
    streamLink(url) {
      window.open(url, 'streaming window')
    }
  }
}
</script>

<style lang="scss" scoped>
.stream-btn {
  background: #fff;
  margin: 14px 14px 0 0;
  border: none;
  border-radius: 5px;

  &--icon {
    margin: 5px;
  }
}
</style>
