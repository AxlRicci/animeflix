<template>
  <div class="info-panel--episodes">
    <div class="episode-info--title">
      <AnimeTitle :anime="anime" />
    </div>
  </div>
</template>

<script>
import AnimeTitle from '@/components/carousel/infoPanel/AnimeTitle'

export default {
  components: {
    AnimeTitle
  },
  props: {
    anime: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped></style>
