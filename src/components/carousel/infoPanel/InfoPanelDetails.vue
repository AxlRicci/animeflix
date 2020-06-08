<template>
  <div class="info-panel--details">
    <div class="details--title">
      <AnimeTitle :anime="anime" />
    </div>
    <div class="details--names">
      <AnimeDetailsNames :anime="anime" />
    </div>
    <div class="details--season">
      <AnimeDetailsSeason :anime="anime" />
    </div>
    <div class="details--studio">
      <!-- Studio component -->
    </div>
  </div>
</template>

<script>
import AnimeTitle from '@/components/carousel/infoPanel/AnimeTitle'
import AnimeDetailsNames from '@/components/carousel/infoPanel/AnimeDetailsNames'
import AnimeDetailsSeason from '@/components/carousel/infoPanel/AnimeDetailsSeason'

export default {
  components: {
    AnimeTitle,
    AnimeDetailsNames,
    AnimeDetailsSeason
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
