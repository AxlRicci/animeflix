<template>
  <img :src="imgSrc" :style="imgStyle" :alt="alt" />
</template>

<script>
export default {
  props: {
    imgSrc: {
      type: String,
      default:
        'https://reactnativecode.com/wp-content/uploads/2018/02/Default_Image_Thumbnail.png'
    },
    width: {
      type: String,
      default: '100'
    },
    alt: {
      type: String,
      default: 'No info available'
    }
  },
  computed: {
    imgStyle() {
      return 'width: ' + this.width + 'px'
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
