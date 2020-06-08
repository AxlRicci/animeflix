<template>
  <div class="details-names--wrapper">
    <ul class="details-names--list">
      <li class="details-names--list-label"><b>Names</b></li>
      <li
        class="details-names--item"
        v-for="name in sortedNames"
        :key="name.region"
      >
        {{ name.region }}: {{ name.value }}
      </li>
    </ul>
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
  data() {
    return {
      names: []
    }
  },
  created() {
    this.getAvailableNames()
  },
  methods: {
    getAvailableNames() {
      Object.keys(this.anime.attributes.titles).forEach(title => {
        let outObj = {
          region: this.getNameRegion(title),
          value: this.anime.attributes.titles[title]
        }
        this.names.push(outObj)
      })
    },
    getNameRegion(region) {
      switch (region) {
        case 'en':
          return 'English'
        case 'en_us':
          return 'English (American)'
        case 'en_jp':
          return 'Japanese (Romaji)'
        case 'ja_jp':
          return 'Japanese'
        default:
          break
      }
    }
  },
  computed: {
    sortedNames() {
      let nameList = this.names
      return nameList.sort((a, b) => (a.region > b.region ? 1 : -1))
    }
  }
}
</script>

<style lang="scss" scoped>
.details-names--list {
  list-style-type: none;
  text-align: start;
}
</style>
