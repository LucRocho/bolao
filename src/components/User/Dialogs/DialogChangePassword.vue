<template>
  <v-row  class="ml-1" >
    <v-dialog
      v-model="dialog"
      persistent
      max-width="550px"
    >
    
      <template v-slot:activator="{ on, attrs }">
        <v-btn
         v-if="!user"
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Alterar Senha
        </v-btn>
      </template>
      <v-form  ref="form" lazy-validation @submit.prevent="changePassword">
      <v-card>
        <v-card-title>
          <span class="text-h5">Alterar Senha{{(user?' de ' + user.name :'')}}</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                
              >
                <v-text-field
                    v-model="currentObject.password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required,rules.min]"
                    :type="showPassword ? 'text' : 'password'"
                    label="Nova senha"
                    @click:append="showPassword = !showPassword"
                    
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                
              >
                <v-text-field
                    v-model="currentObject.retypedPassword"
                    :append-icon="showRetypedPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :rules="[rules.required,rules.min]"
                    :type="showRetypedPassword ? 'text' : 'password'"
                    label="Redigite a nova senha"
                    @click:append="showRetypedPassword = !showRetypedPassword"
                    
                ></v-text-field>
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
            @click="close"
          >
            Fechar
          </v-btn>
          <v-btn
            color="primary"
            text
            type="submit"
            
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
    data: () => ({
      dialog: false,
      showPassword: false,
      showRetypedPassword: false,
      currentObject : {
          id: '',
          password: '',
          retypedPassword: ''
      },
      rules: {
          required: value => !!value || 'Campo obrigatório',
          min: v => v.length >= 6 || 'A senha deve possuir no mínimo 6 caracteres'
        }
    }),
    props: ['user'],
    mounted() {
        if (!this.user) {
          this.currentObject.id = this.$store.state.userStore.loggedUser.id
        }
        else {
          this.dialog = true
          this.currentObject.id = this.user.id
        }
        
    },
    methods: {
        changePassword () {

            if (this.currentObject.password != this.currentObject.retypedPassword) {
                this.$store.commit('showSnackbar','Senhas não conferem')
            }
            else{
                if (this.$refs.form.validate()) {
                    let formData=Util.object2FormData(this.currentObject,this.$store.state.userStore.loggedUser.id)
                    this.$store.dispatch('changePassword', formData)
                    .then(()=>{
                      this.$store.commit('showSnackbar', 'Senha alterada com sucesso')
                      this.close()
                    }).catch(e => {
                        this.$store.commit('showSnackbar',e)
                    })
                }
            }
        },
        close() {
          
          if (!this.user) {
            this.dialog = false
          } else {
            this.$emit('close')
          }
        }
    }
}
</script>

<style>

</style>