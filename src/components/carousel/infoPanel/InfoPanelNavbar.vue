<template>
  <div class="ip-navbar--wrapper">
    <ul class="ip-navbar--list">
      <li
        v-for="view in views"
        :key="view.name"
        class="ip-navbar--item"
        :class="{ selected: view.active }"
        @click="selectView(view.name)"
      >
        <p>
          <b>{{ view.name.toUpperCase() }}</b>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    views: {
      type: Object,
      required: true
    }
  },
  methods: {
    selectView(view) {
      this.$emit('selectedView', view)
    }
  }
}
</script>

<style lang="scss" scoped>
.ip-navbar {
  &--wrapper {
    width: 100%;
  }
  &--list {
    list-style-type: none;
    display: flex;
    justify-content: center;
  }

  &--item {
    padding: 20px 30px 0 30px;
    font-size: 20px;
    cursor: pointer;

    & p {
      color: #999;
      margin: 0;
    }
  }
}

.selected {
  & p {
    border-bottom: 5px solid red;
    padding-bottom: 4px;
  }
}
</style>
