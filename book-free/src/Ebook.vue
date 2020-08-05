<template>
  <div class="ebook">
    <div class="read-wrapper">
      <div id="read">

      </div>
    </div>
  </div>
</template>

<script>
import Epub from 'epubjs'

global.ePub = Epub
const DOWNLOAD_URL = '/static/software.epub'

export default {
  name: "Ebook",
  data() {
    return {}
  },
  methods: {
    sayHi() {
      console.log('hi')
    },
    showEpub() {
      // let book
      this.book = new Epub(DOWNLOAD_URL)
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      })
      this.rendition.display()

    },
    nextPage() {
      this.rendition && this.rendition.next()
    },
    prevPage() {
      this.rendition && this.rendition.prev()
    },
  },

  mounted() {
    this.showEpub()
  }
}


</script>

<style lang="scss" scoped>
@import "assets/styles/global";

.ebook {
  position: relative;

  .read-wrapper {
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;

      .left {

      }

      .center {

      }

      .right {

      }
    }
  }

}
</style>
