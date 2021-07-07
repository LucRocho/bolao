import dsTeam from './../dataServices/dsTeam'
const teamStore = {

    state: {
      teams: []
    },

    mutations: {
      deleteTeam (state, id) {
        state.teams = state.teams.filter(team => team.id !== id)
      },

      saveTeam (state, payload) {
        if (!payload.modeCreate) {
          let savedTeam = state.teams.filter(team => team.id === payload.savedTeam.id)[0]
          savedTeam.name = payload.savedTeam.name
          savedTeam.flag = payload.savedTeam.flag
        }
        else {
          state.teams.unshift(payload.savedTeam)
        }
      },
      
      setTeams(state, newTeams) {
        state.teams=newTeams
      }
    },

    actions: {
      deleteTeam ({ commit }, id) {
        return new Promise((resolve,reject) => {
          dsTeam.delete(id).then(response => {
            let responseMessage= response.data["error"];
            if (!responseMessage) {
              commit('deleteTeam', id)
              resolve('Equipe excluída')
            } else {
              reject( 'Não foi possível excluir a equipe - ' + responseMessage)
            }
          })
        })
      },

      saveTeam ({ commit } , payload) {
        return new Promise((resolve,reject) => {
          dsTeam.save(payload.formData).then(response => {
            let responseMessage= response.data["error"]
            if (!responseMessage) {
              if (payload.modeCreate) {
                payload.savedTeam.id=response.data["insertId"]
              }
              commit('saveTeam', payload)
              resolve('Equipe Salva')
            } else {
              reject( 'Não foi possível salvar a equipe - ' + responseMessage)
            }
          })
        })
      },

      getAllTeams({ commit }) {
        return new Promise((resolve,reject) => {
          dsTeam.getAll().then(response => {
            commit('setTeams',response.data)
            resolve(response.data)
          }).catch(e => {
            reject('Erro ao consultar equipes - ' + e)
          })
        })
      },

      getTeamsByName({ commit }, searchName){
        return new Promise((resolve,reject) => {
          dsTeam.findByName(searchName).then(response => {
            commit('setTeams',response.data)
            resolve(response.data)
          }).catch(e => {
            reject('Erro ao consultar equipes - ' + e)
          })  
        })
      }
    }
  }
  export default teamStore