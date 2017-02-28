<template>
    <div id="right-edit-column">
        <edit-part></edit-part>
        <markdown-part></markdown-part>
    </div>
</template>
<script>
  import edit from './edit-part.vue'
  import markdown from './markdown-part.vue'
  export default {
    components: {
      'edit-part': edit,
      'markdown-part': markdown
    }
  }
</script>
<style>
  #right-edit-column {
      height: 100%;
      margin-left: 380px;
  }
</style>