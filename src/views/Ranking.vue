<template>
  <div>
    <p class="text-h6 text-center primary--text mb-0 mt-2" >
      <v-icon color="primary">mdi-order-numeric-ascending</v-icon> - Ranking
    </p>
    <field-select-game @idGameChanged="changeGame" />
    <v-container fluid>
      <v-row dense>
        <v-col
          v-for="user in ranking"
          :key="user.idUser"
          :cols="12"
          :sm="4"
        >
          <v-card>
            <v-img
              :src="user.userPhoto"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title>
                 <span class="white--text font-weight-bold font-italic">{{user.position}}º</span>
              </v-card-title>
              <v-card-subtitle>
                <span class="white--text">{{user.userName}}</span>
              </v-card-subtitle>
            </v-img>

            <v-card-actions>
              <span class="primary--text">Pontos: {{user.points}}</span>
              <v-spacer></v-spacer>

              <v-btn 
                text
                class="primary--text"
                @click="guesses(user)"
              >
                Palpites
              </v-btn>
              

            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <dialog-guess
      v-if="dialogs.guess"
      :idGame=idGame
      :user=selectedUser
      @close="dialogs.guess=false"
    />
    
  </div>
</template>

<script>
export default {
  name: 'Ranking',
  data() {
      return {
        ranking:[],
        idGame:0,
        selectedUser:null,
        dialogs:{
          guess:false
        }
      }
  },
  components: {
    'field-select-game': require('./../components/Shared/FieldSelectGame').default,
    'dialog-guess': require('./../components/Guess/Dialogs/DialogUserGuesses.vue').default
  },
  methods:{
    changeGame(idGame){
      this.$store.dispatch('getRanking',{idGame:idGame})
        .then(response=>{
          this.idGame=idGame
          this.ranking=response
        }).catch((e)=>{
            this.$store.commit('showSnackbar',e)
        })
    },
    guesses(user){
      //console.log(user);
      this.selectedUser=user
      this.dialogs.guess=true
    }
  },
  mounted () {
    this.$store.dispatch('getActiveGamesUser',this.$store.state.userStore.loggedUser.id).then(resp=>{
        let games = resp
        this.idGame=games[0].id
        this.$store.dispatch('getRanking',{idGame:this.idGame})
        .then(response=>{
          this.ranking=response
        }).catch((e)=>{
            this.$store.commit('showSnackbar',e)
        })
        
      }).catch(e => {
        this.$store.commit('showSnackbar',e)
      })
  }
}
</script>