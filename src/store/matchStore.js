import dsMatch from './../dataServices/dsMatch'
const matchStore = {

    state: {
      matchs: []
    },

    mutations: {
      deleteMatch (state, id) {
        state.matchs = state.matchs.filter(match => match.id !== id)
      },

      
      updateScore(state,newScore){
        let updatedMatch = state.matchs.filter(match => match.id === newScore.idMatch)[0]
        updatedMatch.score_team1 = newScore.scoreTeam1
        updatedMatch.score_team2 = newScore.scoreTeam2
      },

      saveMatch (state, payload) {

        //atualiza o elemento incluido com os campos competitionName,team1Name,team2Name,team1Flag,team2Flag

        if (!payload.modeCreate) {
          let savedMatch = state.matchs.filter(match => match.id === payload.savedMatch.id)[0]
          savedMatch.id_competition = payload.savedMatch.id_competition
          savedMatch.id_team1 = payload.savedMatch.id_team1
          savedMatch.id_team2 = payload.savedMatch.id_team2
          savedMatch.score_team1 = payload.savedMatch.score_team1
          savedMatch.score_team2 = payload.savedMatch.score_team2
          savedMatch.match_datetime = payload.savedMatch.match_datetime
          savedMatch.stage = payload.savedMatch.stage
          savedMatch.groupx = payload.savedMatch.groupx
          savedMatch.competitionName = payload.savedMatch.competitionName
          savedMatch.team1Name = payload.savedMatch.team1Name
          savedMatch.team1Flag = payload.savedMatch.team1Flag
          savedMatch.team2Name = payload.savedMatch.team2Name
          savedMatch.team2Flag = payload.savedMatch.team2Flag
        }
        else {
          state.matchs.unshift(payload.savedMatch)
        }
        
      },
      
      setMatchs(state, newMatchs) {
        state.matchs=newMatchs
      }
    },

    actions: {
      deleteMatch ({ commit }, id) {
        return new Promise((resolve,reject) => {
          dsMatch.delete(id).then(response => {
            let responseMessage= response.data["error"];
            if (!responseMessage) {
              commit('deleteMatch', id)
              resolve('Partida excluída')
            } else {
              reject( 'Não foi possível excluir a partida - ' + responseMessage)
            }
          })
        })
      },

      saveMatch ({ commit } , payload) {
        return new Promise((resolve,reject) => {
          dsMatch.save(payload.formData).then(response => {
            let responseMessage= response.data["error"]
            if (!responseMessage) {
              if (payload.modeCreate) {
                payload.savedMatch.id=response.data["insertId"]
              }
              //atualiza o savedMatch com competitionName,team1Name,team1Flag,team2Name,team2Flag
              dsMatch.get(payload.savedMatch.id).then(resp=>{
                payload.savedMatch=resp.data
                commit('saveMatch', payload)
                resolve('Partida Salva')
              }).catch(e=>{
                reject( 'Não foi possível salvar a partida - ' + e)
              })
           } else {
              reject( 'Não foi possível salvar a partida - ' + responseMessage)
            }
          })
        })
      },

      getAllMatchs({ commit }) {
        return new Promise((resolve,reject) => {
          dsMatch.getAll().then(response => {
            commit('setMatchs',response.data)
            resolve(response.data)
          }).catch(e => {
            reject('Erro ao consultar partidas - ' + e)
          })
        })
      },

      getMatchsByName({ commit }, searchName){
        return new Promise((resolve,reject) => {
          dsMatch.findByName(searchName).then(response => {
            commit('setMatchs',response.data)
            resolve(response.data)
          }).catch(e => {
            reject('Erro ao consultar partidas - ' + e)
          })  
        })
      },

      getMatchs({commit},payload) {
        return new Promise((resolve,reject) => {
          dsMatch.getSelected(payload).then(response => {
            commit('setMatchs',response.data)
            resolve(response.data)
          }).catch(e => {
            reject('Erro ao consultar partidas - ' + e)
          })  
        })
      },

      
      updateScore({commit},payload){
        return new Promise((resolve,reject) => {
          dsMatch.updateScore(payload.newScore).then(() => {
            commit('updateScore',payload.newScore)
            resolve('Placar Atualizado')
          }).catch(e => {
            reject('Erro ao atualizar placar - ' + e)
          })  
        })
      }
      


    }
  }
  export default matchStore