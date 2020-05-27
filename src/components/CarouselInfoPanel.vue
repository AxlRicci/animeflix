<template>
  <div class="info-panel">
    <div class="info-panel--statistics"></div>
    <div class="info-panel--overview">
      <div class="overview--title">
        <h1>{{ itemInfo.attributes.canonicalTitle }}</h1>
      </div>
      <div class="overview--details">
        <!-- component -->
        <AnimeDetails :anime="itemInfo" />
      </div>
      <div class="overview--synopsis">
        <!-- component -->
        <AnimeSynopsis :anime="itemInfo" />
      </div>
      <div class="overview--actions">
        <!-- component -->
        <AnimeActions />
      </div>
      <div class="overview--credits">
        <!-- component -->
        <AnimeCredits :anime="itemInfo" />
      </div>
    </div>
    <div class="info-panel--trailer">
      <!-- component -->
      <AnimeTrailer :anime="itemInfo" />
    </div>
    <div class="close">
      <img @click="removeSelected" src="https://img.icons8.com/metro/26/000000/multiply.png" />
    </div>
  </div>
</template>

<script>
import AnimeDetails from '@/components/infoPanel/AnimeDetails'
import AnimeSynopsis from '@/components/infoPanel/AnimeSynopsis'
import AnimeActions from '@/components/infoPanel/AnimeActions'
import AnimeCredits from '@/components/infoPanel/AnimeCredits'
import AnimeTrailer from '@/components/infoPanel/AnimeTrailer'

export default {
  components: {
    AnimeDetails,
    AnimeSynopsis,
    AnimeActions,
    AnimeCredits,
    AnimeTrailer
  },
  props: {
    itemInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeSelected() {
      this.$emit('removeSelected')
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
  grid-template-rows: auto;

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

.close {
  position: absolute;
  top: 0;
  right: 0;
  & img {
    margin: 10px;
  }
}

.overview {
  &--title {
    grid-area: title;
    text-align: left;
    margin: 13px 0 0 0;

    & h1 {
      margin: 0;
      font-size: 50px;
    }
  }

  &--details {
    grid-area: details;
    margin: 0 0 7px 0;
  }

  &--synopsis {
    grid-area: synopsis;
    margin: 7px 0;
  }

  &--actions {
    grid-area: actions;
    margin: 7px 0;
  }

  &--credits {
    grid-area: credits;
    margin: 13px 0 13px 0;
  }
}
</style>
