<template>
  <div class="details-season--wrapper">
    <ul class="details-season--list">
      <li class="details-season--list-label"><b>Details</b></li>
      <li
        class="details-season--item"
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
        'Aired',
        'ageRatingGuide',
        'totalLength'
      ],
      availableDetails: []
    }
  },
  created() {
    this.getSeasonDetails()
  },
  methods: {
    getSeasonDetails() {
      this.detailList.forEach(detail => {
        if (this.anime.attributes[detail] || detail == 'Aired') {
          let outObj = {}
          if (detail == 'totalLength') {
            // total length to H:M
            let HourMin = this.getHoursMins()
            outObj = {
              name: detail,
              value: HourMin
            }
          } else if (
            this.anime.attributes.startDate &&
            this.anime.attributes.endDate &&
            detail == 'Aired'
          ) {
            let airDate = this.getAired()
            outObj = {
              name: detail,
              value: airDate
            }
          } else {
            outObj = {
              name: detail,
              value: this.anime.attributes[detail]
            }
          }
          this.availableDetails.push(outObj)
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
      let startDate = new Date(
        this.anime.attributes.startDate
      ).toLocaleDateString('en-US', options)
      let endDate = new Date(this.anime.attributes.endDate).toLocaleDateString(
        'en-US',
        options
      )
      return `${startDate} to ${endDate}`
    },
    setTitle(name) {
      switch (name) {
        case 'showType':
          return 'Type'
        case 'episodeCount':
          return 'Episodes'
        case 'status':
          return 'Status'
        case 'Aired':
          return 'Aired'
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
}
</style>
