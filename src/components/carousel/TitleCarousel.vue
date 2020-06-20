<template>
  <div class="title-carousel--wrapper">
    <div class="title-carousel--title">
      <h2>{{ title }}</h2>
    </div>
    <div
      @mouseenter="toggleNav('enter')"
      @mouseleave="toggleNav('leave')"
      class="title-carousel--carousel"
    >
      <div
        v-if="navActive"
        @click="changePage('prev')"
        class="carousel-nav carousel-nav__prev"
      >
        <img src="@/assets/arrow_back.svg" alt="" />
      </div>
      <Carousel
        :perPage="perPage"
        :paginationEnabled="false"
        @pageChange="pageHandler"
        :navigateTo="pageNum"
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
      <div
        @click="changePage('next')"
        v-if="navActive"
        class="carousel-nav carousel-nav__next"
      >
        <img src="@/assets/arrow_forward.svg" alt="" />
      </div>
    </div>
    <div
      v-if="this.selectedItem && this.panelState"
      class="carousel-info-panel--wrapper"
    >
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
    },
    title: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      items: [],
      selectedItem: {},
      lastCall: '',
      nextCall: '',
      pageNum: 0,
      navActive: false,
      perPage: 2,
      imgWidth: 200
    }
  },
  created() {
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
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
  destroyed() {
    window.removeEventListener('resize', this.handleResize)
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
      return `width: ${this.imgWidth}px; height: auto; margin-right: 5px;`
    },
    pages() {
      return Math.floor(this.items.length / this.perPage)
    }
  },
  methods: {
    changePage(type) {
      if (type == 'next' && this.pageNum < this.pages) {
        this.pageNum += 1
      } else if (type == 'prev' && this.pageNum > 0) {
        this.pageNum -= 1
      }
    },
    toggleNav(type) {
      if (type == 'enter') {
        this.navActive = true
      } else if (type == 'leave') {
        this.navActive = false
      }
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
      console.log(page)
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
    handleResize() {
      let ww = window.innerWidth
      switch (true) {
        case ww <= 320:
          this.imgWidth = 150
          this.perPage = 2
          break
        case ww <= 425:
          this.imgWidth = 130
          this.perPage = 3
          break
        case ww <= 768:
          this.imgWidth = 180
          this.perPage = 4
          break
        case ww <= 1024:
          this.imgWidth = 190
          this.perPage = 5
          break
        case ww <= 1440:
          this.imgWidth = 230
          this.perPage = 6
          break
        case ww <= 1920:
          this.imgWidth = 265
          this.perPage = 7
          break
        case ww <= 2560:
          this.imgWidth = 250
          this.perPage = 10
      }
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
.title-carousel {
  &--wrapper {
    width: 100%;
  }

  &--title {
    text-align: left;
    margin: 10px 0 10px 0;
    color: #fff;
  }
  &--carousel {
    position: relative;
  }
}

.carousel-nav {
  position: absolute;
  z-index: 2;
  height: 100%;
  width: 75px;
  background: rgba(55, 55, 55, 0.5);
  display: flex;
  justify-content: center;
  &__prev {
    top: 0;
    left: 0;
  }
  &__next {
    top: 0;
    right: 0;
  }
}

.carousel-info-panel--wrapper {
  height: 37vw;
}

@media (min-width: 576px) {
}

@media (min-width: 768px) {
}

@media (min-width: 992px) {
}

@media (min-width: 1200px) {
}
</style>
