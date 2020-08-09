<template>
  <div class="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
    <ebook-menu></ebook-menu>
  </div>
</template>

<script>
import EbookReader from "@/components/ebook/EbookReader.vue"
import EbookTitle from "@/components/ebook/EbookTitle"
import EbookMenu from "@/components/ebook/EbookMenu"
import {getReadTime, saveReadTime} from "@/utils/localStorage"
import {ebookMixin} from "@/utils/mixin"

export default {
  mixins: [ebookMixin],
  name: "ebook",
  data() {
    return {};
  },
  components: {EbookReader, EbookTitle, EbookMenu},
  methods: {
    startLoopReadTime() {
      // 获取阅读时间
      let readTime = getReadTime(this.fileName)
      if (!readTime) {
        // 如果阅读时间不存在，则进行重置
        readTime = 0
      }
      // 开启定时任务，每秒更新一次阅读时间，每30秒记录一次阅读时间
      this.task = setInterval(() => {
        readTime += 1000 * 60
        saveReadTime(this.fileName, readTime)
      }, 1000 * 60)
    }
  },
  mounted() {
    // 开启记录阅读时间的定时任务
    this.startLoopReadTime()
  },
  beforeDestroy() {
    if (this.task) {
      // 关闭定时任务
      clearInterval(this.task)
    }
  }

};
</script>

<style scoped>

</style>
