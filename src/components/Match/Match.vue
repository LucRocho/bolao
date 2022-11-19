<template>
  <div>
  <v-list-item
    class="white"
    :ripple="false"
    >
    <template v-slot:default>
        <v-list-item-content>
            <v-list-item-title v-if="!withoutMenu">
              <v-container>
                <v-row>
                  <v-col>
                    <v-img 
                    :src="match.team1Flag" 
                    max-height="30"
                    max-width="40"/>
                  </v-col>
                  <v-col>
                    {{match.team1Name}}
                  </v-col>
                  <v-col>
                    {{match.score_team1}}
                  </v-col>
                </v-row>
                <v-row>

                  <v-col>
                    <v-img 
                    :src="match.team2Flag" 
                    max-height="30"
                    max-width="40"/>
                  </v-col>
                  <v-col>
                    {{match.team2Name}}
                  </v-col>
                  <v-col>
                    {{match.score_team2}}
                  </v-col>
                </v-row>
              </v-container>
            </v-list-item-title>
            <v-list-item-title v-else>
              <v-container>
                <v-row>
                  <v-col>
                    <v-img 
                    :src="match.team1Flag" 
                    max-height="30"
                    max-width="40"/>
                  </v-col>
                  <v-col>
                    {{match.team1Name}}
                  </v-col>
                  <v-col>
                    <v-text-field 
                      class="pa-0 ma-0"
                      type="number" 
                      min="0" 
                      max="30" 
                      style="width: 40px"
                      @input="enableSave"
                      v-model="match.score_team1"/>
                  </v-col>
                  
                </v-row>
                <v-row>

                  <v-col>
                    <v-img 
                    :src="match.team2Flag" 
                    max-height="30"
                    max-width="40"/>
                  </v-col>
                  <v-col>
                    {{match.team2Name}}
                  </v-col>
                  <v-col>
                    <v-text-field 
                      class="pa-0 ma-0"
                      type="number" 
                      min="0" 
                      max="30" 
                      style="width: 40px"
                      @input="enableSave"
                      v-model="match.score_team2"/>
                  </v-col>
                  
                </v-row>
              </v-container>
            </v-list-item-title>
            <v-list-item-subtitle>
              {{(match.groupx?'Grupo: ' + match.groupx + ' - ': '')}}{{textStage(match.stage)}} - {{match.match_datetime | niceDate}}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              {{match.competitionName}}
            </v-list-item-subtitle>  
        </v-list-item-content>
        <v-list-item-action v-if="!withoutMenu">
            <match-menu
              :match = "match"
            />
        </v-list-item-action>
        <v-list-item-action v-else>
          <div v-if="showSave">
            <v-tooltip bottom >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  @click="saveScore"
                  color="primary"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-content-save</v-icon>
                </v-btn>
              </template>
              <span>Salvar esse placar</span>
            </v-tooltip>
          </div>
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
  props: ['match','withoutMenu'],
  filters: {

    niceDate (value) {
      const newDate = new Date(value)
      newDate.setHours(newDate.getHours()-3)
      return format(newDate, 'd MMM yyyy HH:mm', { locale: ptBR })
      //return format(newDate, 'd MMM yyyy HH:mm')
    }
    
  },
  components: {
    'match-menu': require('./MatchMenu').default
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
    },
    saveScore(){
      
      let newScore={
        idMatch:this.match.id,
        scoreTeam1:this.match.score_team1,
        scoreTeam2:this.match.score_team2,
        idUser:this.$store.state.userStore.loggedUser.id
      }
      //let formData=Util.object2FormData(payload,this.$store.state.userStore.loggedUser.id)
      this.$store.dispatch('updateScore',{ newScore })
        .then((resp)=>{
          this.$store.commit('showSnackbar',resp)
          this.showSave=false
        })
        .catch((e)=>{
          this.$store.commit('showSnackbar',e)
        })
        
          
    }
  }
}
</script>

