<template>
  <div class="ebook-reader">
    <!--        {{$router.params.fileName}}-->
    <div id="read"></div>
  </div>
</template>

<script>
import Epub from 'epubjs'
import {ebookMixin} from "@/utils/mixin"
import {flatten} from '@/utils/book'

import {
  getFontFamily,
  getFontSize,
  getTheme,
  saveFontFamily,
  saveFontSize,
  getLocation,
  saveTheme
} from "@/utils/localStorage"
import {addCss} from "@/utils/book"

global.ePub = Epub


export default {
  name: "EbookReader",
  mixins: [ebookMixin],

  methods: {
    prevPage() {
      this.rendition && this.rendition.prev().then(() => {
        this.refreshLocation()
      })
      this.hideTitleAndMenu()
    },
    nextPage() {
      this.rendition && this.rendition.next().then(() => {
        this.refreshLocation()
      })
      this.hideTitleAndMenu()
    },
    toggleTitleAndMenu() {
      this.menuVisible && this.setSettingVisible(-1)
      this.setMenuVisible(!this.menuVisible)
      this.fontFamilyVisible && this.setFontFamilyVisible(false)
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

    initRendition() {
      this.rendition = this.book.renderTo('read', {
        width: innerWidth,
        height: innerHeight,
        method: 'default'
      })
      const location = getLocation(this.fileName)
      // console.log('location get: ', location)
      this.display(location, () => {
        this.initTheme()
        this.initFontSize()
        this.initFontFamily()
        this.initGlobalStyle()
      })
      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/daysOne.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/cabin.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/montserrat.css`),
          contents.addStylesheet(`${process.env.VUE_APP_RES_URL}/fonts/tangerine.css`)
        ]).then(() => {
        })
      })
    },
    initGesture() {
      // console.log(this.rendition)
      this.rendition.on('touchstart', event => {
        // console.log(event)
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
      })
      // const offset
      this.rendition.on('touchend', event => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        const time = event.timeStamp - this.touchStartTime  // 计算消耗时间
        // console.log(offsetX, time)
        if (time < 500 && offsetX > 40) { // 划过时间小于500ms, 划过距离大于40则进行翻页
          this.prevPage()
        } else if (time < 500 && offsetX < -40) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
        event.preventDefault() // 禁止事件的默认方法调用
        event.stopPropagation() // 禁止事件传播
      })
    },
    parseBook() {
      this.book.loaded.cover.then(cover => {
        this.book.archive.createUrl(cover).then(url => {
          this.setCover(url)
        })
      })
      this.book.loaded.metadata.then(metadata => {
        this.setMetadata(metadata)
      })
      this.book.loaded.navigation.then(nav => {
        // console.log('nav.toc: ', nav.toc)
        const navItem = flatten(nav.toc)

        // 解决层级判断问题
        function find(item, level = 0) {
          return !item.parent ? level : find(navItem.filter(parentItem => parentItem.id === item.parent)[0], ++level)
        }

        navItem.forEach(item => {
          item.level = find(item)
        })
        // console.log('result navItem: ', navItem)
        this.setNavigation(navItem)
      })
    },
    initEpub() {
      const url = process.env.VUE_APP_EPUB_URL + '/' + this.fileName + '.epub'
      // console.log('url', url)
      this.book = new Epub(url)
      this.setCurrentBook(this.book)
      this.initRendition()
      this.initGesture()
      this.parseBook()
      this.book.ready.then(() => {
        return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16)) // 进行分页
      }).then(locations => {
        // console.log(locations)
        this.setBookAvailable(true)
        this.refreshLocation()
      })
    }
  },
  mounted() {
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
