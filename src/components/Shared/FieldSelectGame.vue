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
      :disabled="disableSelectGame"
      @change="changeGame"
    ></v-select>

    
  </v-row>
  
</div>
</template>

<script>
export default {
  data () {
    return {
      id_game:null,
      games:[],
      disableSelectGame:false
    }
  },
  computed: {
    
  },
  methods: {
    changeGame(){
      //console.log(this.id_game)
      this.$emit('idGameChanged',this.id_game)
    }
  },
  components: {
    
  },
  mounted() {
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
