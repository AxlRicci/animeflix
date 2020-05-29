<template>
  <div class="ip-navbar--wrapper">
    <ul class="ip-navbar--list">
      <li
        class="ip-navbar--item ip-navbar--item__overview"
        :class="{ selected: selected.overview }"
        @click="selectView('overview')"
      >
        <p><b>OVERVIEW</b></p>
      </li>
      <li
        class="ip-navbar--item ip-navbar--item__episodes"
        :class="{ selected: selected.episodes }"
        @click="selectView('episodes')"
      >
        <p><b>EPISODES</b></p>
      </li>
      <li
        class="ip-navbar--item ip-navbar--item__related"
        :class="{ selected: selected.related }"
        @click="selectView('related')"
      >
        <p><b>MORE LIKE THIS</b></p>
      </li>
      <li
        class="ip-navbar--item ip-navbar--item__details"
        :class="{ selected: selected.details }"
        @click="selectView('details')"
      >
        <p><b>DETAILS</b></p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: {
        overview: true,
        episodes: false,
        related: false,
        details: false
      }
    }
  },
  methods: {
    logit(item) {
      console.log('been clicked', item)
    },
    selectView(view) {
      this.$emit('selectedView', view)
      Object.keys(this.selected).forEach(item => {
        if (view == item) {
          this.selected[item] = true
        } else {
          this.selected[item] = false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ip-navbar {
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
