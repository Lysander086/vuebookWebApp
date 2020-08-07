<template>
  <div class="ebook">
    <ebook-title></ebook-title>
    <ebook-reader></ebook-reader>

  </div>
</template>

<script>
import EbookReader from "@/components/ebook/EbookReader.vue"
import EbookTitle from "@/components/ebook/EbookTitle"

export default {
  name: "ebook",
  data() {
    return {};
  },
  components: {EbookReader, EbookTitle},
};
</script>

<style scoped>

</style>
