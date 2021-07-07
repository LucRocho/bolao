<template>

  <v-row justify="center">
    <v-dialog
      :value = "true"
      persistent
      max-width="600px"
      transition="dialog-bottom-transition"
    >
    <v-form ref="form" lazy-validation @submit.prevent="saveGame">
      <v-card>
        <v-card-title>
          <span class="text-h5 primary--text">{{ (modeCreate?'Novo Bolão':'Alteração de Bolão') }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="12">
                <v-text-field
                  label="Nome*"
                  :rules="[rules.required]"
                  v-model="currentObject.name"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col
              cols="12"
              sm="6">
                <v-select
                  :items="competitions"
                  label="Competição*"
                  :rules="[rules.required]"
                  item-text="name"
                  item-value="id"
                  v-model="currentObject.id_competition"
                ></v-select>
              </v-col>
              <v-col
              cols="12"
              sm="6">
                <v-select
                  :items="users"
                  label="Usuário responsável*"
                  :rules="[rules.required]"
                  item-text="name"
                  item-value="id"
                  v-model="currentObject.id_responsible_user"
                ></v-select>
              </v-col>
              
            </v-row>
            
            <v-row>
              <v-col
              cols="12"
              sm="6">
                <v-text-field
                  label="Valor indiviual*"
                  :rules="[rules.required]"
                  type="number"
                  min=1
                  max=1000
                  v-model="currentObject.individual_value"
                ></v-text-field>
              </v-col>
              <v-col
              cols="12"
              sm="6">
                <v-checkbox
                  v-model="currentObject.active"
                  label="Bolão Ativo"
                ></v-checkbox>
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
export default {
  props: ['game'],
  data () {
    return {
      currentObject: {
          id: '',
          name: '',
          id_competition: '',
          id_responsible_user: '',
          individual_value: '',
          competitionName:'',
          responsibleUserName:'',
          competitionLogo:'',
          winner_tie_loser_points:3,
          team_score_points:1,
          stage1_weight:1,
          stage2_weight:2,
          stage3_weight:3,
          stage4_weight:4,
          stage5_weight:5,
          percent_first_prize:70,
          percent_second_prize:20,
          percent_third_prize:10,
          active:1
      },
      modeCreate: false,
      dontCloseAfterNew: false,
      rules: {
        required: value => !!value || 'Preenchimento obrigatório',
      },
      competitions:[],
      users:[]
    }
  },
  components: {
    
  },
  mounted () {
    if (this.game) {
      this.modeCreate = false
    }
    else {
      this.modeCreate = true
    }
    this.$store.dispatch('getAllCompetitions').then(resp=>{
      this.competitions = resp
      if (this.modeCreate){
        this.currentObject.id_competition=this.$store.state.competitionStore.activeCompetition.id
      }
      else{
        this.getGame()
      }
    }).catch(e => {
      this.$store.commit('showSnackbar',e)
    })
    this.$store.dispatch('getAllUsers').then(resp=>{
      this.users = resp
    }).catch(e => {
      this.$store.commit('showSnackbar',e)
    })
    
    
    
  },
  methods: {
    saveGame () {
      if (this.$refs.form.validate()) {
        let formData=Util.object2FormData(this.currentObject,this.$store.state.userStore.loggedUser.id)
        this.$store.dispatch('saveGame',{ formData: formData, savedGame: this.currentObject, modeCreate: this.modeCreate})
        .then((resp)=>{
          this.$store.commit('showSnackbar',resp)
          if (this.modeCreate && this.dontCloseAfterNew) {
            this.$refs.form.resetValidation()
            this.currentObject = {
                id: '',
                name: '',
                id_competition: this.$store.state.competitionStore.activeCompetition.id,
                id_responsible_user: '',
                individual_value: '',
                competitionName:'',
                responsibleUserName:'',
                competitionLogo:'',
                winner_tie_loser_points:3,
                team_score_points:1,
                stage1_weight:1,
                stage2_weight:2,
                stage3_weight:3,
                stage4_weight:4,
                stage5_weight:5,
                percent_first_prize:70,
                percent_second_prize:20,
                percent_third_prize:10,
                active:1
            }
            
            
          } else {
            this.$emit('close')
            this.$vuetify.goTo(0, { duration: 0 })
          } 
        }).catch(e => {
          this.$store.commit('showSnackbar',e)
        })
      }
    },

    getGame() {
      let gameCopy = Object.assign({}, this.game)
      this.currentObject = gameCopy

    }
  }
}
</script>

<style>

</style>
