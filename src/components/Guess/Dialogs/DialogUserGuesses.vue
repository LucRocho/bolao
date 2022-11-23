<template>
  <div>

  <v-row justify="center">
    <v-dialog
      :value = "true"
      persistent
      max-width="600px"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5 primary--text">Palpites de {{user.userName}}</span>
        </v-card-title>
        <v-card-text v-if="listUserGuesses.length">
          <v-list
            flat
            class="pt-0"
            three-line
          >
            <guess
                v-for="guess in listUserGuesses"
                :key="guess.idGuess"
                :guess="guess"
            />
          </v-list>
        </v-card-text>
        <v-card-text v-else>
          <span class="red--text">
            Esse usuário não possui nenhum palpite de jogo já iniciado.
          </span>
        </v-card-text>
        
      </v-card>
    </v-dialog>
  </v-row>
  <v-snackbar
      :timeout="timeout"
      v-model="snackbar"
  >
    Fechar os palpites do {{user.userName}}
    <template v-slot:action="{ attrs }">
      <v-btn
        color="blue"
        text
        v-bind="attrs"
        @click="$emit('close')"
      >
        Fechar
      </v-btn>
    </template>
  </v-snackbar>
  </div>
</template>

<script>
export default {
  props: ['idGame','user'],
  data () {
    return {
      listUserGuesses:[],
      timeout:-1,
      snackbar:true
    }
  },

  components: {
    guess: require('./../Guess').default    
  },

  mounted () {
    let searchObj = {
      userId: this.user.idUser,
      gameId: this.idGame,
      status:'past',
      orderDesc:'true'
    }
    this.$store.dispatch('getGuesses',searchObj)
    .then((resp)=>{
      this.listUserGuesses=resp
    }).catch(e => {
      this.$store.commit('showSnackbar',e)
    })  
    
  },

  methods: {
    
  }
}
</script>

<style>
  
</style>
