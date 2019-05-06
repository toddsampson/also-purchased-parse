<template>
  <div id="app">
    <ParseBooks />
  </div>
</template>

<script>
import ParseBooks from './components/ParseBooks.vue'

export default {
  name: 'app',
  components: {
    ParseBooks
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
