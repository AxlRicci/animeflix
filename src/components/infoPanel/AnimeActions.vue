<template>
  <div class="overview-actions--wrapper">
    <button class="overview-actions--item overview-actions--item__stream">Play</button>
    <button class="overview-actions--item overview-actions--item__list">List</button>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.overview-actions {
  &--wrapper {
    display: flex;
    justify-items: start;
  }
  &--item {
    margin-right: 10px;
    padding: 7px 20px;
    border: none;
    border-radius: 5px;
    font-size: 18px;

    &__stream {
      background-color: #fff;
    }

    &__list {
      background-color: #999;
      color: #000;
    }
  }
}
</style>
