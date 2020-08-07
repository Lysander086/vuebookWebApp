<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link>
      |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters(['test'])
  },
  name: 'App',
  beforeMount() {
    console.log('beforeMounted: ', this.$store.state.book.test)
    console.log( 'using vuex', this.test)
  },
  mounted() {
    this.$store.dispatch('setTest', 10).then(() => {
      console.log(this.$store.state.book.test)
    })
  },

}
document.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('html')
  let fontSize = window.innerWidth / 10
  fontSize = fontSize > 50 ? 50 : fontSize
  html.style.fontSize = fontSize + 'px'
})

</script>

<style>
</style>
