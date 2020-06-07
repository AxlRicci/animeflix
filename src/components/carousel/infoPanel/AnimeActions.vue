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
    margin-right: 14px;
    padding: 9px 26px;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    & p {
      font-size: 24px;
    }

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
  }

  &-icon {
    height: 34px;
    margin: auto 0;
  }
}
</style>
