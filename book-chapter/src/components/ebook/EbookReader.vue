<template>
    <div class="ebook-reader">
        <!--        {{$router.params.fileName}}-->
        <div id="read"></div>
    </div>
</template>

<script>
import Epub from 'epubjs'

global.ePub = Epub
export default {
  name: "EbookReader",
  methods: {
    initEpub(){
    }
  },
  mounted() {
    const baseUrl = ' http://192.168.3.10:8081/epub/'
    const fileName = this.$route.params.fileName.split('|').join('/')
    console.log(`${baseUrl}${fileName}.epub`)
    // 以下为可尝试路径, 需要在目的目录中有一个try.epub
    // http://localhost:8080/ebook/History%7Ctry
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
