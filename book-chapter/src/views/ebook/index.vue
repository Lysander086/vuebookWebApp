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

export default {
  name: "ebook",
  data() {
    return {};
  },
  components: {EbookReader, EbookTitle, EbookMenu},
};
</script>

<style scoped>

</style>
