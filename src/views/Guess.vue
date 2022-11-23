<template>
  <div>
    <p class="text-h6 text-center primary--text mb-0 mt-2" >
      <v-icon color="primary">mdi-scoreboard</v-icon> - Meus Palpites
    </p>
    <field-add-search-guess/>
    <list-guesses
      v-if="$store.state.guessStore.guesses.length"
    />
    <no-item
      v-else
    />
  </div>
</template>

<script>
import { format } from 'date-fns'
export default {
  name: 'Guess',
  data() {
      return {
      }
  },
  components: {
    'field-add-search-guess': require('./../components/Guess/FieldAddSearchGuess').default,
    'list-guesses': require('./../components/Guess/ListGuesses').default,
    'no-item': require('./../components/Shared/NoItem').default    
  },
  mounted () {
    //ANTIGO:por default abre todos os palpites dos últimos 2 dias para frente.
    //por default abre todos os palpites futuro
    this.$store.dispatch('getActiveGamesUser',this.$store.state.userStore.loggedUser.id).then(resp=>{
        let games = resp
        let id_game=games[0].id
        /*
        var today = new Date();
        today.setDate(today.getDate() - 2);
        const startDate = format(today,'yyyy-MM-dd');
        */
        const objSearch={
          gameId:id_game,
          //startDate:startDate,
          status:'future',
          userId: this.$store.state.userStore.loggedUser.id}
        this.$store.dispatch('getGuesses',objSearch).then().catch(err => {
          this.$store.commit('showSnackbar',err)
        })
        
      }).catch(e => {
        this.$store.commit('showSnackbar',e)
      })
  }
}
</script>