<template>
  <div class="ebook">
    <div class="read-wrapper">
      <div id="read">
        <div class="mask">
          <div class="left" @click="prevPage">

          </div>
          <div class="center">

          </div>
          <div class="right" @click="nextPage">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Epub from 'epubjs'

global.epub = Epub
const DOWNLOAD_URL = '/static/software.epub'

export default {
  methods: {
    showEpub() {
      this.book = new Epub(DOWNLOAD_URL)
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      })
      this.rendition.display()

    },
    prevPage(){
      this.rendition && this.rendition.prev()
    },
    nextPage(){
      this.rendition && this.rendition.next()
    }
  },
  mounted() {
    this.showEpub()
  }
}
</script>

<style lang="scss" scoped>
@import 'assets/styles/global';

.ebook {
  position: relative;

  .read-wrapper {
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      display: flex;
      width: 100%;
      height: 100%;
      /*background: yellow;*/
      .left {
        flex: 0 0 px2rem(100);
        /*background: yellow;*/
      }

      .center {
        flex: 1;
        /*background: rebeccapurple;*/

      }

      .right {
        flex: 0 0 px2rem(100);
        /*background: deeppink;*/


      }
    }
  }
}

</style>
