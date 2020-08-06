<template>
  <div class="ebook">
    <div class="title-wrapper">
      <div class="left"><span class="icon-back icon"></span></div>
      <div class="right icon-wrapper">
        <div><span class="icon-cart icon"></span></div>
        <div><span class="icon-person icon"></span></div>
        <div><span class="icon-more icon"></span></div>
      </div>
    </div>
    <div class="read-wrapper">1
      <div id="read">
        <div class="mask">
          <div class="left" @click="prevPage">

          </div>
          <div class="center" @click="toggleTitleAndMenu">

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
    prevPage() {
      this.rendition && this.rendition.prev()
    },
    nextPage() {
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

  .title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: ghostwhite;
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15);

    .left {
      flex: 0 0 px2rem(60);
      @include center;
    }

    .center {
    }

    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;

      .icon-wrapper {
        flex: 0 0 px2rem(40);
        @include center;
      }
    }
  }

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
