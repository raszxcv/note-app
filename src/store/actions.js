// actions 集中管理
export const addNote = function ({ commit }) {
  commit('ADD_NOTE')
}
export const deleteNote = function ({ commit }) {
  commit('DELETE_NOTE')
}
export const toggleStarStatus = function ({ commit }) {
  commit('TOGGLE_STAR_STATUS')
}
export const updateActive = function ({ commit }, payload) {
  commit('UPDATE_ACTIVE', payload)
}
export const editNote = function ({ commit }, payload) {
  commit('EDIT_NOTE', payload)
}
export const clearActive = function ({ commit }) {
  commit('CLEAR_ACTIVE')
}
export const toggleAll = function ({ commit }) {
  commit('TOGGLE_ALL')
}
export const toggleFavorite = function ({ commit }) {
  commit('TOGGLE_FAVORITE')
}
export const renderMarkdown = function ({ commit }, payload) {
  commit('RENDER_MARKDOWN', payload)
}
export const clearMarkdown = function ({ commit }) {
  commit('CLEAR_MARKDOWN')
}