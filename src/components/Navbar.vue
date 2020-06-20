<template>
  <div class="nav--wrapper">
    <div class="nav--left-wrapper">
      <div class="nav--logo">
        <img src="@/assets/live_tv.svg" alt="" />
      </div>
      <div class="nav--links">
        <ul class="nav--list">
          <li class="nav--list-item nav--list-item__home">Genres</li>
        </ul>
      </div>
    </div>
    <div class="nav--right-wrapper">
      <div class="nav--search">
        <div
          class="nav--search__active"
          v-if="searchToggle"
          v-on-clickaway="toggleSearch"
        >
          <img class="search-active--image" src="@/assets/search.svg" alt="" />
          <input
            class="search-active--input"
            v-model="search"
            type="text"
            placeholder="Search"
          />
          <img @click="clearSearch" src="@/assets/clear.svg" alt="" />
        </div>
        <div
          class="nav--search__inactive"
          v-if="!searchToggle"
          @click="toggleSearch"
        >
          <img src="@/assets/search.svg" alt="" />
        </div>
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
    },
    clearSearch() {
      this.search = ''
      this.searchToggle = false
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
    width: 100%;
    padding: 10px;
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
    &__active {
      display: flex;
      background: #000;
      border: 1px solid #fff;
    }
  }
  &--logo {
    & h1 {
      margin: 0px;
    }
  }

  &--links {
    align-self: center;
    display: none;
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

.search-active {
  &--input {
    background: none;
    border: none;
    color: #fff;
    font-size: 14px;
    outline: none;
  }
}
@media (min-width: 640px) {
  .nav {
    &--links {
      display: block;
    }
  }
}

@media (min-width: 768px) {
}

@media (min-width: 1024px) {
}

@media (min-width: 1280px) {
  // .nav {
  //   &--wrapper {
  //     display: flex;
  //     justify-content: space-between;
  //     color: #fff;
  //     width: 95vw;
  //     margin: 0 auto;
  //     padding: 20px;
  //   }

  //   &--left-wrapper {
  //     display: flex;
  //     align-content: center;
  //   }

  //   &--right-wrapper {
  //     display: flex;
  //     align-content: center;
  //     margin-right: 30px;
  //   }

  //   &--search {
  //     align-self: center;
  //     &__active {
  //       display: flex;
  //       background: #000;
  //       border: 1px solid #fff;
  //       padding: 5px;
  //     }
  //   }
  //   &--logo {
  //     & h1 {
  //       margin: 0px;
  //     }
  //   }

  //   &--links {
  //     align-self: center;
  //   }

  //   &--list {
  //     display: flex;
  //     list-style-type: none;
  //     margin: 0;

  //     &-item {
  //       margin-right: 20px;
  //     }
  //   }
  // }
}
</style>
