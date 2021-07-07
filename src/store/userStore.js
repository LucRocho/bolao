import dsUser from './../dataServices/dsUser'
const userStore = {

    state: {
      users: [],
      loggedUser: null
    },

    mutations: {
      deleteUser (state, id) {
        state.users = state.users.filter(user => user.id !== id)
      },

      saveUser (state, payload) {
        if (!payload.modeCreate) {
          let savedUser = state.users.filter(user => user.id === payload.savedUser.id)[0]
          savedUser.name = payload.savedUser.name
          savedUser.email = payload.savedUser.email
          savedUser.photo = payload.savedUser.photo
          savedUser.administrator = payload.savedUser.administrator
          savedUser.active = payload.savedUser.active
        }
        else {
          state.users.unshift(payload.savedUser)
        }
      },

      setUsers(state, newUsers) {
        state.users=newUsers
      },
      setLoggedUser(state, newUser) {
        state.loggedUser = newUser
      }
    },

    actions: {
      deleteUser ({ commit, state }, id) {
        return new Promise((resolve,reject) => {
          if (id == state.loggedUser.id) {
            //commit('showSnackbar', 'Não é possível excluir o usuário logado')
            reject('Não é possível excluir o usuário logado')
          } else {
            dsUser.delete(id).then(response => {
              let responseMessage= response.data["error"];
              if (!responseMessage) {
                commit('deleteUser', id)
                resolve('Usuário excluído')
              } else {
                reject('Não foi possível excluir o usuário - ' + responseMessage)
              }
            })
          }
        })
      },

      saveUser ({ commit } , payload) {
        return new Promise((resolve,reject) => {
          dsUser.save(payload.formData).then(response => {
            let responseMessage= response.data["error"]
            if (!responseMessage) {
              if (payload.modeCreate) {
                payload.savedUser.id=response.data["insertId"]
              }
              if (payload.savedUser) {
                commit('saveUser', payload)
                
              }
              resolve('Usuário salvo')
            } else {
              reject('Não foi possível salvar o usuário - ' + responseMessage)
            }
          })
        })
      },

      getAllUsers({ commit }) {
        return new Promise((resolve,reject) => {
          dsUser.getAll().then(response => {
            commit('setUsers',response.data)
            resolve(response.data)
          }).catch(e => {
            reject('Erro ao consultar usuários - ' + e)
          })  
        })
      },

      getUsersByName({ commit }, searchName){
        return new Promise((resolve,reject) => {
          dsUser.findByName(searchName).then(response => {
            commit('setUsers',response.data)
            resolve(response.data)
          }).catch(e => {
            reject('Erro ao consultar usuários - ' + e)
          })
        })
      },

      login ({ commit }, formData) {
        return new Promise((resolve,reject) => {
          dsUser.login(formData)
            .then(response => {
              let responseMessage= response.data["error"];
              if (!responseMessage){
                commit('setLoggedUser',response.data)
                resolve(response.data)
              }
              else{
               reject(responseMessage)
              }
            })
            .catch(e => {
              reject(e)
            });
        })
      },

      changePassword({commit},formData){
        return new Promise((resolve,reject) => {
          dsUser.changePassword(formData)
            .then(response => {
              let responseMessage= response.data["error"];
              if (!responseMessage){
                commit('ok')
                resolve(response.data)
              }
              else{
                reject(responseMessage)
              }
            })
            .catch(e => {
              reject(e)
            })
        })
      }
    }
    
  }
  export default userStore