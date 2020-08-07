<template>
  <div class="ebook-reader">
    <!--        {{$router.params.fileName}}-->
    <div id="read"></div>
  </div>
</template>

<script>
import Epub from 'epubjs'
import {mapGetters} from 'vuex'

global.ePub = Epub


export default {
  name: "EbookReader",
  computed: {
    ...mapGetters(['fileName', 'menuVisible'])
  },
  methods: {
    prevPage() {
      this.rendition && this.rendition.prev()
    },
    nextPage() {
      this.rendition && this.rendition.next()
    },
    toggleTitleAndMenu() {
      // console.log('triggered')
      this.$store.dispatch('setMenuVisible', !this.menuVisible)
    },

    initEpub() {
      const url = ' http://192.168.3.10:8081/epub/' + this.fileName + '.epub'
      this.book = new Epub(url)
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default'
      })
      this.rendition.display()
      // console.log(this.rendition)
      this.rendition.on('touchstart', event => {
        // console.log(event)
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
      })
      // const offset
      this.rendition.on('touchend', event => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        const time = event.timeStamp - this.touchStartTime
        console.log(offsetX, time)
        if (time < 500 && offsetX > 40) {
          this.prevPage()
        } else if (time < 500 && offsetX < -40) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
        event.preventDefault()
        event.stopPropagation()

      })
    }
  },
  mounted() {
    // 测试用url如下
    // http://localhost:8080/ebook/History%7Ctry
    const fileName = this.$route.params.fileName.split('|').join('/')
    this.$store.dispatch('setFileName', fileName).then(() => {
      this.initEpub()
    })

  },
  data() {
    return {};
  },
  component: {
    // ComName: () => import( "./views/ExperienceDetails")
  },
};
</script>

<style scoped>

</style>
