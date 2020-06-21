<template>
  <div class="overview-actions--wrapper">
    <div class="overview-actions--buttons">
      <button
        @click="toggleStreams"
        class="overview-actions--item overview-actions--item__stream"
      >
        <span class="button button--play">
          <img
            class="button-icon button-icon--play"
            src="../../../assets/play_arrow.svg"
            alt
          />
          <p>Play</p>
        </span>
      </button>
      <button class="overview-actions--item overview-actions--item__list">
        <div class="button button--add"></div>
        <span class="button button--add">
          <img
            class="button-icon button-icon--add"
            src="../../../assets/add.svg"
            alt
          />
          <p>My List</p>
        </span>
      </button>
    </div>
    <div v-if="showStreams" class="overview-actions--streams">
      <AnimeStreams :anime="anime" />
    </div>
  </div>
</template>

<script>
import AnimeStreams from '@/components/carousel/infoPanel/AnimeStreams'
export default {
  components: {
    AnimeStreams
  },
  props: {
    anime: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      showStreams: false
    }
  },
  methods: {
    toggleStreams() {
      this.showStreams = !this.showStreams
    }
  },
  watch: {
    anime: function() {
      this.showStreams = false
    }
  }
}
</script>

<style lang="scss" scoped>
.overview-actions {
  &--wrapper {
    display: none;
  }
}

@media (min-width: 768px) {
  .overview-actions {
    &--wrapper {
      display: flex;
      justify-items: start;
      flex-direction: column;
    }

    &--buttons {
      display: flex;
    }

    &--streams {
      display: flex;
    }
    &--item {
      margin-right: 1rem;
      padding-left: calc(3.6rem / 2);
      padding-right: calc(3.6rem / 2);
      border: none;
      border-radius: 0.3rem;
      cursor: pointer;

      &__stream {
        background-color: #fff;
      }

      &__list {
        background-color: #999;
        color: #000;
      }
    }
  }

  .button {
    display: flex;
    justify-content: center;
    margin: 0px;

    & p {
      margin: auto 0;
      font-size: 14px;
    }

    &-icon {
      height: 34px;
      margin: auto 0;
    }
  }
}
</style>
