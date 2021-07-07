const mainStore = {
    //namespaced: true,
    state: {
      snackbar: {
        text: '',
        show: false
      },
      appTitle: process.env.VUE_APP_TITLE,
      ok:null
    },
    mutations: {
      showSnackbar (state, text) {
        let timeout = 0
        if (state.snackbar.show) {
          state.snackbar.show = false
          timeout = 300
        }
        setTimeout(() => {
          state.snackbar.show = true
          state.snackbar.text = text
        }, timeout)
      },
      hideSnackbar (state) {
        state.snackbar.show = false
      },
      updateActiveCompetition (state, newActiveCompetition) {
        state.activeCompetition=newActiveCompetition
      },
      ok(state) {
        state.ok='ok'
      }
    },
    actions: {
    }
  }
  export default mainStore