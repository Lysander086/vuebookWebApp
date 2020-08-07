<template>
    <div class="ebook">
        <book-reader></book-reader>
    </div>
</template>
r
<script>
import BookReader from "@/components/ebook/EbookReader.vue"
export default {
  name: "ebook",
  data() {
    return {};
  },
  components: {
    BookReader
  },
};
</script>

<style scoped>

</style>
