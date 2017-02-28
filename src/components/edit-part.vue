<template>
    <div id="edit-part">
        <textarea class="form-control" @input="editNote($event)" :value="content"></textarea>
    </div>
</template>
<script>
  export default {
    computed: {
      content () {
        if (this.$store.state.activeNote.text) {
          return this.$store.state.activeNote.text
        } else {
          return ''
        }
      }
    },
    methods: {
      editNote(event) {
        this.$store.dispatch({
          type: 'editNote',
          text: event.target.value
        })
      }
    }
  }
</script>
<style>
    #edit-part {
        height: 50%;
        border-bottom: 3px solid #F2F2F2;
    }
    #edit-part textarea {
        height: 100%;
        border: none;
        border-radius: 0;
        font-size: 20px; /*16*/
        font-family: 'Raleway', sans-serif;
        font-weight: normal;
        resize: none;
        background: #FFFFFF;
        color: #8B97A7;
        padding: 10px;
    }
</style>