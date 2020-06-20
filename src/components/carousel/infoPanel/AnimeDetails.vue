<template>
  <div class="overview-details--wrapper">
    <div
      class="overview-details--item overview-details__rating"
      v-if="anime.attributes.averageRating"
    >
      <span class="rating-item">
        <h4>{{ anime.attributes.averageRating }}%</h4>
        <img class="thumb-icon" src="../../../assets/thumb_up.svg" alt />
      </span>
    </div>
    <div class="overview-details--item overview-details__year">
      <h4>{{ anime.attributes.startDate.split('-')[0] }}</h4>
    </div>
    <div class="overview-details--item overview-details__age">
      <h4>{{ anime.attributes.ageRating }}</h4>
    </div>
    <div class="overview-details--item overview-details__episodes">
      <h4>{{ this.episodes }} Episode{{ this.episodes > 1 ? 's' : '' }}</h4>
    </div>
  </div>
</template>

<script>
import KitsuService from '@/services/KitsuService.js'
export default {
  props: {
    anime: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      episodes: 'N/A'
    }
  },
  created() {
    this.episodeCount()
  },
  watch: {
    anime: function() {
      this.episodeCount()
    }
  },
  methods: {
    episodeCount() {
      KitsuService.getData(this.anime.relationships.episodes.links.related)
        .then(response => {
          this.episodes = response.data.meta.count
        })
        .catch(err => {
          console.log(err)
        })
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
    align-items: center;
  }

  &--item {
    margin-right: 0.5em;

    & h4 {
      margin: 0;
      font-size: 2vw;
    }
  }

  &__rating {
    color: green;
  }

  &__age {
    border: 1px solid #fff;
    padding: 0 8.4px;
  }
}

.rating-item {
  display: flex;

  & h4 {
    margin-right: 5px;
  }
}

.thumb-icon {
  height: 2.5vw;
}

@media (min-width: 992px) {
  .overview-details {
    &--item {
      margin-right: 1em;
      & h4 {
        font-size: 20px;
      }
    }
  }

  .thumb-icon {
    height: 24px;
  }
}
</style>
