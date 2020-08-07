<template>
  <div class="ebook">
    <title-bar :ifTitleAndMenuShow="ifTitleAndMenuShow"></title-bar>
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
    <menu-bar :ifTitleAndMenuShow="ifTitleAndMenuShow"
              :fontSizeList="fontSizeList"
              :defaultFontSize="defaultFontSize"
              @setFontSize="setFontSize"
              :themeList="themeList"
              :defaultTheme="defaultTheme"
              @setTheme="setTheme"
              @onProgressChange="onProgressChange"
              :navigation="navigation"
              @jumpTo="jumpTo"
              :parent="this"
              ref="menuBar"></menu-bar>
  </div>
</template>

<script>
import Epub from 'epubjs'
import TitleBar from "./components/TitleBar"
import MenuBar from "./components/MenuBar"

global.epub = Epub
const DOWNLOAD_URL = '/static/software.epub'

export default {
  data() {
    return {
      ifTitleAndMenuShow: false,
      fontSizeList: [
        {fontSize: 12},
        {fontSize: 14},
        {fontSize: 16},
        {fontSize: 18},
        {fontSize: 20},
        {fontSize: 22},
        {fontSize: 24}
      ],
      defaultFontSize: 16,
      themeList: [
        {
          name: 'default',
          style: {
            body: {
              'color': '#000', 'background': '#fff'
            }
          }
        },
        {
          name: 'eye',
          style: {
            body: {
              'color': '#000', 'background': '#ceeaba'
            }
          }
        },
        {
          name: 'night',
          style: {
            body: {
              'color': '#fff', 'background': '#000'
            }
          }
        },
        {
          name: 'gold',
          style: {
            body: {
              'color': '#000', 'background': 'rgb(241, 236, 226)'
            }
          }
        }
      ],
      defaultTheme: 0,
      // 图书是否处于可用状态
      bookAvailable: false,
      navigation: {}
    };
  },
  components: {
    TitleBar,
    MenuBar
  },
  methods: {
    jumpTo(href) {
      this.rendition.display(href)
      this.hideTitleAndMenu()
    },
    hideTitleAndMenu() {
      // 隐藏标题栏和菜单栏
      this.ifTitleAndMenuShow = false
      // 隐藏菜单栏弹出的设置栏
      this.$refs.menuBar.hideSetting()
      // 隐藏目录
      this.$refs.menuBar.hideContent()
    },
    onProgressChange(progress) {
      const percentage = progress / 100
      const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0
      this.rendition.display(location)
    },
    // 设置主题
    setTheme(index) {
      this.themes.select(this.themeList[index].name)
      this.defaultTheme = index
    },
    registerTheme() {
      this.themeList.forEach(theme => {
        this.themes.register(theme.name, theme.style)
      })
    },
    setFontSize(fontSize) {
      this.defaultFontSize = fontSize
      this.themes && this.themes.fontSize(fontSize + 'px')
    },
    showEpub() {
      this.book = new Epub(DOWNLOAD_URL)
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      })
      this.rendition.display()
      this.themes = this.rendition.themes
      // 设置默认字体
      this.setFontSize(this.defaultFontSize)
      // this.themes.register(name , styles)
      // this.themes.select()
      // 注册主题
      this.registerTheme()
      // 设置默认主题
      this.setTheme(this.defaultTheme)
      this.book.ready.then(() => {
        this.navigation = this.book.navigation
        // 生成Locations对象
        return this.book.locations.generate()
      }).then(result => {
        // 保存locations对象
        this.locations = this.book.locations
        // 标记电子书为解析完毕状态
        this.bookAvailable = true

        // console.log('ebook - bookAvailable:' , this.bookAvailable)
      })

    },
    prevPage() {
      this.rendition && this.rendition.prev()
    },
    nextPage() {
      this.rendition && this.rendition.next()
    },
    toggleTitleAndMenu() {
      this.ifTitleAndMenuShow = !this.ifTitleAndMenuShow
      if (!this.ifTitleAndMenuShow) {
        this.$refs.menuBar.hideSetting()
      }
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
