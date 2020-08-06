<template>
  <div class="ebook">
    <transition name="slide-down">
      <div class="title-wrapper" v-show="ifTitleAndMenuShow">
        <div class="left">
          <span class="icon-back icon"></span>
        </div>
        <div class="right ">
          <div class="icon-wrapper">
            <div><span class="icon-cart icon"></span></div>
          </div>
          <div class="icon-wrapper">
            <div><span class="icon-person icon"></span></div>
          </div>
          <div class="icon-wrapper">
            <div><span class="icon-more icon"></span></div>
          </div>
        </div>
      </div>
    </transition>

    <div class="read-wrapper">
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
    <transition name="slide-up">
      <div class="menu-wrapper" v-show="ifTitleAndMenuShow">
        <div class="icon-wrapper ">
          <span class="icon-menu icon"></span>
        </div>
        <div class="icon-wrapper ">
          <span class="icon-progress icon"></span>
        </div>
        <div class="icon-wrapper ">
          <span class="icon-bright icon"></span>
        </div>
        <div class="icon-wrapper ">
          <span class="icon-a icon">A</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Epub from 'epubjs'

global.epub = Epub
const DOWNLOAD_URL = '/static/software.epub'

export default {
  data() {
    return {
      ifTitleAndMenuShow: false

    };
  },

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
    },
    toggleTitleAndMenu() {
      this.ifTitleAndMenuShow = !this.ifTitleAndMenuShow
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

    .right {
      flex: 1;
      display: flex;
      justify-content: flex-end;

      .icon-wrapper {
        flex: 0 0 px2rem(40);
        @include center;
        margin-bottom: auto;
      }
    }

    &.slide-down-enter, &slide-down-leave-to {
      transform: translate3d(0, -100%, 0);
    }

    &.slide-down-enter-to, &slide-down-leave {
      transform: translate3d(0, 0, 0);
    }

    &.slide-down-enter-active, &slide-down-leave-active {
      transition: all .1s linear;
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

  .menu-wrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: ghostwhite;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);

    .icon-wrapper {
      flex: 1;
      @include center;

      .icon-progress {
        font-size: px2rem(28);
      }

      .icon-bright {
        font-size: px2rem(24);
      }

    }

    &.slide-up-enter, &slide-up-leave-to {
      transform: translate3d(0, 100%, 0);
    }

    &.slide-up-enter-to, &slide-up-leave {
      transform: translate3d(0, 0, 0);
    }

    &.slide-up-enter-active, &slide-up-leave-active {
      transition: all .1s linear;
    }
  }
}

</style>
