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

    }
  },
  mounted(){
    this.showEpub()
  }
}
</script>

<style lang="scss" scoped></style>
