<template>
  <div class="overview-title--wrapper">
    <h1>{{ this.anime.attributes.canonicalTitle }}</h1>
  </div>
</template>

<script>
export default {
  name: 'AnimeTitle',
  props: {
    anime: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.overview-title--wrapper {
  text-align: left;

  & h1 {
    font-size: 3vw;
    margin: 0px;
  }
}
</style>
