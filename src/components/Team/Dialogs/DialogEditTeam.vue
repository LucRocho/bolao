<template>

  <v-row justify="center">
    <v-dialog
      :value = "true"
      persistent
      max-width="600px"
      transition="dialog-bottom-transition"
    >
    <v-form ref="form" lazy-validation @submit.prevent="saveTeam">
      <v-card>
        <v-card-title>
          <span class="text-h5 primary--text">{{ (modeCreate?'Nova Equipe':'Alteração de Equipe') }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col>
                <v-text-field
                  label="Nome*"
                  :rules="[rules.required]"
                  v-model="currentObject.name"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col>
                <image-selector
                  :message="imageComponentText"
                  @imageLoaded="updateImage"
                />
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
import Util from './../../../dataServices/helper/util'
export default {
  props: ['team'],
  data () {
    return {
      currentObject: {
          id: '',
          name: '',
          flag:''
      },
      modeCreate: false,
      imageFile: null,
      dontCloseAfterNew: false,
      imageComponentText: 'Selecione uma imagem para a equipe',
      rules: {
        required: value => !!value || 'Preenchimento obrigatório',
      }
    }
  },
  components: {
    'image-selector': require('./../../Shared/ImageSelector').default
  },
  mounted () {
    if (this.team) {
      this.modeCreate = false
    }
    else {
      this.modeCreate = true
    }
    if (!this.modeCreate){
      this.getTeam()
    }
  },
  methods: {
    saveTeam () {
      if (this.$refs.form.validate()) {
        let formData=Util.object2FormData(this.currentObject,this.$store.state.userStore.loggedUser.id)
        if (this.imageFile) {
          formData.set('flag',this.imageFile,this.currentObject.flag)
        }
        this.$store.dispatch('saveTeam',{ formData: formData, savedTeam: this.currentObject, modeCreate: this.modeCreate})
        .then((resp)=>{
          this.$store.commit('showSnackbar',resp)
          if (this.modeCreate && this.dontCloseAfterNew) {
            this.$root.$emit('cleanImage')
            this.$refs.form.resetValidation()
            this.currentObject = {
              id: '',
              name: '',
              flag:''
            }
            this.imageFile = null
          } else {
            this.$emit('close')
            this.$vuetify.goTo(0, { duration: 0 })
          } 
        }).catch(e => {
          this.$store.commit('showSnackbar',e)
        })
      }
    },

    getTeam() {
      let teamCopy = Object.assign({}, this.team)
      this.currentObject = teamCopy
      this.$root.$emit('loadImage',this.currentObject.flag)
    },

    updateImage(fileName, imageFile) {
      this.currentObject.flag = fileName
      this.imageFile = imageFile
    }
  }
}
</script>

<style>

</style>
