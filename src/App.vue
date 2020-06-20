<template>
  <div class="container">
    <div id="app">
      <div id="nav">
        <Navbar />
      </div>
      <router-view class="content" />
    </div>
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
html {
  background: #141414;
}
.container {
  width: 95vw;
  margin: 0 auto;
}
.content {
  margin-top: 100px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  background: #141414;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
  width: 100%;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
