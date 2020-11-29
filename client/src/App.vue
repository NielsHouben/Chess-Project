<template>
  <Home />
</template>

<script>
import Home from './components/Home.vue'

export default {
  name: 'App',
  components: {
    Home
  }
}
</script>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');

#app
  font-family: Lato
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50
  min-height: 100vh
  background-color: #F3F5FA

</style>
