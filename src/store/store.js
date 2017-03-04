import Vue from 'vue'
import Vuex from 'vuex'
import VueResource from 'vue-resource'
import {ADD_NOTE, DELETE_NOTE, TOGGLE_STAR_STATUS, UPDATE_ACTIVE, EDIT_NOTE, CLEAR_ACTIVE, TOGGLE_ALL, TOGGLE_FAVORITE, RENDER_MARKDOWN, CLEAR_MARKDOWN, SEARCH_NOTE} from './mutations'
import * as action from './actions'

// 注册Vuex
Vue.use(Vuex)
Vue.use(VueResource)
// 设计state
const state = {
  noteList: [],
  activeNote: {},
  allOrFav: 'all',
  renderedMarkdown: ''
}
// 设计getters
const getters = {
  favoriteList () {
    return state.noteList.filter(item => item.favorite == true)
  }
}
// 设计mutations
const mutations = {
  // 在对象直接量中的中括号表明属性名是需要被计算的,它的内容被计算为字符串.ES6计算属性.
  [ADD_NOTE] (state) {
    const newNote = {
      text: 'New Note',
      favorite: false,
      num: 0 // 引入num其实是v-for渲染中的index数值,引入这个数值是为了deleteNote的时候splice方法定位用.用num为了不和index同名.
    }
    state.noteList.push(newNote)
    state.activeNote = newNote
    // 以下代码修改的是newNote这个对象的index.注意.
    state.activeNote.num = state.noteList.length - 1
  },
  
  [EDIT_NOTE] (state, payload) {
    state.activeNote.text = payload.text
  },
  
  [DELETE_NOTE] (state) {
      let num = state.activeNote.num
      // console.log(state.noteList.splice.toString()) 和原生不一样
      if (num || num == 0) state.noteList.splice(num, 1) // 排除undefined,但是可以为0
  },
  
  [TOGGLE_STAR_STATUS] (state) {
    // 切换STAR高亮
    state.activeNote.favorite = !state.activeNote.favorite
  },
  
  [UPDATE_ACTIVE] (state, payload) {
    if (state.allOrFav == 'favorite') {
      state.activeNote = payload.aNote
      state.activeNote.num = state.noteList.indexOf(payload.aNote) // 定位的重点!
    }
    else if (state.allOrFav == 'all') {
      state.activeNote = payload.aNote
      state.activeNote.num = payload.aIndex
    }
  },
  
  [CLEAR_ACTIVE] (state) {
    state.activeNote = {}
  },
  
  [TOGGLE_ALL] (state) {
    state.allOrFav = 'all'
  },
  
  [TOGGLE_FAVORITE] (state) {
    state.allOrFav = 'favorite'
  },
  
  [RENDER_MARKDOWN] (state, payload) {
    state.renderedMarkdown = payload.content
  },
  
  [CLEAR_MARKDOWN] (state) {
    state.renderedMarkdown = ''
  },
  
  [SEARCH_NOTE] (state, payload) {
    state.activeNote = payload
  }
}
// 设计actions
const actions = {
  addNote: action.addNote,
  deleteNote: action.deleteNote,
  toggleStarStatus: action.toggleStarStatus,
  updateActive: action.updateActive,
  editNote: action.editNote,
  clearActive: action.clearActive,
  toggleAll: action.toggleAll,
  toggleFavorite: action.toggleFavorite,
  renderMarkdown: action.renderMarkdown,
  clearMarkdown: action.clearMarkdown,
  searchNote: action.searchNote
}
const store = new Vuex.Store({
  name: 'store',
  state,
  getters,
  mutations,
  actions,
})

export {store}