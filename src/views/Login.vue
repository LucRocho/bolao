<template>
<v-form ref="form" lazy-validation @submit.prevent="login">
  <div  class="login">
  <v-card
    class="mx-auto elevation-15"
    max-width="320"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      src="grass.jpg"
    >
      <v-card-title>Bem-vindo ao Bolão Digital</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      Login
    </v-card-subtitle>

    <v-card-text class="text--primary">
                <v-text-field
                    v-model="form.email"
                    :rules="[rules.required, rules.email]"
                    label="E-mail (usado no cadastro do site)"
                ></v-text-field>
            
            <v-text-field
                v-model="form.password"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :rules="[rules.required]"
                :type="showPassword ? 'text' : 'password'"
                label="Senha"
                @click:append="showPassword = !showPassword"
                
            ></v-text-field>
    </v-card-text>
        
    <v-card-actions>
      <v-btn
        color="primary"
        type="submit"
        text
        
      >
        Entrar
      </v-btn>
      <v-overlay
        :absolute="absolute"
        :value="overlay"
      >
        <v-btn
        color="warning"
        @click="overlay = false"
        >
        {{errorMessage}}
        </v-btn>
      </v-overlay>
    </v-card-actions>
  </v-card>
  </div>
</v-form>
</template>

<script>
export default {
    data () {
      return {
        showPassword: false,
        rules: {
          required: value => !!value || 'Preenchimento obrigatório',
          email: value => {
            const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            return pattern.test(value) || 'e-mail inválido'
          }
        },
        form : {
          email:'',
          password:'',
        },
        overlay: false,
        absolute: true,
        errorMessage: null
      }
    },
    methods: {
      login() {
        if (!this.$refs.form.validate()) {
          this.errorMessage = 'Preencha todos os campos'
          this.overlay = true
        }
        else {
          let formData=new FormData();
          Object.entries(this.form).forEach(([key, value]) => {
              formData.append(key, value);
          });
          this.$store.dispatch('login',formData).then(()=>{
            this.$router.push('Ranking')
          }).catch((error) => {
            this.errorMessage = error
            this.overlay = true
          })
        }
         
      }
    }
}
</script>
<style lang="sass">
  .login
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%,-50%)

</style>
