<template>
  <div class="nav--wrapper">
    <div class="nav--left-wrapper">
      <div class="nav--logo">
        <h1>AnimeFlix</h1>
      </div>
      <div class="nav--links">
        <ul class="nav--list">
          <li class="nav--list-item nav--list-item__home">Anime</li>
          <li class="nav--list-item nav--list-item__home">Manga</li>
        </ul>
      </div>
    </div>
    <div class="nav--right-wrapper">
      <div class="nav--search">
        <input
          v-model="search"
          v-on-clickaway="toggleSearch"
          v-if="searchToggle"
          type="text"
          placeholder="Search"
        />
        <img
          v-if="!searchToggle"
          @click="toggleSearch"
          src="@/assets/search.svg"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
import { directive as onClickaway } from 'vue-clickaway'

export default {
  directives: {
    onClickaway: onClickaway
  },
  data() {
    return {
      search: '',
      searchToggle: false
    }
  },
  methods: {
    toggleSearch() {
      if (!this.search) {
        this.searchToggle = !this.searchToggle
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.nav {
  &--wrapper {
    display: flex;
    justify-content: space-between;
    color: #fff;
  }

  &--left-wrapper {
    display: flex;
    align-content: center;
  }

  &--right-wrapper {
    display: flex;
    align-content: center;
  }

  &--search {
    align-self: center;
  }
  &--logo {
    & h1 {
      margin: 0px;
    }
  }

  &--links {
    align-self: center;
  }

  &--list {
    display: flex;
    list-style-type: none;
    margin: 0;

    &-item {
      margin-right: 20px;
    }
  }
}
</style>
