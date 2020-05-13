<template>
  <div class="info-panel">
    <div class="info-panel--statistics">
      <table class="statistics-table">
        <tr v-for="stat in stats" :key="stat.title">
          <th>{{ stat.title }}</th>
          <td>{{ stat.value }}</td>
        </tr>
      </table>
    </div>
    <div class="info-panel--overview">
      <div class="overview--title">
        <h1>{{ itemInfo.attributes.canonicalTitle }}</h1>
      </div>
      <div class="overview--genre">
        <ul class="overview--genre-list">
          <li
            v-for="genre in this.genreList"
            :key="genre.attributes.slug"
            class="overview--genre-list__item"
          >{{ genre.attributes.name }}</li>
        </ul>
      </div>
      <div class="overview--description">
        <p>{{ itemInfo.attributes.synopsis }}</p>
      </div>
    </div>
    <div class="close">
      <img @click="removeSelected" src="https://img.icons8.com/metro/26/000000/multiply.png" />
    </div>
  </div>
</template>

<script>
import gsap from 'gsap'
export default {
  props: {
    itemInfo: {
      type: Object,
      required: true
    },
    genreList: {
      type: Array,
      required: true
    }
  },
  enter() {
    gsap.fromTo(
      '.info-panel',
      {
        opacity: '0'
      },
      {
        duration: 3,
        opacity: '1',
        backgroundColor: 'black'
      }
    )
  },
  methods: {
    removeSelected() {
      this.$emit('removeSelected')
    }
  },
  computed: {
    animeStatus() {
      let capitalized = []
      let strArr = this.itemInfo.attributes.status.split(' ')
      strArr.forEach(word => {
        capitalized.push(word[0].toUpperCase() + word.slice(1, word.length))
      })
      return capitalized.join(' ')
    },
    stats() {
      let statistics = [
        { title: 'Rating', value: this.itemInfo.attributes.averageRating },
        { title: 'Rank', value: this.itemInfo.attributes.ratingRank },
        {
          title: 'Year',
          value: this.itemInfo.attributes.startDate.split('-')[0]
        },
        { title: 'Status', value: this.animeStatus }
      ]
      return statistics
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
  background: #ffffff;
  border: 1px solid #e0e0e0;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: auto;
  grid-template-areas: 'stats overview';
  border-radius: 10px;

  &--overview {
    grid-area: overview;
    display: grid;
    grid-template-rows: auto auto auto;
    grid-template-areas:
      'title'
      'genres'
      'desc';
    margin: 20px;
  }

  &--statistics {
    width: 100%;
    grid-area: stats;
    align-self: center;
    justify-self: center;
    margin: 20px 10px 20px 20px;
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

  &--genre-list {
    grid-area: genres;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    padding: 0px;
    margin: 10px 0;

    &__item {
      background: #e0e0e0;
      margin-right: 5px;
      padding: 10px;
      border: 1px solid #e0e0e0;
      border-radius: 30px;
      text-align: center;
      align-self: center;
    }
  }

  &--description {
    grid-area: desc;
    text-align: left;
    width: 100%;
    padding: 0px;

    & p {
      margin: 10px 0;
    }
  }
}
.statistics-table {
  border-collapse: collapse;
  width: 75%;
  margin: 0 auto;
  td,
  th {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #e0e0e0;
  }
}
</style>
