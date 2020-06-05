<template>
  <div class="episode-card--wrapper">
    <div class="episode-card">
      <div class="episode-card--image">
        <img
          :style="imgStyle"
          :src="episode.attributes.thumbnail.original"
          alt=""
        />
      </div>
      <div class="episode-card--details">
        <h3>{{ episode.attributes.canonicalTitle }}</h3>
        <h3>{{ episode.attributes.length }}m</h3>
      </div>
      <div class="episode-card--synopsis">
        <p>
          {{ clippedSynopsis }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 400
    },
    episode: {
      type: Object,
      required: true
    }
  },
  computed: {
    imgStyle() {
      return `width: ${this.width}px; height: auto;`
    },
    clippedSynopsis() {
      let origSynopsisArr = this.episode.attributes.synopsis.split(
        /(?<=[a-z]{2})\./
      )
      let outSynopsisArr = []
      for (let i = 0; i < 1; i++) {
        outSynopsisArr.push(origSynopsisArr[i])
      }
      let outSynopsisStr = outSynopsisArr.join('.')
      if (/[.\n\s]/.test(outSynopsisStr[outSynopsisStr.length - 1])) {
        return outSynopsisStr
      } else {
        return outSynopsisStr + '.'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.episode-card {
  width: min-content;
  margin: 0 auto;
  text-align: left;
  font-size: 18px;
  line-height: 1.2;
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto auto auto;
  grid-template-areas: 'image' 'details' 'synopsis';

  &--image {
    grid-area: image;
    width: 400px;
    height: 220px;

    & img {
      object-fit: cover;
      width: 100%;
      height: 100%;
    }
  }

  &--details {
    grid-area: details;
    color: #808080;
    display: flex;
    justify-content: space-between;
  }

  &--synopsis {
    grid-area: synopsis;
    color: #999999;

    & p {
      margin: 0;
    }
  }
}
</style>
