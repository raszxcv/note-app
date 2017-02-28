<template>
<div id="markdown-part">
    <article class="markdown-body" v-html="renderMarkdown"></article>
</div>
</template>
<script>
    export default {
      name: 'markdown-part',
      computed: {
        renderMarkdown () {
          return this.$store.state.renderedMarkdown
        }
      }
    }
</script>
<style>
    @import "../common/github-markdown.css";
    #markdown-part {
        height: 50%;
        padding: 20px;
        background: #FFFFFF;
    }
</style>