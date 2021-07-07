import dsGuess from './../dataServices/dsGuess'
const guessStore = {

    state: {
      guesses: []
    },

    mutations: {
      updateGuess(state,newScore){
        let updatedGuess = state.guesses.filter(guess => guess.idGuess === newScore.idGuess)[0]
        updatedGuess.guess_team1 = newScore.guessTeam1
        updatedGuess.guess_team2 = newScore.guessTeam2
      },

      setGuesses(state, newGuesses) {
        state.guesses=newGuesses
      },

      cleanGuesses(state){
        state.guesses=[]
      }
    },

    actions: {
      getGuesses({commit},payload) {
        return new Promise((resolve,reject) => {
          dsGuess.getSelected(payload).then(response => {
            commit('setGuesses',response.data)
            resolve(response.data)
          }).catch(e => {
            reject('Erro ao consultar palpites - ' + e)
          })  
        })
      },

      
      updateGuess({commit},payload){
        return new Promise((resolve,reject) => {
          dsGuess.updateGuess(payload.newScore).then(() => {
            commit('updateGuess',payload.newScore)
            resolve('Palpite Atualizado')
          }).catch(e => {
            reject('Erro ao atualizar palpite - ' + e)
          })  
        })
      },

      getRanking({commit},payload){
        return new Promise((resolve,reject) => {
          dsGuess.getRanking(payload.idGame).then((response) => {
            commit('ok')
            resolve(response.data)
          }).catch(e => {
            reject('Erro ao recuperar o ranking - ' + e)
          })  
        })
      }
      


    }
  }
  export default guessStore