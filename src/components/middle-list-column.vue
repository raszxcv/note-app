<template>
    <div id="middle-list-column">
        <div class="note-header">
            <h1>NOTES2 | SKYLINE</h1>
            <div class="btn-group btn-group-justified" role="group">
                <div class="btn-group">
                    <button class="btn btn-default" @click="toAll" :class="{active: isAll}">All Notes</button>
                </div>
                <div class="btn-group">
                    <button class="btn btn-default" @click="toFavorite" :class="{active: isFavorite}">Favorite</button>
                </div>
            </div>
        </div>
        <div class="list-group all" v-show="isAll">
            <transition-group tag="div" name="list-complete">
                <a v-for="(note, index) in noteList" class="list-group-item list-complete-item" :class="{ active: activeNote === note }" @click="updateActive({ aNote: note, aIndex: index })" :key="note"><p>{{ note.text.trim().substring(0, 20) }}</p></a>
            </transition-group>
        </div>
        <div class="list-group all" v-show="isFavorite">
            <transition-group tag="div" name="list-complete">
                <a v-for="(note, index) in favoriteList" class="list-group-item list-complete-item" :class="{ active: activeNote === note }" @click="updateActive({ aNote: note, aIndex: index })" :key="note"><p>{{ note.text.trim() }}</p></a>
            </transition-group>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'middle-list-column',
    computed: {
      noteList () {
        return this.$store.state.noteList
      },
      activeNote () {
        return this.$store.state.activeNote
      },
      favoriteList () {
        return this.$store.getters.favoriteList
      },
      isFavorite () {
        return this.$store.state.allOrFav == 'favorite'
      },
      isAll () {
        return this.$store.state.allOrFav == 'all'
      }
    },
    methods: {
      updateActive (payload) {
        this.$store.dispatch('updateActive', payload)
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
      toFavorite () {
        this.$store.dispatch('toggleFavorite')
        const favoriteList = this.$store.state.noteList.filter(item => item.favorite == true)
        if (this.$store.state.allOrFav == 'favorite' && favoriteList.length > 0) {
          this.$store.state.activeNote = favoriteList[0]
        }
      },
      toAll () {
        this.$store.dispatch('toggleAll')
      }
    }
  }
</script>
<style>
    #middle-list-column {
        float: left;
        width: 300px;
        height: 100%;
        background: #FAFAFA;
        font-family: 'Raleway', sans-serif;
        font-weight: 300;
    }
    #middle-list-column .note-header {
        text-align: center;
        padding: 2px 25px 25px;
    }
    #middle-list-column .note-header h1 {
        margin-top: 20px;
        margin-bottom: 10px;
        text-transform: uppercase;
        font-size: 22px;
        padding-bottom: 8px;
    }
    #middle-list-column .list-group  {
        overflow-y: auto;
        overflow-x: hidden;
        height: calc(100% - 121px);
        font-size: 15px;
    }

    #middle-list-column .list-group p {
        width: 271px;  /* 过渡效果的关键 */
    }

    #middle-list-column .list-group .list-group-item {
        border-radius: 0;
        border: none;
        padding: 14px 15px;
    }

    #middle-list-column .list-group .list-group-item.active {
        background: #DBDBDB;
        color: #000;
    }

    /* 过渡状态 */
    .list-complete-item {
        -webkit-transition: all .5s;
        -moz-transition: all .5s;
        -ms-transition: all .5s;
        -o-transition: all .5s;
        transition: all .5s;
        color: black;
    }
    .list-complete-item .active p {
        color: white
    }
    .list-complete-enter, .list-complete-leave-active {
        -webkit-transform: translate(15px, 15px);
        -moz-transform: translate(15px, 15px);
        -ms-transform: translate(15px, 15px);
        -o-transform: translate(15px, 15px);
        transform: translate(15px, 15px);
        opacity: 0;
    }
    .list-complete-leave-active {
        position: absolute;
    }

</style>