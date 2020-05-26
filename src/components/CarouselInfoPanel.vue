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
  grid-template-columns: 3fr 5fr;
  grid-template-rows: auto;
  grid-template-areas: 'overview trailer';
  border-radius: 10px;

  &--overview {
    grid-area: overview;
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
    grid-area: trailer;
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

    & h1 {
      margin: 0px 0 10px 0;
    }
  }

  &--details {
    grid-area: details;
  }

  &--synopsis {
    grid-area: synopsis;
  }

  &--actions {
    grid-area: actions;
  }

  &--credits {
    grid-area: credits;
  }
}
</style>
