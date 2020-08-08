<template>
  <div>
  </div>
</template>

<script>
import {ebookMixin} from "@/utils/mixin"
import {FONT_SIZE_LIST} from "@/utils/book"
import {saveFontSize} from "@/utils/localStorage"

export default {
  name: 'template',
  mixins: [ebookMixin],
  data() {
    return {
      // fontSizeList: FONT_SIZE_LIST,
    };
  },
  components: {
    // ComName: () => import( "./views/ExperienceDetails")
  },
  methods: {}
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../assets/styles/global";
</style>
