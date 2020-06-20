<template>
  <div id="app" class="container">
    <Navbar class="navbar" />
    <router-view class="content" />
  </div>
</template>

<script>
import Navbar from '@/components/Navbar'
export default {
  components: {
    Navbar
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}

html {
  background: #141414;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
}

.content {
  margin-top: 58px;
}

@media (min-width: 640px) {
  .content {
    margin-top: 58px;
  }
}

@media (min-width: 768px) {
}

@media (min-width: 1024px) {
}

@media (min-width: 1280px) {
}
</style>
