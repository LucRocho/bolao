<template>
  <div class="about">
    <p class="text-h6 text-center primary--text mb-0 mt-2" >
      <v-icon color="primary">mdi-information</v-icon> - Sobre o Bolão Digital
    </p>
    <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-img
      src="grass.jpg"
      height="200px"
    ></v-img>

    <v-card-title>
      Bolão Digital
    </v-card-title>

    <v-card-subtitle>
      Sistema de gerenciamento de bolões desenvolvido pela Rocho Tech
    </v-card-subtitle>

    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
      >
        Saiba mais...
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>

    <v-expand-transition>
      <div v-show="show">
        <v-divider></v-divider>

        <v-card-text>
          Dúvidas ou sugestões entre em contato com o administrador através do e-mail luciano@rocho.com.br  
        </v-card-text>
      </div>
    </v-expand-transition>
  </v-card>
  </div>
</template>
<script>
export default {
  name: 'About',
  data() {
      return {
        show:false
      }
  }
}
</script>

