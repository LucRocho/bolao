<template>
  <div>
  <v-list-item
    class="white"
    :ripple="false"
    >
    <template v-slot:default>
        <v-list-item-content>
            
            <v-list-item-title :class="textColorGuess">
              <v-container>
                <v-row>
                  <v-col>
                    <v-img 
                    :src="guess.team1Flag" 
                    max-height="30"
                    max-width="40"/>
                  </v-col>
                  <v-col v-if="started" :class="(guess.score_team1==guess.guess_team1?'font-weight-black':'font-weight-normal')">
                    {{guess.team1Name}}({{guess.score_team1}})
                  </v-col>
                  <v-col v-else>
                    {{guess.team1Name}}
                  </v-col>
                  <v-col>
                    <v-text-field 
                      class="pa-0 ma-0"
                      type="number" 
                      min="0" 
                      max="30" 
                      style="width: 40px"
                      :disabled="started"
                      @input="enableSave"
                      v-model="guess.guess_team1"/>
                  </v-col>
                  
                </v-row>
                <v-row>

                  <v-col>
                    <v-img 
                    :src="guess.team2Flag" 
                    max-height="30"
                    max-width="40"/>
                  </v-col>
                  <v-col v-if="started"  :class="(guess.score_team2==guess.guess_team2?'font-weight-black':'font-weight-normal')">
                    {{guess.team2Name}}({{guess.score_team2}})
                  </v-col>
                  <v-col v-else>
                    {{guess.team2Name}}
                  </v-col>
                  <v-col>
                    <v-text-field 
                      class="pa-0 ma-0"
                      type="number" 
                      min="0" 
                      max="30" 
                      style="width: 40px"
                      :disabled="started"
                      @input="enableSave"
                      v-model="guess.guess_team2"/>
                  </v-col>
                  
                </v-row>
              </v-container>
            </v-list-item-title>
            <v-list-item-subtitle>
              {{(guess.groupx?'Grupo: ' + guess.groupx + ' - ': '')}}{{textStage(guess.stage)}} - {{guess.match_datetime | niceDate}}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{guess.competitionName}} - Bolão: {{guess.gameName}}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              Pontos: {{(started?guessPoints:'Partida não iniciada')}}
            </v-list-item-subtitle>  
        </v-list-item-content>
        <v-list-item-action v-if="showSave">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                icon
                @click="saveScore(true)"
                color="primary"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-content-save</v-icon>
              </v-btn>
            </template>
            <span>Salvar esse palpite</span>
          </v-tooltip>
        </v-list-item-action>
        
    </template>
  </v-list-item>
  <v-divider />
  </div>
</template>

<script>
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
//import Util from '../../dataServices/helper/util'
export default {
  data () {
    return {
      showSave:false
    }
  },
  props: ['guess'],
  computed: {
    started: function() {
      const newDate = new Date(this.guess.match_datetime)
      newDate.setHours(newDate.getHours()-2)
      return (format(newDate,'yyyy-MM-dd HH:mm')<=format(Date.now(),'yyyy-MM-dd HH:mm'))
    }
    ,
    matchResult:function(){
      if(this.guess.score_team1-this.guess.score_team2>0){
        return 'WT1'
      } else if (this.guess.score_team1-this.guess.score_team2<0){
        return 'WT2'
      } else{
        return 'T'
      }
    },
    guessResult:function(){
      if(this.guess.guess_team1-this.guess.guess_team2>0){
        return 'WT1'
      } else if (this.guess.guess_team1-this.guess.guess_team2<0){
        return 'WT2'
      } else{
        return 'T'
      }
    },
    goodGuess:function(){
      return (this.guessResult==this.matchResult)
    },
    textColorGuess:function(){
      let textColor='black--text'
      if (this.started){
        if (this.goodGuess){
          textColor='green--text'
        }
        else{
          textColor='red--text'
        }
      }
      return textColor
    },
    guessPoints:function(){
      let total = 0
      if (this.goodGuess){
        total+=this.guess.winner_tie_loser_points
      }
      if (this.guess.score_team1==this.guess.guess_team1){
        total+=this.guess.team_score_points
      }
      if (this.guess.score_team2==this.guess.guess_team2){
        total+=this.guess.team_score_points
      }
      switch (this.guess.stage) {
        case 1 :
          total=total*this.guess.stage1_weight
          break;
        case 2 :
          total=total*this.guess.stage2_weight
          break;
        case 3 :
          total=total*this.guess.stage3_weight
          break;
        case 4 :
          total=total*this.guess.stage4_weight
          break;
        case 5 :
          total=total*this.guess.stage5_weight
          break;
        
        default:
          total=0
      }
      if (!this.started){
        total=0
      }
      return total
    }
  },
  filters: {
    niceDate (value) {
      const newDate = new Date(value)
      newDate.setHours(newDate.getHours()-2)
      return format(newDate, 'd MMM yyyy HH:mm', { locale: ptBR })
    }
  },
  mounted() {
    this.$root.$on('saveAllGuess',()=>{
      if (this.showSave){
        this.saveScore(false)
        this.$store.commit('showSnackbar','Palpites salvos')
      }
    })
  },
  components: {
    
  },
  methods: {
    textStage(idStage) {
      let text=''
      switch (idStage) {
      case 1:
        text = 'Fase de grupos'
        break;
      case 2:
        text = 'Oitavas-de-final'
        break;
      case 3:
        text = 'Quartas-de-final'
        break;
      case 4:
        text = 'Semifinal'
        break;  
      case 5:
        text = 'Final'
        break;
      default:
        text='Sem fase'
      }

      return text
    },
    enableSave(){
      this.showSave=true
      this.$root.$emit('showSaveAllGuess') 
    },
    saveScore(showMessage){
      
      let newScore={
        idGuess:this.guess.idGuess,
        guessTeam1:this.guess.guess_team1,
        guessTeam2:this.guess.guess_team2,
        idUser:this.$store.state.userStore.loggedUser.id
      }
      this.$store.dispatch('updateGuess',{ newScore })
        .then((resp)=>{
          if (showMessage){
            this.$store.commit('showSnackbar',resp)
          }
          this.showSave=false
        })
        .catch((e)=>{
          this.$store.commit('showSnackbar',e)
        })
        
          
    }
  }
}
</script>

