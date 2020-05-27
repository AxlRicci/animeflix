<template>
  <div class="overview-details--wrapper">
    <div class="overview-details--item overview-details__rating">
      <h4>{{ anime.attributes.averageRating }}%</h4>
    </div>
    <div class="overview-details--item overview-details__year">
      <h4>{{ anime.attributes.startDate.split('-')[0] }}</h4>
    </div>
    <div class="overview-details--item overview-details__age">
      <h4>{{ anime.attributes.ageRating }}</h4>
    </div>
    <div class="overview-details--item overview-details__episodes">
      <h4>{{ this.episodeCount }} Episodes</h4>
    </div>
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
    episodeCount() {
      let attributes = this.anime.attributes
      if (attributes.episodeCount) {
        return attributes.episodeCount
      } else {
        let epCount = Math.floor(
          attributes.totalLength / attributes.episodeLength
        )
        if (epCount < 0) {
          return epCount * -1
        } else {
          return epCount
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.overview-details {
  &--wrapper {
    display: flex;
    flex-direction: row;
    justify-content: start;
  }

  &--item {
    margin-right: 30px;

    & h4 {
      margin: 0;
    }
  }

  &__rating {
    color: green;
  }
}
</style>
