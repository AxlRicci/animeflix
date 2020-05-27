<template>
  <div class="trailer-container">
    <iframe
      :src="this.youtubeUrl"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    ></iframe>
  </div>
</template>

<script>
export default {
  props: {
    anime: {
      type: Object,
      required: true
    }
  },
  computed: {
    youtubeUrl() {
      return `https://www.youtube-nocookie.com/embed/${this.anime.attributes.youtubeVideoId}?autoplay=1&modestbranding=1&showinfo=0&rel=0&cc_load_policy=1&iv_load_policy=3&fs=0&color=white&controls=0&disablekb=1"`
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
</style>
