<template>
  <div class="overview-actions--wrapper">
    <button class="overview-actions--item overview-actions--item__stream">
      <span class="button button--play">
        <img class="button-icon" src="../../../assets/play_arrow.svg" alt />
        <p>Play</p>
      </span>
    </button>
    <button class="overview-actions--item overview-actions--item__list">
      <span class="button button--add">
        <img class="button-icon" src="../../../assets/add.svg" alt />
        <p>My List</p>
      </span>
    </button>
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

.button {
  display: flex;
  justify-content: center;
  margin: 0px;

  & p {
    margin: 2px;
  }

  &-icon {
    height: 24px;
  }
}
</style>
