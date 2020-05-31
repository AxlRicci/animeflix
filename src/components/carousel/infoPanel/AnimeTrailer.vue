<template>
  <div
    :class="{
      'trailer--container': trailerVarified,
      'cover-image--container': !trailerVarified,
      'poster-image--container': !coverImageAvailable
    }"
  >
    <img
      v-if="this.trailerVarified == false"
      :src="this.coverImageSrc"
      class="cover-image"
      :class="{
        'cover-image': coverImageAvailable,
        'poster-image': !coverImageAvailabe
      }"
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
      trailerVarified: '',
      coverImageAvailabe: '',
      coverImageSrc: ''
    }
  },
  watch: {
    anime: function() {
      this.youtubeVarification()
    }
  },
  created() {
    this.youtubeVarification()
  },
  computed: {
    youtubeUrl() {
      // changed autoplay to 0 for dev -- return to 1 for production.
      return `https://www.youtube-nocookie.com/embed/${this.anime.attributes.youtubeVideoId}?autoplay=0&modestbranding=1&showinfo=0&rel=0&cc_load_policy=1&iv_load_policy=3&fs=0&color=white&controls=0&disablekb=1"`
    }
  },
  methods: {
    coverImageFinder() {
      if (this.anime.attributes.coverImage) {
        this.coverImageAvailabe = true
        this.coverImageSrc = this.anime.attributes.coverImage.original
      } else {
        this.coverImageAvailable = false
        this.coverImageSrc = this.anime.attributes.posterImage.small
      }
    },
    youtubeVarification() {
      YoutubeService.verifyVideo(this.anime.attributes.youtubeVideoId)
        .then(response => {
          console.log(response)
          if (response.data.items.length > 0) {
            if (response.data.items[0].status.privacyStatus == 'public') {
              this.trailerVarified = true
            }
          } else {
            this.trailerVarified = false
            this.coverImageFinder()
          }
        })
        .catch(err => {
          console.error('error verifying video', err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.trailer--container {
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

.cover-image--container {
  width: 100%;
  height: 100%;
  padding: 0;
}

.cover-image {
  height: 100%;
  width: 100%;
  object-fit: contain;
}

.poster-image {
  height: auto;
  width: 354px;
}
</style>
