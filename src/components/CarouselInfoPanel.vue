<template>
  <div class="info-panel">
    <div class="info-panel--statistics"></div>
    <div class="info-panel--overview">
      <div class="overview--title">
        <h1>{{ itemInfo.attributes.canonicalTitle }}</h1>
      </div>
      <div class="overview--details">
        <div class="overview--details__item overview--details__rating">
          <h4>{{ itemInfo.attributes.averageRating }}%</h4>
        </div>
        <div class="overview--details__item overview--details__year">
          <h4>{{ itemInfo.attributes.startDate.split('-')[0] }}</h4>
        </div>
        <div class="overview--details__item overview--details__age">
          <h4>{{ itemInfo.attributes.ageRating }}</h4>
        </div>
        <div class="overview--details__item overview--details__episodes">
          <h4>{{ this.episodeCount }} Episodes</h4>
        </div>
      </div>
      <div class="overview--synopsis">
        <p>{{ clippedSynopsis }}</p>
      </div>
      <div class="overview--actions">
        <button @click="getDetails" class="overview--actions__item overview--actions__stream">Play</button>
        <button class="overview--actions__item overview--actions__list">List</button>
      </div>
      <div class="overview--credits">
        <p v-if="this.cast.length > 0">Starring: {{ cast.join(', ') }}</p>
        <p v-if="this.genres.length > 0">Genres: {{ genres.join(', ') }}</p>
        <p v-if="this.categories.length > 0">This anime has: {{ categories.join(', ') }}</p>
      </div>
    </div>
    <div class="info-panel--trailer">
      <div class="iframe-container">
        <iframe
          :src="this.youtubeUrl"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
    </div>
    <div class="close">
      <img @click="removeSelected" src="https://img.icons8.com/metro/26/000000/multiply.png" />
    </div>
  </div>
</template>

<script>
import KitsuService from '@/services/KitsuService.js'

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
  data() {
    return {
      cast: [],
      genres: [],
      categories: []
    }
  },
  created() {
    this.getDetails()
    this.getCast()
  },
  methods: {
    removeSelected() {
      this.$emit('removeSelected')
    },
    getCast() {
      KitsuService.getData(
        this.itemInfo.relationships.animeCharacters.links.related
      )
        .then(characterResponse => {
          characterResponse.data.data.forEach((character, index) => {
            if (index > 3) {
              if (character.attributes.role == 'main') {
                KitsuService.getData(
                  character.relationships.castings.links.related
                )
                  .then(castingResponse => {
                    castingResponse.data.data.forEach(castMember => {
                      KitsuService.getData(
                        castMember.relationships.person.links.related
                      )
                        .then(personResponse => {
                          this.cast.push(
                            personResponse.data.data.attributes.name
                          )
                        })
                        .catch(personError => {
                          console.log(
                            'There was an error gathering info on the person',
                            personError
                          )
                        })
                    })
                  })
                  .catch(castingError => {
                    console.log(
                      'There was an error gathering casting info for the anime character',
                      castingError
                    )
                  })
              }
            } else {
              return null
            }
          })
        })
        .catch(characterError => {
          console.log(
            'There was an error gathering anime characters',
            characterError
          )
        })
    },
    getDetails() {
      console.log(this.itemInfo.relationships.castings.links.related)
      let details = {
        genres: this.itemInfo.relationships.genres.links.related,
        categories: this.itemInfo.relationships.categories.links.related
      }
      Object.keys(details).forEach(detail => {
        KitsuService.getData(details[detail])
          .then(response => {
            console.log(response)
            response.data.data.forEach((item, index) => {
              if (index < 4) {
                if (detail == 'categories') {
                  this[detail].push(item.attributes.title)
                } else if (detail == 'genres') {
                  this[detail].push(item.attributes.name)
                }
              } else {
                return null
              }
            })
          })
          .catch(error => {
            console.log(`Error gathering ${detail}: ${error}`)
          })
      })
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
    youtubeUrl() {
      return `https://www.youtube-nocookie.com/embed/${this.itemInfo.attributes.youtubeVideoId}?autoplay=1&modestbranding=1&showinfo=0&rel=0&cc_load_policy=1&iv_load_policy=3&fs=0&color=white&controls=0&disablekb=1"`
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
    },
    clippedSynopsis() {
      let origSynopsisArr = this.itemInfo.attributes.synopsis.split(
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
    },
    episodeCount() {
      let anime = this.itemInfo.attributes
      if (anime.episodeCount) {
        return anime.episodeCount
      } else {
        let epCount = Math.floor(anime.totalLength / anime.episodeLength)
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

.iframe-container {
  overflow: hidden;
  padding-top: 56.25%;
  position: relative;

  & iframe {
    border: 0;
    border-radius: 0 5px 5px 0;
    height: 100%;
    left: 0;
    position: absolute;
    top: 0;
    width: 100%;
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
    display: flex;
    flex-direction: row;
    justify-content: start;

    &__item {
      margin-right: 10px;
    }
  }

  &--synopsis {
    grid-area: synopsis;
    text-align: left;
    color: #999;
  }

  &--actions {
    grid-area: actions;
    display: flex;
    justify-items: start;

    &__item {
      margin-right: 10px;
      padding: 7px 20px;
      border: none;
      border-radius: 5px;
      font-size: 18px;
    }

    &__stream {
      background-color: white;
    }

    &__list {
      background-color: #999;
      color: #000;
    }
  }

  &--credits {
    grid-area: credits;
    display: flex;
    flex-direction: column;
    text-align: left;
    & p {
      margin: 0;
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
