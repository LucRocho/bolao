<template>
  <div>
    <p class="text-h6 text-center primary--text mb-0 mt-2" >
      <v-icon color="primary">mdi-cash-multiple</v-icon> - Premiação e Regras
    </p>
    <field-select-game @idGameChanged="changeGame" />
    <v-container>
      <v-row>
        <v-col
          cols="12"
          sm="4">
          <span>Valor individual: </span>
          <span class="font-weight-black font-italic primary--text">R${{values.individualValue}}</span>
        </v-col>
        <v-col
          cols="12"
          sm="4">
          Quantidade de participantes: <span class=" primary--text font-weight-black font-italic">{{values.amount}}</span>
        </v-col>
        <v-col
          cols="12"
          sm="4">
          Total arrecadado: <span class="primary--text font-weight-black font-italic">R${{values.totalPrize.toFixed(2)}}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="4">
          Primeiro prêmio: <span class="primary--text font-weight-black font-italic">R${{values.firstPrize.toFixed(2)}} ({{values.percentFirstPrize.toFixed(2)}}%)</span>
        </v-col>
        <v-col
          cols="12"
          sm="4">
          Segundo prêmio: <span class="primary--text font-weight-black font-italic">R${{values.secondPrize.toFixed(2)}} ({{values.percentSecondPrize.toFixed(2)}}%)</span>
        </v-col>
        <v-col
          cols="12"
          sm="4">
          Terceiro prêmio: <span class="primary--text font-weight-black font-italic">R${{values.thirdPrize.toFixed(2)}} ({{values.percentThirdPrize.toFixed(2)}}%)</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          Pontos por acerto do vencedor ou empate: <span  class="primary--text font-weight-black font-italic">{{values.winnerPoints}}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          Pontos por acerto de número de gols de uma equipe: <span  class="primary--text font-weight-black font-italic">{{values.goalsPoints}}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="4">
          Peso da fase de grupos: <span class="primary--text font-weight-black font-italic">{{values.stage1Weight}}</span>
        </v-col>
        <v-col
          cols="12"
          sm="4">
          Peso das oitavas-de-final: <span class="primary--text font-weight-black font-italic">{{values.stage2Weight}}</span>
        </v-col>
        <v-col
          cols="12"
          sm="4">
          Peso das quartas-de-final: <span class="primary--text font-weight-black font-italic">{{values.stage3Weight}}</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          cols="12"
          sm="4">
          Peso das semifinais: <span class="primary--text font-weight-black font-italic">{{values.stage4Weight}}</span>
        </v-col>
        <v-col
          cols="12"
          sm="4">
          Peso das finais: <span class="primary--text font-weight-black font-italic">{{values.stage5Weight}}</span>
        </v-col>
        
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Prize',
  data() {
     return {
        values:{
          amount:0,
          individualValue:0,
          totalPrize:0,
          percentFirstPrize:0,
          firstPrize:0,
          percentSecondPrize:0,
          secondPrize:0,
          percentThirdPrize:0,
          thirdPrize:0,
          stage1Weight:0,
          stage2Weight:0,
          stage3Weight:0,
          stage4Weight:0,
          stage5Weight:0,
          goalsPoints:0,
          winnerPoints:0
        }
      }
  },
  components: {
    'field-select-game': require('./../components/Shared/FieldSelectGame').default    
  },
  methods:{
    changeGame(idGame){
     this.$store.dispatch('getGameValues',idGame)
      .then(response=>{
        this.values=response
      }).catch((e)=>{
          this.$store.commit('showSnackbar',e)
      })
      
    }
  },
  mounted () {
    
    this.$store.dispatch('getActiveGamesUser',this.$store.state.userStore.loggedUser.id).then(resp=>{
        let games = resp
        let idGame=games[0].id
        this.$store.dispatch('getGameValues',idGame)
        .then(response=>{
          this.values=response
        }).catch((e)=>{
            this.$store.commit('showSnackbar',e)
        })
        
      }).catch(e => {
        this.$store.commit('showSnackbar',e)
      })
      
  }
}
</script>