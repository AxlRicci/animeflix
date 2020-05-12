<template>
  <div>
    <ScreenResize @resize="setWindowSize" />
    <div class="card-carousel-wrapper">
      <div
        class="card-carousel--nav__left"
        @click="moveCarousel(-1)"
        :disabled="this.atHeadOfList"
      ></div>
      <div class="card-carousel">
        <div class="card-carousel--overflow-container">
          <div
            class="card-carousel-cards"
            :style="{
              transform: 'translateX' + '(' + currentOffset + 'px' + ')'
            }"
          >
            <div
              v-for="item in items"
              :key="item.attributes.slug"
              class="card-carousel--card"
              @click="setSelectedItem(item)"
            >
              <img
                :src="item.attributes.posterImage.small"
                :style="imgStyle"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div
        class="card-carousel--nav__right"
        @click="
          moveCarousel(1)
          nextPage()
        "
      ></div>
    </div>
    <div>
      <CarouselInfoPanel
        v-if="this.selectedItem"
        :itemInfo="selectedItem"
        :genreList="genreList"
        @removeSelected="removeSelected"
      />
    </div>
  </div>
</template>

<script>
import ScreenResize from '@/components/renderless/ScreenResize.js'
import KitsuService from '@/services/KitsuService.js'
import CarouselInfoPanel from '@/components/CarouselInfoPanel'
export default {
  name: 'carousel',
  components: {
    ScreenResize,
    CarouselInfoPanel
  },
  props: {
    items: {
      type: Array,
      required: true
    },
    imgWidth: {
      type: String,
      required: true
    },
    scrollInterval: {
      type: Number,
      default: 750
    }
  },
  data() {
    return {
      currentOffset: 0,
      containerWidth: 0,
      selectedItem: null,
      genreList: []
    }
  },
  computed: {
    atEndOfList() {
      return this.currentOffset < (this.listLength - this.initialSize) * -1
    },
    atHeadOfList() {
      return this.currentOffset === 0
    },
    listLength() {
      return this.items.length * this.imgWidth
    },
    initialSize() {
      return (this.containerWidth / this.imgWidth) * this.imgWidth
    },
    imgStyle() {
      return 'width: ' + this.imgWidth + 'px'
    },
    numberOfItems() {
      return this.items.length
    }
  },
  methods: {
    moveCarousel(direction) {
      if (direction === 1) {
        this.currentOffset -= this.scrollInterval
      } else if (direction === -1 && !this.atHeadOfList) {
        this.currentOffset += this.scrollInterval
      }
    },
    nextPage() {
      if (this.atEndOfList === true) {
        this.$emit('nextPage')
      }
    },
    logit(spec) {
      console.log('logged', spec)
    },
    setSelectedItem(item) {
      this.selectedItem = item
      console.log(this.selectedItem)
      this.getGenreList(item.relationships.genres.links.related)
    },
    removeSelected() {
      this.selectedItem = null
    },
    getGenreList(param) {
      KitsuService.getData(param)
        .then(response => {
          this.genreList = response.data.data
        })
        .catch(error => {
          console.log('genre gathering error: ', error)
        })
    },
    setWindowSize(windowSize) {
      this.containerWidth = windowSize.containerWidth
    }
  }
}
</script>

<style lang="scss" scoped>
$vue-navy: #2c3e50;
$vue-navy-light: #3a5169;
$vue-teal: #42b883;
$vue-teal-light: #42b983;
$gray: #666a73;
$light-gray: #f8f8f8;

body {
  background: $light-gray;
  color: $vue-navy;
  font-family: 'Source Sans Pro', sans-serif;
}

.card-carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0 10px;
  color: $gray;
}

.card-carousel {
  display: flex;
  justify-content: center;
  width: 100%;

  &--overflow-container {
    overflow: hidden;
  }

  &--nav__left,
  &--nav__right {
    display: inline-block;
    width: 15px;
    height: 15px;
    padding: 10px;
    box-sizing: border-box;
    border-top: 2px solid $vue-teal;
    border-right: 2px solid $vue-teal;
    cursor: pointer;
    margin: 0 20px;
    transition: transform 150ms linear;
    &[disabled] {
      opacity: 0.2;
      border-color: black;
    }
  }

  &--nav__left {
    transform: rotate(-135deg);
    &:active {
      transform: rotate(-135deg) scale(0.9);
    }
  }

  &--nav__right {
    transform: rotate(45deg);
    &:active {
      transform: rotate(45deg) scale(0.9);
    }
  }
}

.card-carousel-cards {
  display: flex;
  transition: transform 150ms ease-out;
  transform: translatex(0px);

  .card-carousel--card {
    margin: 0 10px;
    cursor: pointer;
    box-shadow: 0 4px 15px 0 rgba(40, 44, 53, 0.06),
      0 2px 2px 0 rgba(40, 44, 53, 0.08);
    background-color: #fff;
    border-radius: 4px;
    z-index: 3;
    margin-bottom: 2px;

    &:first-child {
      margin-left: 0;
    }

    &:last-child {
      margin-right: 0;
    }

    img {
      vertical-align: bottom;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      transition: opacity 150ms linear;
      user-select: none;

      &:hover {
        opacity: 0.5;
      }
    }
  }
}
</style>
