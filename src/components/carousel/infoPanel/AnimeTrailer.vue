<template>
  <div
    :class="{
      'trailer-container': trailerVarified,
      'image-container': !trailerVarified
    }"
  >
    <img
      v-if="this.trailerVarified == false"
      :src="this.anime.attributes.coverImage.original"
      class="cover-image"
      alt=""
    />
    <iframe
      v-if="this.trailerVarified"
      :src="this.youtubeUrl"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
import YoutubeService from '@/services/YoutubeService.js'
export default {
  props: {
    anime: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      trailerVarified: ''
    }
  },
  created() {
    YoutubeService.verifyVideo(this.anime.attributes.youtubeVideoId)
      .then(response => {
        console.log(response)
        if (response.data.items.length > 0) {
          if (response.data.items[0].status.privacyStatus == 'public') {
            this.trailerVarified = true
          }
        } else {
          this.trailerVarified = false
          // call method to set correct cover image.
        }
      })
      .catch(err => {
        console.error('error verifying video', err)
      })
  },
  computed: {
    youtubeUrl() {
      // changed autoplay to 0 for dev -- return to 1 for production.
      return `https://www.youtube-nocookie.com/embed/${this.anime.attributes.youtubeVideoId}?autoplay=0&modestbranding=1&showinfo=0&rel=0&cc_load_policy=1&iv_load_policy=3&fs=0&color=white&controls=0&disablekb=1"`
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.trailer-container {
  overflow: hidden;
  padding-top: 56.25%;
  position: relative;

  & iframe {
    border: 0;
    border-radius: 0 5px 5px 0;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
  }
}

.image-container {
  padding-top: 0;

  & img {
    height: 600px;
    width: 100%;
  }
}
</style>
