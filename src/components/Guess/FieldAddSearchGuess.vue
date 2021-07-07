<template>
<div>

  <v-row
    align="center"
    justify="space-between"
  >
    <v-select
      class="ma-5"
      :items="games"
      label="Selecione um bolão*"
      item-text="name"
      item-value="id"
      v-model="id_game"
      @change="cleanList"
      :disabled="disableSelectGame"
    ></v-select>

    <v-tooltip bottom v-if="showSaveAll">
            <template v-slot:activator="{ on, attrs }">
              <v-btn  
                v-bind="attrs"
                v-on="on"
                dense
                class="ma-5" 
                @click="saveAll">
                <v-icon
                color="primary"
                dense
                >mdi-content-save-all</v-icon>
              </v-btn>
            </template>
            <span>Salvar todos os palpites</span>
    </v-tooltip>

    <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                dense 
                v-bind="attrs"
                v-on="on"
                class="ma-5"
                @click="searchGuess">
                <v-icon
                 color="primary"
                 dense
                >mdi-magnify</v-icon>
              </v-btn>
            </template>
            <span>Pesquisar palpites</span>
      </v-tooltip>
  </v-row>
  <dialog-search
    v-if="dialogs.search"
    :gameId=this.id_game
    @close="dialogs.search=false"
    @searched="search"
  />
  <!--
  <v-snackbar
      v-if="$store.state.guessStore.guesses.length && showSaveAll"
      :timeout="timeout"
      v-model="snackbar"
  >
    Salvar tudo
    <template v-slot:action="{ attrs }">
      <v-btn
        color="blue"
        text
        v-bind="attrs"
        @click="saveAll"
      >
        Salvar tudo
      </v-btn>
    </template>
  </v-snackbar>
  -->
</div>
</template>

<script>
export default {
  data () {
    return {
      dialogs: {
        search: false
      },
      id_game:null,
      games:[],
      disableSelectGame:false,
      showSaveAll:false,
      timeout:-1
      //,snackbar:true
    }
  },
  computed: {
    
  },
  methods: {
    search(e) {
      this.$store.dispatch('getGuesses',e).then().catch(err => {
        this.$store.commit('showSnackbar',err)
      })
      this.dialogs.search = false
      
    },
    searchGuess () {
      this.dialogs.search = true
    },
    saveAll(){
      this.$root.$emit('saveAllGuess') 
      this.showSaveAll=false  
    },
    cleanList(){
      this.$store.commit('cleanGuesses')
    }
  },
  components: {
    'dialog-search': require('./Dialogs/DialogSearchGuess').default
  },
  mounted() {
    this.$root.$on('showSaveAllGuess',()=>{
      this.showSaveAll=true
    })

    this.$store.dispatch('getActiveGamesUser',this.$store.state.userStore.loggedUser.id).then(resp=>{
      this.games = resp
      this.id_game=this.games[0].id
      if (this.games.length===1){
        this.disableSelectGame=true
      }
    }).catch(e => {
      this.$store.commit('showSnackbar',e)
    })
    
  }
}
</script>

<style>

</style>
