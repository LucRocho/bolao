<template>

  <v-row justify="center">
    <v-dialog
      :value = "true"
      persistent
      max-width="600px"
      transition="dialog-bottom-transition"
    >
    <v-form ref="form" lazy-validation @submit.prevent="searchMatch">
      <v-card>
        <v-card-title>
          <span class="text-h6 primary--text">Pesquisa de Partida</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
              cols="12"
              sm="6">
                <v-select
                  :items="competitions"
                  label="Competição"
                  item-text="name"
                  item-value="id"
                  v-model="id_competition"
                  @change="updateTeams"
                  dense
                ></v-select>
              </v-col>
              <v-col
              cols="12"
              sm="6">
                <v-select
                  :items="teams"
                  label="Equipe"
                  item-text="name"
                  item-value="id"
                  v-model="id_team"
                  dense
                ></v-select>
              </v-col>
              <v-col
              cols="12"
              sm="6">
                <v-select
                  :items="stages"
                  label="Fase"
                  item-text="name"
                  item-value="id"
                  v-model="stage"
                  dense
                ></v-select>
              </v-col>
              <v-col
              cols="12"
              sm="6">
                <v-select
                  :items="groups"
                  label="Grupo"
                  item-text="name"
                  item-value="id"
                  v-model="groupx"
                  dense
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-text-field
                  v-model="dateRangeText"
                  label="Período*"
                  prepend-icon="mdi-calendar"
                  append-icon="mdi-delete-sweep"
                  readonly
                  @click:append="dates=[]"
                  dense
                  
                ></v-text-field>
                
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-date-picker
                  v-model="dates"
                  range
                  locale="pt-BR"
                  dense
                ></v-date-picker>
              </v-col>
            </v-row>
          </v-container>
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
            Pesquisar
          </v-btn>
        </v-card-actions>
      </v-card>
      </v-form>
    </v-dialog>
  </v-row>
  
</template>

<script>
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
export default {
  data () {
    return {
      id_team:null,
      id_competition:null,
      stage:null,
      groupx:null,
      competitions:[],
      teams:[],
      dates:[],
      stages:[  {id:null,name:'Qualquer'},
                {id:1,name:'Fase de grupos'},
                {id:2,name:'Oitavas-de-final'},
                {id:3,name:'Quartas-de-final'},
                {id:4,name:'Semifinal'},
                {id:5,name:'Final'}
              ],
      groups:[  {id:null,name:'Qualquer'},
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
    this.$store.dispatch('getAllCompetitions').then(resp=>{
      this.competitions = resp
      this.id_competition=this.$store.state.competitionStore.activeCompetition.id
      this.updateTeams()
    }).catch(e => {
      this.$store.commit('showSnackbar',e)
    })

    /*
    this.$store.dispatch('getAllTeams').then(resp=>{
      this.teams = resp
      this.teams.unshift({id:null,name:'Qualquer'})
    }).catch(e => {
      this.$store.commit('showSnackbar',e)
    })
    */
    
    
    
  },
  computed: {
    dateRangeText () {
      if (this.dates.length===0){
        return 'Qualquer'
      }
      else{
        let date1 = new Date(this.dates[0])
        date1.setHours(date1.getHours() + 3)
        format(new Date(this.dates[0]),'d MMM yyyy', { locale: ptBR })
        if (this.dates.length===1){
          return format(date1,'d MMM yyyy', { locale: ptBR })  
        }
        let date2 = new Date(this.dates[1])
        date2.setHours(date2.getHours() + 3)
        return format(date1,'d MMM yyyy', { locale: ptBR }) + ' a ' + format(date2,'d MMM yyyy', { locale: ptBR })
      }
      
    },
  },
  methods: {
    
    searchMatch() {
      let searchObj = {
        competitionId:this.id_competition,
        teamId:this.id_team,
        stage:this.stage,
        groupx:this.groupx
      }
      if (this.dates.length>0){
        if (this.dates.length==1){
          searchObj = { ...searchObj, date: this.dates[0]}
        }else{
          if (this.dates[0].toString()<this.dates[1].toString()) {
            searchObj = { ...searchObj, startDate: this.dates[0]}
            searchObj = { ...searchObj, endDate: this.dates[1]}
          } else{
            searchObj = { ...searchObj, startDate: this.dates[1]}
            searchObj = { ...searchObj, endDate: this.dates[0]}
          }
        }
      }
      //console.log(searchObj)

      this.$emit('searched',searchObj)
    },

    updateTeams() {
      
      this.$store.dispatch('getTeamsCompetition',this.id_competition).then(resp=>{
        this.teams = resp
        this.teams.unshift({id:null,name:'Qualquer'})
      }).catch(e => {
        this.$store.commit('showSnackbar',e)
      })
      
    }
  }
}
</script>

<style>

</style>
