<template>
  <div class="overview-credits--wrapper">
    <p v-if="this.cast.length > 0">
      <b>Starring:</b>
      {{ cast.join(', ') }}
    </p>
    <p v-if="this.genres.length > 0">
      <b>Genres:</b>
      {{ genres.join(', ') }}
    </p>
    <p v-if="this.categories.length > 0">
      <b>Categories:</b>
      {{ categories.join(', ') }}
    </p>
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
      cast: [],
      genres: [],
      categories: []
    }
  },
  created() {
    this.getNewInfo()
  },
  watch: {
    anime: 'getNewInfo'
  },
  methods: {
    getNewInfo() {
      this.cast = []
      this.genres = []
      this.categories = []
      this.getCast()
      this.getGenres()
      this.getCategories()
    },
    getCast() {
      KitsuService.getData(
        this.anime.relationships.animeCharacters.links.related
      )
        .then(characterResponse => {
          characterResponse.data.data.forEach((character, index) => {
            if (index < 3) {
              if (character.attributes.role == 'main') {
                KitsuService.getData(
                  character.relationships.castings.links.related
                )
                  .then(castingResponse => {
                    castingResponse.data.data.forEach(castMember => {
                      if (castMember.attributes.locale == 'ja') {
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
                      }
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
    getGenres() {
      KitsuService.getData(this.anime.relationships.genres.links.related)
        .then(response => {
          response.data.data.forEach((genre, index) => {
            if (index < 3) {
              this.genres.push(genre.attributes.name)
            }
          })
        })
        .catch(err => {
          console.log('there was an error fetching genres', err)
        })
    },
    getCategories() {
      KitsuService.getData(this.anime.relationships.categories.links.related)
        .then(response => {
          response.data.data.forEach((category, index) => {
            if (index < 3) {
              this.categories.push(category.attributes.title)
            }
          })
        })
        .catch(err => {
          console.log('there was an error fetching categories', err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.overview-credits--wrapper {
  display: flex;
  flex-direction: column;
  text-align: left;

  & p {
    margin: 0;
    color: #999;
  }
}
</style>
