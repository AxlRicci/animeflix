<template>
  <div class="details-season--wrapper">
    <ul class="details-season--list">
      <li class="details-season--list-label"><b>Airing Details</b></li>
      <li
        class="details-season--list-item"
        v-for="detail in availableDetails"
        :key="detail.name"
      >
        {{ setTitle(detail.name) }}: {{ detail.value }}
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
      detailList: [
        'showType',
        'episodeCount',
        'status',
        'startDate',
        'ageRatingGuide',
        'totalLength'
      ],
      availableDetails: []
    }
  },
  created() {
    this.getAiringDetails()
  },
  methods: {
    getAiringDetails() {
      this.detailList.forEach(detail => {
        if (this.anime.attributes[detail]) {
          if (detail == 'totalLength') {
            let length = this.getHoursMins()
            this.availableDetails.push({ name: detail, value: length })
          } else if (detail == 'startDate') {
            let airDate = this.getAired()
            this.availableDetails.push({ name: 'Airing', value: airDate })
          } else if (detail == 'status') {
            let outObj = {
              name: detail,
              value: `${this.anime.attributes[detail]
                .charAt(0)
                .toUpperCase()}${this.anime.attributes[detail].slice(1)}`
            }
            this.availableDetails.push(outObj)
          } else {
            let outObj = {
              name: detail,
              value: this.anime.attributes[detail]
            }
            this.availableDetails.push(outObj)
          }
        }
      })
    },
    getHoursMins() {
      let n = new Date(0, 0)
      n.setMinutes(+this.anime.attributes.totalLength)

      let resultHrs = n.toTimeString().slice(0, 2)
      if (resultHrs < 9) {
        resultHrs = n.toTimeString().slice(1, 2)
      }

      let resultMins = n.toTimeString().slice(3, 5)
      if (resultMins < 10) {
        resultMins = n.toTimeString().slice(4, 5)
      }

      if (this.anime.attributes.episodeLength) {
        return `${resultHrs} Hours, ${resultMins} minutes total (${this.anime.attributes.episodeLength} minutes each)`
      } else {
        return `${resultHrs} Hours, ${resultMins} minutes total`
      }
    },
    getAired() {
      let options = { year: 'numeric', month: 'short', day: 'numeric' }
      let startDate = '?'
      if (this.anime.attributes.startDate) {
        startDate = new Date(
          this.anime.attributes.startDate
        ).toLocaleDateString('en-US', options)
      }
      let endDate = '?'
      if (this.anime.attributes.endDate) {
        endDate = new Date(this.anime.attributes.endDate).toLocaleDateString(
          'en-US',
          options
        )
      }
      return `${startDate} to ${endDate}`
    },
    setTitle(name) {
      switch (name) {
        case 'Airing':
          return 'Airing'
        case 'showType':
          return 'Type'
        case 'episodeCount':
          return 'Episodes'
        case 'status':
          return 'Status'
        case 'ageRatingGuide':
          return 'Rating'
        case 'totalLength':
          return 'Length'
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.details-season--list {
  list-style-type: none;
  text-align: start;
  padding: 0;

  &-label {
    color: #808080;
    margin-bottom: 5px;
  }

  &-item {
    color: #fff;
    margin-bottom: 2px;
  }
}
</style>
