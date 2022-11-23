import dsChat from './../dataServices/dsChat'
const chatStore = {

    state: {
      chats: []
    },

    mutations: {
      deleteChat (state, id) {
        state.chats = state.chats.filter(chat => chat.id !== id)
      },

      saveChat (state, payload) {
        
        if (!payload.modeCreate) {
          let savedChat = state.chats.filter(chat => chat.id === payload.savedChat.id)[0]
          savedChat.message = payload.savedChat.message
        }
        else {
          state.chats.unshift(payload.savedChat)
        }
      },
      
      setChats(state, newChats) {
        state.chats=newChats
      }
    },

    actions: {
      deleteChat ({ commit }, id) {
        return new Promise((resolve,reject) => {
          dsChat.delete(id).then(response => {
            let responseMessage= response.data["error"];
            if (!responseMessage) {
              commit('deleteChat', id)
              resolve('Conversa excluída')
            } else {
              reject( 'Não foi possível excluir a conversa - ' + responseMessage)
            }
          })
        })
      },

      saveChat ({ commit } , payload) {
        return new Promise((resolve,reject) => {
          dsChat.save(payload.formData).then(response => {
            let responseMessage= response.data["error"]
            if (!responseMessage) {
              if (payload.modeCreate) {
                payload.savedChat.id=response.data["insertId"]
              }
              //atualiza o savedChat
              dsChat.get(payload.savedChat.id).then(resp=>{
                payload.savedChat=resp.data[0]
                commit('saveChat', payload)
                resolve('Conversa Salva')
              }).catch(e=>{
                reject( 'Não foi possível salvar a conversa - ' + e)
              })


              
            } else {
              reject( 'Não foi possível salvar a conversa - ' + responseMessage)
            }
          })
        })
      },

      getAllChats({ commit },payload) {
        return new Promise((resolve,reject) => {
          dsChat.getAll(payload).then(response => {
            commit('setChats',response.data)
            resolve(response.data)
          }).catch(e => {
            reject('Erro ao consultar conversas - ' + e)
          })
        })
      },

      
    }
  }
  export default chatStore