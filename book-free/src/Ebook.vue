<template>

  <div class="ebook">
    <div class="title-wrapper">
      <div class="left">
        <span class="icon-back icon"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="icon-cart icon "></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-person icon "></span>
        </div>
        <div class="icon-wrapper">
          <span class="icon-more icon "></span>
        </div>
      </div>
    </div>
    <div class="read-wrapper">
      <div id="read">
        <div class="mask">
          <div class="left" @click="prevPage"></div>
          <!--          <div class="center" @click="toggleTitleAndMenu"></div>-->
          <div class="right" @click="nextPage"></div>
        </div>
      </div>
    </div>
    <div class="menu-wrapper">
      <div class="icon-wrapper">
        <div class="icon-menu icon"></div>
      </div>
      <div class="icon-wrapper">
        <div class="icon-progress icon"></div>
      </div>
      <div class="icon-wrapper">
        <div class="icon-bright icon"></div>
      </div>
      <div class="icon-wrapper">
        <div class="icon-more icon"></div>
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
    // 上一页
    prevPage() {
      if (this.rendition) {
        this.rendition.prev()
      }
    },
    // 下一页
    nextPage() {
      if (this.rendition) {
        this.rendition.next()
      }
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

  .title-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: px2rem(48);
    z-index: 101;
    display: flex;
    width: 100%;
    box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, .15); /* 0 , 垂直方向, 水平方向 */
    background: whitesmoke;

    .left {
      flex: 0 0 px2rem(60);
      @include center;

    }

    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;

      .icon-wrapper {
        flex: 0 0 px2rem(40);
        @include center;

        .icon-cart {
          font-size: px2rem(22);
        }
      }
    }

    .center {

    }
  }
  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: px2rem(48);
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15); /* 0 , 垂直方向, 水平方向 */
    background: whitesmoke;
    .icon-wrapper {
      flex: 1;
      @include center;

    }
  }
  .read-wrapper {
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      width: 100%;
      height: 100%;

      .left {
        flex: 0 0 px2rem(100);
      }

      .center {
        flex: 1;
      }

      .right {
        flex: 0 0 px2rem(100);
      }
    }
  }
}
</style>
