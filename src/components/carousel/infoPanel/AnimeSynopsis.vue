<template>
  <div class="overview-synopsis--wrapper">
    <p>{{ clippedSynopsis }}</p>
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
    clippedSynopsis() {
      let origSynopsisArr = this.anime.attributes.synopsis.split(
        /(?<=[a-z]{2})\./
      )
      let outSynopsisArr = []
      for (let i = 0; i < 2; i++) {
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
.overview-synopsis--wrapper {
  text-align: left;
  color: #999;

  & p {
    margin: 0;
    font-size: 1.125vw;
    line-height: 1.3;
  }
}

@media (max-width: 768px) {
  .overview-synopsis--wrapper {
    & p {
      font-size: 11px;
    }
  }
}
</style>
