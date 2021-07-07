import dsCompetition from './../dataServices/dsCompetition'
const competitionStore = {

    state: {
      competitions: [],
      activeCompetition: null
    },

    mutations: {
      deleteCompetition (state, id) {
        state.competitions = state.competitions.filter(competition => competition.id !== id)
      },

      saveCompetition (state, payload) {
        if (!payload.modeCreate) {
          let savedCompetition = state.competitions.filter(competition => competition.id === payload.savedCompetition.id)[0]
          savedCompetition.name = payload.savedCompetition.name
          savedCompetition.logo = payload.savedCompetition.logo
          savedCompetition.active = payload.savedCompetition.active
          savedCompetition.start_date = payload.savedCompetition.start_date
          savedCompetition.end_date = payload.savedCompetition.end_date
        }
        else {
          state.competitions.unshift(payload.savedCompetition)
        }
        console.log(payload.savedCompetition.active)
        if (payload.savedCompetition.active){
          console.log(payload.savedCompetition)
          state.activeCompetition=payload.savedCompetition
        }
      },
      
      setCompetitions(state, newCompetitions) {
        state.competitions=newCompetitions
      },

      setActiveCompetition(state, newCompetition) {
        state.activeCompetition=newCompetition
      }
    },

    actions: {
      deleteCompetition ({ commit }, id) {
        return new Promise((resolve,reject) => {
          dsCompetition.delete(id).then(response => {
            let responseMessage= response.data["error"];
            if (!responseMessage) {
              commit('deleteCompetition', id)
              resolve('Competição excluída')
            } else {
              reject( 'Não foi possível excluir a competição - ' + responseMessage)
            }
          })
        })
      },

      saveCompetition ({ commit } , payload) {
        return new Promise((resolve,reject) => {
          dsCompetition.save(payload.formData).then(response => {
            let responseMessage= response.data["error"]
            if (!responseMessage) {
              if (payload.modeCreate) {
                payload.savedCompetition.id=response.data["insertId"]
              }
              commit('saveCompetition', payload)
              resolve('Competição Salva')
            } else {
              reject( 'Não foi possível salvar a competição - ' + responseMessage)
            }
          })
        })
      },

      saveTeamsCompetition ({ commit } , payload) {
        return new Promise((resolve,reject) => {
          dsCompetition.saveTeamsCompetition(payload.formData).then(response => {
            let responseMessage= response.data["error"]
            if (!responseMessage) {
              
              //commit('showSnackbar','Equipes incluídas na competição')
              commit('ok')
              resolve('Equipes incluídas na competição')
            } else {
              reject( 'Não foi possível incluir as equipes na competição - ' + responseMessage)
            }
          })
        })
      },

      getAllCompetitions({ commit }) {
        return new Promise((resolve,reject) => {
          dsCompetition.getAll().then(response => {
            commit('setCompetitions',response.data)
            resolve(response.data)
          }).catch(e => {
            reject('Erro ao consultar competições - ' + e)
          })
        })
      },

      getCompetitionsByName({ commit }, searchName){
        return new Promise((resolve,reject) => {
          dsCompetition.findByName(searchName).then(response => {
            commit('setCompetitions',response.data)
            resolve(response.data)
          }).catch(e => {
            reject('Erro ao consultar competições - ' + e)
          })  
        })
      },

      getActiveCompetition({commit}){
        return new Promise((resolve,reject) => {
          dsCompetition.getActiveCompetition().then(response => {
            commit('setActiveCompetition',response.data)
            resolve(response.data)
          }).catch(e => {
            reject('Erro ao consultar a competição ativa - ' + e)
          })  
        })
      },

      getTeamsCompetition({commit},competitionId){
        return new Promise((resolve,reject) => {
          dsCompetition.getTeams(competitionId).then(response => {
            resolve(response.data)
            commit('ok')
          }).catch(e => {
            reject('Erro ao consultar as equipes de uma competição - ' + e)
          })  
        })
      },
      
      getAvailableTeamsCompetition({commit},competitionId){
        return new Promise((resolve,reject) => {
          dsCompetition.getOtherTeams(competitionId).then(response => {
            resolve(response.data)
            commit('ok')
          }).catch(e => {
            reject('Erro ao consultar as equipes disponíveis para uma competição - ' + e)
          })  
        })
      }
    }
  }
  export default competitionStore