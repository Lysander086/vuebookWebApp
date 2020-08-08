<template>
  <div class="ebook-reader">
    <!--        {{$router.params.fileName}}-->
    <div id="read"></div>
  </div>
</template>

<script>
import Epub from 'epubjs'
import {ebookMixin} from "@/utils/mixin"
import {getFontFamily, getFontSize, getTheme, saveFontFamily, saveFontSize} from "@/utils/localStorage"
import {addCss} from "@/utils/book"

global.ePub = Epub


export default {
  name: "EbookReader",
  mixins: [ebookMixin],

  methods: {
    prevPage() {
      this.rendition && this.rendition.prev()
      this.hideTitleAndMenu()
    },
    nextPage() {
      this.rendition && this.rendition.next()
      this.hideTitleAndMenu()
    },
    toggleTitleAndMenu() {
      this.menuVisible && this.setSettingVisible(-1)
      this.setMenuVisible(!this.menuVisible)
      this.fontFamilyVisible && this.setFontFamilyVisible(false)
    },
    hideTitleAndMenu() {
      // console.log('hideTitleAndMenu')
      this.setMenuVisible(false)
      this.setSettingVisible(-1)
      this.setFontFamilyVisible(false)
    },
    // 实现字体大小缓存
    initFontSize() {
      let fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize)
      } else {
        this.rendition.themes.fontSize(fontSize)
        this.setDefaultFontSize(fontSize)
      }
    },
    // 实现字体缓存
    initFontFamily() {
      let font = getFontFamily(this.fileName)
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily)
      } else {
        this.rendition.themes.font(font)
        this.setDefaultFontFamily(font)
      }
    },
    //
    initTheme() {
      let defaultTheme = getTheme(this.fileName)
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name
        saveTheme(this.fileName, defaultTheme)
      }
      this.setDefaultTheme(defaultTheme)
      this.themeList.forEach(theme => {
        this.rendition.themes.register(theme.name, theme.style) // 注册主题方式
      })
      this.rendition.themes.select(defaultTheme)
    },
    initEpub() {
      const url = ' http://192.168.3.10:8081/epub/' + this.fileName + '.epub'
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default'
      })
      this.rendition.display().then(() => {
        this.initFontSize()
        this.initFontFamily()
        this.initTheme()
        this.initGlobalStyle()
      })
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
        // console.log(offsetX, time)
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
      this.rendition.hooks.content.register(contents => {
        `${process.env.VUE_APP_MODE}` === 'dev' && this.rendition.display(5) // 指定显示位置, 方便调试字体
        // 查看addStylesheet源码,得知实现方式是要引用一个href链接, 因此需要将字体文件存放到nginx服务器中
        // contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`)
        Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
        ]).then(() => {
          console.log('font loading complete')
        })
      })
    }
  },
  mounted() {
    // 测试用url: http://localhost:8080/ebook/History%7Ctry
    const fileName = this.$route.params.fileName.split('|').join('/')
    this.setFileName(fileName).then(() => {
      this.initEpub()
    })

  },
  data() {
    return {};
  },
  components: {
    // ComName: () => import( "./views/ExperienceDetails")
  },
};
</script>

<style scoped lang='scss'>

</style>
