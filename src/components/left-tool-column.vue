<template>
    <div id="left-tool-column">
        <ul>
            <li><i class="glyphicon glyphicon-plus addNote" @click="addNote"></i></li>
            <li><i class="glyphicon glyphicon-star favNote" :class="{starActive: isStarActive}" @click="toggleStarStatus"></i></li>
            <li><i class="glyphicon glyphicon-remove delNote" @click="deleteNote"></i></li>
            <li><i class="glyphicon glyphicon-refresh renderMarkdown" @click="renderMarkdown"></i></li>
        </ul>
    </div>
</template>
<script>
    export default {
      computed: {
        isStarActive () {
          if (this.$store.state.activeNote.favorite) {
            return this.$store.state.activeNote.favorite
          } else {
            return false
          }
        }
      },
      methods: {
        addNote () {
          if (this.$store.state.allOrFav == 'all')
          this.$store.dispatch ({
            type: 'addNote'
          })
          this.$http.post('https://api.github.com/markdown',{
            "text": this.$store.state.activeNote.text,
            "mode": "gfm",
            "context": "github/gollum"
          }).then(response => {
            // get body data
            this.$store.dispatch({
              type: 'renderMarkdown',
              content: response.body
            })
          }, response => {
            // error callback
            console.log('net-err-markdown-render')
          })
        },
        toggleStarStatus () {
          this.$store.dispatch ({
            type: 'toggleStarStatus'
          })
        },
        deleteNote () {
          if (this.$store.state.noteList.length > 0 && this.$store.state.activeNote)
          this.$store.dispatch ({
            type: 'deleteNote'
          })
          this.$store.dispatch ({
            type: 'clearActive'
          })
          this.$store.dispatch ({
            type: 'clearMarkdown'
          })
        },
        renderMarkdown () {
          this.$http.post('https://api.github.com/markdown',{
            "text": this.$store.state.activeNote.text,
            "mode": "gfm",
            "context": "github/gollum"
          }).then(response => {
            // get body data
            this.$store.dispatch({
              type: 'renderMarkdown',
              content: response.body
            })
          }, response => {
            // error callback
            console.log('net-err-markdown-render')
          })
        }
      }
    }
</script>
<style>
    #left-tool-column {
        float: left;
        width: 80px;
        height: 100%;
        padding: 35px 25px 25px;
        background: #24313D;
    }

    #left-tool-column ul li i {
        color: #55585A;
        font-size: 30px;
        margin-bottom: 35px;
        opacity: 0.8;
        transition: all 0.5s;
        cursor: pointer;
    }

    #left-tool-column ul li i.starActive {
        color: #F5A035;
    }

    #left-tool-column ul li i:hover {
        opacity: 1;
    }

    #left-tool-column ul li i.addNote {
        transform: rotate(0deg);
    }

    #left-tool-column ul li i.addNote:hover {
        color: #358C31;
        transform: rotate(90deg);
    }

    #left-tool-column ul li i.favNote {
        transform: rotate(0deg);
    }

    #left-tool-column ul li i.favNote:hover {
        transform: rotate(72deg);
    }

    #left-tool-column ul li i.delNote {
        transform: rotate(0deg);
    }

    #left-tool-column ul li i.delNote:hover {
        color: #B71E1F;
        transform: rotate(90deg);
    }

    #left-tool-column ul li i.renderMarkdown {
        transform: rotate(0deg);
    }

    #left-tool-column ul li i.renderMarkdown:hover {
        color: #245EA3;
        transform: rotate(180deg);
    }
</style>