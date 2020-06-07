<template>
  <div class="info-panel">
    <div class="info-panel--overview">
      <div class="overview--title">
        <AnimeTitle :anime="itemInfo" />
      </div>
      <div class="overview--details">
        <AnimeDetails :anime="itemInfo" />
      </div>
      <div class="overview--synopsis">
        <AnimeSynopsis :anime="itemInfo" />
      </div>
      <div class="overview--actions">
        <AnimeActions :anime="itemInfo" />
      </div>
      <div class="overview--credits">
        <AnimeCredits :anime="itemInfo" />
      </div>
    </div>
    <div class="info-panel--trailer">
      <AnimeTrailer :anime="itemInfo" />
    </div>
  </div>
</template>

<script>
import AnimeDetails from '@/components/carousel/infoPanel/AnimeDetails'
import AnimeSynopsis from '@/components/carousel/infoPanel/AnimeSynopsis'
import AnimeActions from '@/components/carousel/infoPanel/AnimeActions'
import AnimeCredits from '@/components/carousel/infoPanel/AnimeCredits'
import AnimeTrailer from '@/components/carousel/infoPanel/AnimeTrailer'
import AnimeTitle from '@/components/carousel/infoPanel/AnimeTitle'

export default {
  components: {
    AnimeDetails,
    AnimeSynopsis,
    AnimeActions,
    AnimeCredits,
    AnimeTrailer,
    AnimeTitle
  },
  props: {
    itemInfo: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
* {
  box-sizing: border-box;
}

.info-panel {
  position: relative;
  background: #000000;
  color: #fff;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: 100%;

  &--overview {
    grid-column: 1/6;
    grid-row: 1/2;
    z-index: 1;
    display: grid;
    grid-template-rows: repeat(4, min-content);
    grid-template-areas:
      'title'
      'details'
      'synopsis'
      'actions'
      'credits';
    margin: 20px;
  }

  &--trailer {
    grid-column: 6/13;
    grid-row: 1/2;
  }
}

.overview {
  &--title {
    grid-area: title;
    margin-bottom: 9px;
  }

  &--details {
    grid-area: details;
    margin: 9px 0;
  }

  &--synopsis {
    grid-area: synopsis;
    margin: 9px 0;
  }

  &--actions {
    grid-area: actions;
    margin: 9px 0;
  }

  &--credits {
    grid-area: credits;
    margin: 13px 0 13px 0;
  }
}
</style>
