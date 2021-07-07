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
          <span class="text-h5 primary--text">Regras do Bolão: {{game.name}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6">
                <v-select
                  :items="list10"
                  label="Pontos para acerto do vencedor ou empate*"
                  :rules="[rules.required]"
                  item-text="name"
                  item-value="id"
                  v-model="currentObject.winner_tie_loser_points"
                ></v-select>
              </v-col>
              <v-col
              cols="12"
              sm="6">
                <v-select
                  :items="list10"
                  label="Pontos para acerto dos gols de um time*"
                  :rules="[rules.required]"
                  item-text="name"
                  item-value="id"
                  v-model="currentObject.team_score_points"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col
              cols="12"
              sm="4">
                <v-select
                  :items="list10"
                  label="Peso da fase de grupos*"
                  :rules="[rules.required]"
                  item-text="name"
                  item-value="id"
                  v-model="currentObject.stage1_weight"
                ></v-select>
              </v-col>
              <v-col
              cols="12"
              sm="4">
                <v-select
                  :items="list10"
                  label="Peso das oitavas-de-final*"
                  :rules="[rules.required]"
                  item-text="name"
                  item-value="id"
                  v-model="currentObject.stage2_weight"
                ></v-select>
              </v-col>
              <v-col
              cols="12"
              sm="4">
                <v-select
                  :items="list10"
                  label="Peso das quartas-de-final*"
                  :rules="[rules.required]"
                  item-text="name"
                  item-value="id"
                  v-model="currentObject.stage3_weight"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col
              cols="12"
              sm="4">
                <v-select
                  :items="list10"
                  label="Peso das semifinais*"
                  :rules="[rules.required]"
                  item-text="name"
                  item-value="id"
                  v-model="currentObject.stage4_weight"
                ></v-select>
              </v-col>
              <v-col
              cols="12"
              sm="4">
                <v-select
                  :items="list10"
                  label="Peso das finais*"
                  :rules="[rules.required]"
                  item-text="name"
                  item-value="id"
                  v-model="currentObject.stage5_weight"
                ></v-select>
              </v-col>
              
            </v-row>
            
            <v-row>
              <v-col
              cols="12"
              sm="4">
                <v-select
                  :items="list100"
                  label="Prêmio do vencedor*"
                  :rules="[rules.required,rules.percent100_1]"
                  item-text="name"
                  item-value="id"
                  v-model="currentObject.percent_first_prize"
                ></v-select>
              </v-col>
              <v-col
              cols="12"
              sm="4">
                <v-select
                  :items="list100"
                  label="Prêmio do segundo*"
                  :rules="[rules.required,rules.percent100_2]"
                  item-text="name"
                  item-value="id"
                  v-model="currentObject.percent_second_prize"
                ></v-select>
              </v-col>
              <v-col
              cols="12"
              sm="4">
                <v-select
                  :items="list100"
                  label="Prêmio do terceiro*"
                  :rules="[rules.required,rules.percent100_3]"
                  item-text="name"
                  item-value="id"
                  v-model="currentObject.percent_third_prize"
                ></v-select>
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
      currentObject: {},
      rules: {
        required: value => !!value || 'Preenchimento obrigatório',
        percent100_1: value => (value + 
                              this.currentObject.percent_second_prize + 
                              this.currentObject.percent_third_prize) == 100 || 'A soma dos prêmios deve ser 100%',
        percent100_2: value => (value + 
                              this.currentObject.percent_first_prize + 
                              this.currentObject.percent_third_prize) == 100 || 'A soma dos prêmios deve ser 100%',
        percent100_3: value => (value + 
                              this.currentObject.percent_first_prize + 
                              this.currentObject.percent_second_prize) == 100 || 'A soma dos prêmios deve ser 100%'
      },
      list10:[],
      list100:[]
    }
  },
  components: {
    
  },
  mounted () {
    for (var i = 1; i <= 10; i++) {
      this.list10.push({id:i,name:i})
    }
    for (var j = 0; j <= 100; j++) {
      this.list100.push({id:j,name:j.toString()+'%'})
    }
    this.getGame()
  },
  methods: {
    saveGame () {
      if (this.$refs.form.validate()) {
        let formData=Util.object2FormData(this.currentObject,this.$store.state.userStore.loggedUser.id)
        this.$store.dispatch('saveGame',{ formData: formData, savedGame: this.currentObject, modeCreate: false})
        .then((resp)=>{
          this.$store.commit('showSnackbar',resp)
          this.$emit('close')
          this.$vuetify.goTo(0, { duration: 0 })
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
