import dsGame from './../dataServices/dsGame'
const gameStore = {

    state: {
      games: []
    },

    mutations: {
      deleteGame (state, id) {
        state.games = state.games.filter(game => game.id !== id)
      },

      saveGame (state, payload) {
        if (!payload.modeCreate) {
          let savedGame = state.games.filter(game => game.id === payload.savedGame.id)[0]
          savedGame.name=payload.savedGame.name
          savedGame.id_competition = payload.savedGame.id_competition
          savedGame.competitionName = payload.savedGame.competitionName
          savedGame.competitionLogo = payload.savedGame.competitionLogo
          savedGame.id_responsible_user=payload.savedGame.id_responsible_user
          savedGame.responsibleUserName=payload.savedGame.responsibleUserName
          savedGame.individual_value = payload.savedGame.individual_value
          savedGame.winner_tie_loser_points = payload.savedGame.winner_tie_loser_points
          savedGame.team_score_points = payload.savedGame.team_score_points
          savedGame.stage1_weight = payload.savedGame.stage1_weight
          savedGame.stage2_weight = payload.savedGame.stage2_weight
          savedGame.stage3_weight = payload.savedGame.stage3_weight
          savedGame.stage4_weight = payload.savedGame.stage4_weight
          savedGame.stage5_weight = payload.savedGame.stage5_weight
          savedGame.percent_first_prize = payload.savedGame.percent_first_prize
          savedGame.percent_second_prize = payload.savedGame.percent_second_prize
          savedGame.percent_third_prize = payload.savedGame.percent_third_prize
          savedGame.active = payload.savedGame.active
        }
        else {
          state.games.unshift(payload.savedGame)
        }
        
      },
      
      setGames(state, newGames) {
        state.games=newGames
      }
    },

    actions: {
      deleteGame ({ commit }, id) {
        return new Promise((resolve,reject) => {
          dsGame.delete(id).then(response => {
            let responseMessage= response.data["error"];
            if (!responseMessage) {
              commit('deleteGame', id)
              resolve('Bolão excluído')
            } else {
              reject( 'Não foi possível excluir o bolão - ' + responseMessage)
            }
          })
        })
      },

      saveGame ({ commit } , payload) {
        return new Promise((resolve,reject) => {
          dsGame.save(payload.formData).then(response => {
            let responseMessage= response.data["error"]
            if (!responseMessage) {
              if (payload.modeCreate) {
                payload.savedGame.id=response.data["insertId"]
              }
              dsGame.get(payload.savedGame.id).then(resp=>{
                payload.savedGame=resp.data
                commit('saveGame', payload)
                resolve('Bolão Salvo')
              }).catch(e=>{
                reject( 'Não foi possível salvar o bolão - ' + e)
              })
           } else {
             reject( 'Não foi possível salvar o bolão - ' + responseMessage)
            }
          })
        })
      },

      getAllGames({ commit }) {
        return new Promise((resolve,reject) => {
          dsGame.getAll().then(response => {
            commit('setGames',response.data)
            resolve(response.data)
          }).catch(e => {
            reject('Erro ao consultar bolões - ' + e)
          })
        })
      },

      getGamesByName({ commit }, searchName){
        return new Promise((resolve,reject) => {
          dsGame.findByName(searchName).then(response => {
            commit('setGames',response.data)
            resolve(response.data)
          }).catch(e => {
            reject('Erro ao consultar bolões - ' + e)
          })  
        })
      },

      getGames({commit},payload) {
        return new Promise((resolve,reject) => {
          dsGame.getSelected(payload).then(response => {
            commit('setGames',response.data)
            resolve(response.data)
          }).catch(e => {
            reject('Erro ao consultar bolões - ' + e)
          })  
        })
      },

      getUsersGame({commit},gameId){
        return new Promise((resolve,reject) => {
          dsGame.getUsers(gameId).then(response => {
            resolve(response.data)
            commit('ok')
          }).catch(e => {
            reject('Erro ao consultar os participantes de um bolão - ' + e)
          })  
        })
      },

      getActiveGamesUser({commit},userId){
        return new Promise((resolve,reject) => {
          dsGame.getActiveGamesUser(userId).then(response => {
            resolve(response.data)
            commit('ok')
          }).catch(e => {
            reject('Erro ao consultar os bolões ativos de um usuário - ' + e)
          })  
        })
      },
      
      getGameTeams({commit},gameId){
        return new Promise((resolve,reject) => {
          dsGame.getTeams(gameId).then(response => {
            resolve(response.data)
            commit('ok')
          }).catch(e => {
            reject('Erro ao consultar os times de um bolão - ' + e)
          })  
        })
      },

      getAvailableUsersGame({commit},gameId){
        return new Promise((resolve,reject) => {
          dsGame.getOtherUsers(gameId).then(response => {
            resolve(response.data)
            commit('ok')
          }).catch(e => {
            reject('Erro ao consultar os usuários disponíveis para um bolão - ' + e)
          })  
        })
      },

      getGameValues({commit},gameId){
        return new Promise((resolve,reject) => {
          dsGame.getValues(gameId).then(response => {
            resolve(response.data)
            commit('ok')
          }).catch(e => {
            reject('Erro ao consultar os valores para um bolão - ' + e)
          })  
        })
      },

      saveUsersGame  ({ commit } , payload) {
        return new Promise((resolve,reject) => {
          dsGame.saveUsersGame(payload.formData).then(response => {
            let responseMessage= response.data["error"]
            if (!responseMessage) {
              commit('ok')
              //commit('showSnackbar','Participantes incluídos no bolão')
              resolve('Participantes incluídos no bolão')
            } else {
              reject( 'Não foi possível incluir os usuários no bolão - ' + responseMessage)
            }
          })
        })
      },

      setGamePaid({commit},payload) {
        return new Promise((resolve,reject) => {
          dsGame.setGamePaid(payload.formData).then(response => {
            let responseMessage= response.data["error"]
            if (!responseMessage) {
              //commit('showSnackbar','Status de pagamento informado')
              commit('ok')
              resolve('Status de pagamento alterado')
            } else {
              reject( 'Não foi possível alterar o status de pagamento - ' + responseMessage)
            }
          })
        })
      },

      toogleGamePaid({commit},idGameUser) {
        return new Promise((resolve,reject) => {
          dsGame.toogleGamePaid(idGameUser).then(response => {
            let responseMessage= response.data["error"]
            if (!responseMessage) {
              resolve('Status de pagamento alterado')
              commit('ok')
              //commit('showSnackbar','Status de pagamento alterado')
              
            } else {
              reject( 'Não foi possível alterar o status de pagamento - ' + responseMessage)
            }
          })
        })
      }
    
    }
  }
  export default gameStore