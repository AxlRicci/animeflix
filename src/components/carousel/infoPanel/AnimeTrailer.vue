<template>
  <div class="trailer-container cover-image">
    <img
      v-if="!trailerVarified"
      :src="this.anime.attributes.coverImage.original"
      class="cover-image"
      alt=""
    />
    <iframe
      v-if="trailerVarified"
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
      trailerVarified: true
    }
  },
  created() {
    YoutubeService.verifyVideo(this.anime.attributes.youtubeVideoId)
      .then(response => {
        console.log(response)
      })
      .catch(err => {
        console.error('error verifying video', err)
        this.trailerVarified = false
      })
  },
  computed: {
    youtubeUrl() {
      // changed autoplay to 0 for dev -- return to 1 for production.
      return `https://www.youtube-nocookie.com/embed/${this.anime.attributes.youtubeVideoId}?autoplay=0&modestbranding=1&showinfo=0&rel=0&cc_load_policy=1&iv_load_policy=3&fs=0&color=white&controls=0&disablekb=1"`
    }
  }
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
.cover-image {
  padding-top: 0;

  & img {
    height: 600px;
  }
}
</style>
