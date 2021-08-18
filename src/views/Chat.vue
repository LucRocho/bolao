<template>
  <div>
    <p class="text-h6 text-center primary--text mb-0 mt-2" >
      <v-icon color="primary">mdi-chat</v-icon> - Bate-Papo
    </p>
    <field-select-game @idGameChanged="changeGame" />
    <v-container fluid>
      <chat />
      
    </v-container>
    
    
  </div>
</template>

<script>
export default {
  name: 'Chat',
  data() {
      return {
        idGame:0,
        
       
    }
      
  },
  components: {
    'field-select-game': require('./../components/Shared/FieldSelectGame').default,
    'chat': require('./../components/Shared/SimpleChat').default
    
  },
  methods:{
    changeGame(idGame){
      console.log(idGame)
    },

    
  },
  mounted () {
    this.$store.dispatch('getActiveGamesUser',this.$store.state.userStore.loggedUser.id).then(resp=>{
        let games = resp
        this.idGame=games[0].id
      }).catch(e => {
        this.$store.commit('showSnackbar',e)
      })
  }
}
</script>