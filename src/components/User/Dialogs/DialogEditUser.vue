<template>

  <v-row justify="center">
    <v-dialog
      :value = "true"
      persistent
      max-width="600px"
      transition="dialog-bottom-transition"
    >
    <v-form ref="form" lazy-validation @submit.prevent="saveUser">
      <v-card>
        <v-card-title>
          <span class="text-h5 primary--text">{{ (modeCreate?'Novo Usuário':'Alteração de Usuário') }}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Nome*"
                  :rules="[rules.required]"
                  v-model="currentObject.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="e-Mail*"
                  :rules="[rules.required, rules.email]"
                  v-model="currentObject.email"
                ></v-text-field>
              </v-col>
              <v-col
                v-if="modeCreate" 
                cols="12"
              >
                <v-text-field
                  v-model="currentObject.password"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  :rules="[rules.required, rules.min]"
                  :type="showPassword ? 'text' : 'password'"
                  label="Senha*"
                  hint="No mínimo 8 caracteres"
                  counter
                  @click:append="showPassword = !showPassword"
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-checkbox
                  v-model="currentObject.administrator"
                  label="Administrador"
                ></v-checkbox>
              </v-col>
              <v-col cols="12" sm="6">
                <v-checkbox
                  v-model="currentObject.active"
                  label="Ativo"
                ></v-checkbox>
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
import Util from '../../../dataServices/helper/util'
export default {
  props: ['user'],
  data () {
    return {
      currentObject: {
          id: '',
          name:'' ,
          photo:'',
          email:'',
          administrator: 0,
          active: 1,
          password: ''
      },
      modeCreate: false,
      imageFile: null,
      dontCloseAfterNew: false,
      imageComponentText: 'Selecione uma imagem para o usuário',
      showPassword: false,
      rules: {
        required: value => !!value || 'Preenchimento obrigatório',
        min: v => v.length >= 8 || 'Mínimo de 8 caracteres',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'e-Mail inválido.'
        }
      }

    }
  },
  components: {
    'image-selector': require('./../../Shared/ImageSelector').default
  },
  mounted () {
    if (this.user) {
      this.modeCreate = false
      this.getUser()
    }
    else {
      this.modeCreate = true
    }
    
  },
  methods: {
    saveUser () {
      if (this.$refs.form.validate()) {
        let formData=Util.object2FormData(this.currentObject,this.$store.state.userStore.loggedUser.id)
        if (this.imageFile) {
          formData.set('photo',this.imageFile,this.currentObject.photo)
        }
        this.$store.dispatch('saveUser',{ formData: formData, savedUser: this.currentObject, modeCreate: this.modeCreate})
        .then((resp)=>{
          this.$store.commit('showSnackbar',resp)
          if (this.modeCreate && this.dontCloseAfterNew) {
            this.$root.$emit('cleanImage')
            this.$refs.form.resetValidation()
            this.currentObject = {
                  id: '',
                  name: '',
                  photo:'',
                  email:'',
                  administrator: 0,
                  active: 1,
                  password: ''
              }
            this.imageFile = null
          } else {
            if (this.currentObject.id == this.$store.state.userStore.loggedUser.id) {
              this.$store.commit('setLoggedUser',this.currentObject)
            }
            this.$emit('close')
            this.$vuetify.goTo(0, { duration: 0 })
          }
        }).catch(e => {
          this.$store.commit('showSnackbar',e)
        })
      }
    },

    getUser() {
      let userCopy = Object.assign({}, this.user)
      this.currentObject = userCopy
      this.$root.$emit('loadImage',this.currentObject.photo)
      
    },

    updateImage(fileName, imageFile) {
      this.currentObject.photo = fileName
      this.imageFile = imageFile
    }
  }
}
</script>

<style>

</style>
