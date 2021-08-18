<template>

  <v-row justify="center">
    <v-dialog
      :value = "true"
      persistent
      max-width="600px"
      transition="dialog-bottom-transition"
    >
    <v-form ref="form" lazy-validation @submit.prevent="saveMatch">
      <v-card>
        <v-card-title>
          <span class="text-h5 primary--text">{{ (modeCreate?'Nova Partida':'Alteração de Partida') }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
              cols="12"
              sm="4">
                <v-select
                  :items="competitions"
                  label="Competição*"
                  :rules="[rules.required]"
                  item-text="name"
                  item-value="id"
                  v-model="currentObject.id_competition"
                  @change="updateTeams"
                ></v-select>
              </v-col>
              <v-col
              cols="12"
              sm="4">
                <v-select
                  :items="teams"
                  label="Equipe 1*"
                  :rules="[rules.required, rules.differentTeams1]"
                  item-text="name"
                  item-value="id"
                  v-model="currentObject.id_team1"
                ></v-select>
              </v-col>
              <v-col
              cols="12"
              sm="4">
                <v-select
                  :items="teams"
                  label="Equipe 2*"
                  :rules="[rules.required, rules.differentTeams2]"
                  item-text="name"
                  item-value="id"
                  v-model="currentObject.id_team2"
                ></v-select>
              </v-col>
            </v-row>
            
            <v-row>
              <v-col
              cols="12"
              sm="4">
                <v-select
                  :items="stages"
                  label="Fase*"
                  :rules="[rules.required]"
                  item-text="name"
                  item-value="id"
                  v-model="currentObject.stage"
                ></v-select>
              </v-col>
              <v-col
              cols="12"
              sm="4">
                <v-select
                  :items="groups"
                  label="Grupo*"
                  item-text="name"
                  item-value="id"
                  v-model="currentObject.groupx"
                ></v-select>
              </v-col>
              <v-col
              cols="12"
              sm="4">
                <v-datetime-picker 
                  label="Data/hora*" 
                  v-model="dateTime"
                  date-format="dd/MM/yyyy"
                >
                    <template slot="dateIcon">
                      <v-icon>mdi-calendar</v-icon>
                    </template>
                    <template slot="timeIcon">
                      <v-icon>mdi-clock</v-icon>
                    </template> 
                </v-datetime-picker>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <v-checkbox
                v-if="modeCreate"
                v-model="dontCloseAfterNew">
                  <template v-slot:label>
                    <div class="primary--text font-italic">
                      Permanecer nessa tela após a inclusão
                    </div>
                  </template>
                </v-checkbox>
              </v-col>
            </v-row>
            
          </v-container>
          <small>*Indica campo obrigatório</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="$emit('close')"
          >
            Cancelar
          </v-btn>
          <v-btn
            type="submit"
            color="red darken-1"
            text
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-dialog>
  </v-row>
  
</template>

<script>
import Util from '../../../dataServices/helper/util'
import { format } from 'date-fns'
//import { ptBR } from 'date-fns/locale'
export default {
  props: ['match'],
  data () {
    return {
      currentObject: {
          id: '',
          id_competition: '',
          id_team1: '',
          id_team2: '',
          score_team1:0,
          score_team2:0,
          match_datetime:'',
          stage:'',
          groupx:'',
          competitionName:'',
          team1Name:'',
          team1Flag:'',
          team2Name:'',
          team2Flag:''
      },
      dateTime:null,
      modeCreate: false,
      dontCloseAfterNew: false,
      rules: {
        required: value => !!value || 'Preenchimento obrigatório',
        differentTeams1: value => value != this.currentObject.id_team2 || 'As equipes devem ser distintas',
        differentTeams2: value => value != this.currentObject.id_team1 || 'As equipes devem ser distintas'
      },
      competitions:[],
      teams:[],
      stages:[  {id:1,name:'Fase de grupos'},
                {id:2,name:'Oitavas-de-final'},
                {id:3,name:'Quartas-de-final'},
                {id:4,name:'Semifinal'},
                {id:5,name:'Final'}
              ],
      groups:[  {id:'',name:'Sem grupo'},
                {id:'A',name:'Grupo A'},
                {id:'B',name:'Grupo B'},
                {id:'C',name:'Grupo C'},
                {id:'D',name:'Grupo D'},
                {id:'E',name:'Grupo E'},
                {id:'F',name:'Grupo F'},
                {id:'G',name:'Grupo G'},
                {id:'H',name:'Grupo H'},
                {id:'I',name:'Grupo I'},
                {id:'J',name:'Grupo J'},
                {id:'K',name:'Grupo K'},
                {id:'L',name:'Grupo L'}]
    }
  },
  components: {
    
  },
  mounted () {
    if (this.match) {
      this.modeCreate = false
    }
    else {
      this.modeCreate = true
      this.dateTime=null
    }
    this.$store.dispatch('getAllCompetitions').then(resp=>{
      this.competitions = resp
      if (this.modeCreate){
        this.currentObject.id_competition=this.$store.state.competitionStore.activeCompetition.id
      }
      
      if (!this.modeCreate){
        this.getMatch()
      }
      this.updateTeams()
      
    }).catch(e => {
      this.$store.commit('showSnackbar',e)
    })

    /*
    this.$store.dispatch('getAllTeams').then(resp=>{
      this.teams = resp
    }).catch(e => {
      this.$store.commit('showSnackbar',e)
    })
    */
  },

  methods: {
    saveMatch () {
      if (!this.dateTime){
        this.$store.commit('showSnackbar','Preencha a data e hora da partida')
      }
      if (this.$refs.form.validate() && this.dateTime) {
        const newDate = new Date(this.dateTime)
        const strDateTime=format(newDate, 'yyyy-MM-dd HH:mm')
        this.currentObject.match_datetime=strDateTime
        let formData=Util.object2FormData(this.currentObject,this.$store.state.userStore.loggedUser.id)
        
        this.$store.dispatch('saveMatch',{ formData: formData, savedMatch: this.currentObject, modeCreate: this.modeCreate})
        .then((resp)=>{
          this.$store.commit('showSnackbar',resp)
          if (this.modeCreate && this.dontCloseAfterNew) {
            this.$refs.form.resetValidation()
            this.currentObject = {
              id: '',
              id_competition: this.$store.state.competitionStore.activeCompetition.id,
              id_team1: '',
              id_team2: '',
              score_team1:0,
              score_team2:0,
              match_datetime:'',
              stage:'',
              groupx:'',
              competitionName:'',
              team1Name:'',
              team1Flag:'',
              team2Name:'',
              team2Flag:''
            }
            this.dateTime=null
            
          } else {
            this.$emit('close')
            this.$vuetify.goTo(0, { duration: 0 })
          } 
        }).catch(e => {
          this.$store.commit('showSnackbar',e)
        })
      }
    },

    getMatch() {
      let matchCopy = Object.assign({}, this.match)
      this.currentObject = matchCopy

      const newDate = new Date(matchCopy.match_datetime)
      newDate.setHours(newDate.getHours()-2)
      const strDateTime=format(newDate, 'dd/MM/yyyy HH:mm')
      this.dateTime=strDateTime
      
      
    },

    updateTeams() {
      this.$store.dispatch('getTeamsCompetition',this.currentObject.id_competition).then(resp=>{
        this.teams = resp
      }).catch(e => {
        this.$store.commit('showSnackbar',e)
      })
    }

  }
}
</script>

<style>

</style>
