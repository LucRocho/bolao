<template>
  <div>
    <p class="text-h6 text-center primary--text mb-0 mt-2" >
      <v-icon color="primary">mdi-chat</v-icon> - Mural
    </p>
    
    <field-select-game @idGameChanged="changeGame" />
    <p class="mr-2 ml-2"> 

      <v-text-field
              v-model="message"
              :append-outer-icon="message ? 'mdi-send' : 'mdi-send'"
              filled
              clear-icon="mdi-close-circle"
              clearable
              label="Mensagem"
              type="text"
              @click:append-outer="sendMessage"
              @click:clear="clearMessage"
        >
        </v-text-field>
    </p>
        
    
    <v-container fluid>
      <chat :idGame=idGame />
      
    </v-container>
    
    
  </div>
</template>

<script>
export default {
  name: 'Chat',
  data() {
      return {
        idGame:0,

        show: false,
        message: 'Fala viado!',
        
       
    }
      
  },

  

  computed: {
    
  },


  components: {
    'field-select-game': require('./../components/Shared/FieldSelectGame').default,
    'chat': require('./../components/Shared/SimpleChat').default
    
  },
  methods:{
    changeGame(selectedIdGame){
      //console.log(selectedIdGame)
      this.idGame=selectedIdGame

      this.$store.dispatch('getAllChats',this.idGame).then().catch(e => {
          this.$store.commit('showSnackbar',e)
        })
    },

    sendMessage () {
      this.resetIcon()
      this.clearMessage()
    },
    clearMessage () {
      this.message = ''
    },
    

    
  },
  mounted () {
    this.$store.dispatch('getActiveGamesUser',this.$store.state.userStore.loggedUser.id).then(resp=>{
        let games = resp
        this.idGame=games[0].id
        this.changeGame(this.idGame)
      }).catch(e => {
        this.$store.commit('showSnackbar',e)
      })
  }
}
</script>