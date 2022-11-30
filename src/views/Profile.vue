<template>

  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
    <v-form ref="form" lazy-validation @submit.prevent="saveUser">
      <v-card>
        <v-card-title>
          <span class="text-h5">Perfil do Usuário</span>
          
        </v-card-title>
        <v-card-subtitle>
          <dialog-change-password />
        </v-card-subtitle>
        <v-card-text>
          <v-container>
            
            <v-row>
              <v-col
                cols="12"
                sm="6"
                
              >
                <v-text-field
                  label="Nome*"
                  required
                  :rules="[rules.required]"
                  v-model="currentObject.name"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                
              >
                <v-text-field
                  label="e-Mail*"
                  v-model="currentObject.email"
                  :rules="[rules.required, rules.email]"
                  required
                ></v-text-field>
              </v-col>
              
              <v-col cols="12">
                <image-selector
                  :message="imageComponentText"
                  @imageLoaded="updateImage"
                />
              </v-col>
              
            </v-row>
          </v-container>
          <small>*Indica campos obrigatórios</small>
        </v-card-text>
        <v-card-actions>
             <v-spacer></v-spacer>
              <v-btn
                color="red"
                text
                @click="dialog=false"
              >
                Fechar
              </v-btn>
              <v-btn
                color="primary"
                type="submit"
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
import Util from '../dataServices/helper/util'
export default {
    data() {
      return {
          dialog: true,
          currentObject: {
              id:null,
              name: null,
              email: null,
              photo: null
          },
          imageComponentText: 'Selecione uma imagem para você',
          imageFile: null,
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

    mounted()  {
      
       this.$root.$on('openProfile',()=>{
         this.dialog = true
         let user = Object.assign({},this.$store.state.userStore.loggedUser)
         this.currentObject = user
         this.$root.$emit('loadImage',this.currentObject.photo)
       })
       
    },
    components: {
    'image-selector': require('./../components/Shared/ImageSelector').default,
    'dialog-change-password': require('./../components/User/Dialogs/DialogChangePassword').default
        
    },
    methods: {
        updateImage(fileName, imageFile) {
            this.currentObject.photo = fileName
            this.imageFile = imageFile
        },

        saveUser () {
            if (this.$refs.form.validate()) {
                let formData=Util.object2FormData(this.currentObject,this.$store.state.userStore.loggedUser.id)
                if (this.imageFile) {
                    formData.set('photo',this.imageFile,this.currentObject.photo)
                }
                this.$store.dispatch('saveUser',{ formData: formData, savedUser: null, modeCreate: false})
                .then(()=>{
                    this.dialog = false
                    this.$store.commit('setLoggedUser',this.currentObject)
                    this.$store.commit('showSnackbar','Alteração realizada com sucesso')
                }).catch(e => {
                  this.$store.commit('showSnackbar',e)
                })
            }
        }
    }
}
</script>

<style>

</style>