<template>
  <div id="app" class="container">
    <Navbar />
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

.container {
  width: 99vw;
  margin: 0 auto;
}
.content {
  margin-top: 100px;
}

@media (min-width: 640px) {
}

@media (min-width: 768px) {
}

@media (min-width: 1024px) {
}

@media (min-width: 1280px) {
}
</style>
