<template>
  <div>
    <Carousel
      :perPage="perPage"
      :navigationEnabled="true"
      :paginationEnabled="false"
      @navigation-click="logit"
      @pageChange="pageHandler"
    >
      <Slide
        v-for="item in items"
        :key="item.attributes.id"
        @slide-click="selectItem"
        :data-id="item.id"
      >
        <img
          :style="imgStyle"
          :src="item.attributes.posterImage.small"
          alt=""
        />
      </Slide>
    </Carousel>
    <div>
      <transition
        @beforeEnter="beforeEnter"
        @enter="enter"
        @leave="leave"
        :css="false"
      >
        <InfoPanel
          class="carousel-info-panel"
          v-if="this.selectedItem && this.panelState"
          :item="this.selectedItem"
          @removeSelected="removeSelected"
        />
      </transition>
    </div>
  </div>
</template>

<script>
import KitsuService from '@/services/KitsuService.js'
import { Carousel, Slide } from 'vue-carousel'
import InfoPanel from '@/components/carousel/infoPanel/InfoPanel'
import gsap from 'gsap'

export default {
  components: {
    Carousel,
    Slide,
    InfoPanel
  },
  props: {
    perPage: {
      type: Number,
      default: 7
    },
    imgWidth: {
      type: String,
      default: '251'
    },
    resource: {
      type: String,
      required: true
    },
    filter: {
      type: Array
    },
    sort: {
      type: Array
    },
    panelState: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      items: [],
      selectedItem: {},
      lastCall: '',
      nextCall: ''
    }
  },
  created() {
    KitsuService.getData(this.dataCall)
      .then(response => {
        console.log(response)
        this.items = response.data.data
        this.nextCall = response.data.links.next
        if (this.perPage > 5) {
          this.getAdditionalTitles()
        }
      })
      .catch(error => {
        console.log('there was an error gathering data', error)
      })
  },
  computed: {
    dataCall() {
      // data params
      let params = []
      // define filter
      if (this.filter) {
        this.filter.forEach(filter => {
          let filterStr = `filter%5B${filter.attribute}%5D=${filter.value}`
          params.push(filterStr)
        })
      }
      // define sort
      if (this.sort) {
        params.push(`sort=${this.sort.join(',')}`)
      }
      return `${this.resource}?${params.join('&')}`
    },
    imgStyle() {
      return `width: ${this.imgWidth}px; height: auto`
    },
    pages() {
      return Math.floor(this.items.length / this.perPage)
    }
  },
  methods: {
    logit(stuff) {
      console.log(stuff)
    },
    getAdditionalTitles() {
      if (this.lastCall !== this.nextCall) {
        this.lastCall = this.nextCall
        KitsuService.getData(this.nextCall)
          .then(response => {
            response.data.data.forEach(item => {
              this.items.push(item)
            })
            this.nextCall = response.data.links.next
          })
          .catch(error => {
            console.log(error)
          })
      }
    },
    pageHandler(page) {
      if (page == this.pages - 1) {
        // At end of list, fetch more data
        this.getAdditionalTitles()
      }
    },
    removeSelected() {
      this.selectedItem = null
    },
    selectItem(id) {
      this.selectedItem = this.items.filter(item => item.id == id.id)[0]
      console.log(this.selectedItem)
      this.$emit('panelOpen')
    },
    // gsap animations for info panel
    beforeEnter(el) {
      gsap.set(el, {
        scaleY: '0',
        height: '0'
      })
    },
    enter(el, done) {
      gsap.to(el, {
        duration: 0.1,
        transformOrigin: '50% top',
        scaleY: '1',
        height: 'auto',
        onComplete: done
      })
    },
    leave(el, done) {
      gsap.to(el, {
        duration: 0.1,
        scaleY: '0',
        transformOrigin: '50% top',
        height: '0',
        onComplete: done
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.img {
  width: 354px;
  height: auto;
}
</style>
