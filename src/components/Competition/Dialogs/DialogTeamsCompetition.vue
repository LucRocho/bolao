<template>

<v-row justify="center">
<v-dialog
    :value = "true"
    persistent
    max-width="600px"
    transition="dialog-bottom-transition"
>

    <v-form ref="form" lazy-validation @submit.prevent="saveTeams">
      <v-card>
        <v-card-title>
          <span class="text-h5 primary--text">Cadastro de equipes participantes</span>
        </v-card-title>
        <v-card-subtitle>
          <span class="text-h6 primary--text">{{competition.name}}</span>
        </v-card-subtitle>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                    <v-list
                        
                        class="pt-0"
                        dense
                    >
                        <v-subheader>Equipes disponíveis</v-subheader>
                        <draggable v-model="availableTeams" :options="{group:'teams'}">
                            <team
                                v-for="team in availableTeams"
                                :key="team.id"
                                :team="team"
                                :withoutMenu="true"
                            />
                        </draggable>
                        
                    </v-list>
              </v-col>
              <v-col cols="12" sm="6">
                    <v-list
                        
                        class="pt-0"
                        dense
                    >
                        <v-subheader>Equipes na competição</v-subheader>
                        <draggable v-model="competitionTeams" :options="{group:'teams'}">
                            <team
                                v-for="team in competitionTeams"
                                :key="team.id"
                                :team="team"
                                :withoutMenu="true"
                            />
                        </draggable>
                        
                    </v-list>
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
            Salvar
            </v-btn>
        </v-card-actions>
      </v-card>
    </v-form>
  
</v-dialog>
</v-row>

</template>

<script>
import draggable from 'vuedraggable'
import Util from '../../../dataServices/helper/util'
export default {
    data: () => ({
      competitionTeams:[],
      availableTeams:[]
    }),
    props: ['competition'],
    components: {
        team: require('./../../Team/Team').default,
        draggable
    },
    methods: {
        saveTeams(){
            //console.log(this.getSelectedTeams())
            //console.log(this.competitionTeams)
            const objTeamsCompetition = {
                competitionId:this.competition.id,
                stringSelectedTeams : this.getSelectedTeams()
            }
            let formData=Util.object2FormData(objTeamsCompetition,this.$store.state.userStore.loggedUser.id)
            this.$store.dispatch('saveTeamsCompetition',{ formData: formData})
            .then((resp)=>{
                this.$store.commit('showSnackbar',resp)
                this.$emit('close')
            }).catch(e => {
                this.$store.commit('showSnackbar',e)
            })

        },
        getSelectedTeams() {
            let strTeams=""
            this.competitionTeams.forEach((team)=> {
                strTeams+=team.id + ","
            });
            if (strTeams!=""){
                strTeams=strTeams.substring(0,strTeams.length-1)
            }
            return strTeams
        }
    },
    mounted () {

        this.$store.dispatch('getTeamsCompetition',this.competition.id)
        .then((resp)=>{
          this.competitionTeams=resp
          
        }).catch(e => {
          this.$store.commit('showSnackbar',e)
        })

        this.$store.dispatch('getAvailableTeamsCompetition',this.competition.id)
        .then((resp)=>{
          this.availableTeams=resp
          
        }).catch(e => {
          this.$store.commit('showSnackbar',e)
        })
    }
  
}
</script>

<style scoped>
.v-list{
  height:400px;/* or any height you want */
  overflow-y:auto
}
</style>