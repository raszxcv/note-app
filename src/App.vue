<template>
    <div id="app">
        <left-tool-column></left-tool-column>
        <middle-list-column></middle-list-column>
        <right-edit-column></right-edit-column>
    </div>
</template>

<script>
  import left from './components/left-tool-column.vue'
  import middle from './components/middle-list-column.vue'
  import right from './components/right-edit-column.vue'
  export default {
    name: 'app',
    components: {
      'left-tool-column': left,
      'middle-list-column': middle,
      'right-edit-column': right
    }
  }
</script>

<style>
    @import "./common/main.css";
    #app {
        overflow-y: hidden;
    }
</style>
