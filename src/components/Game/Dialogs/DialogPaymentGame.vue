<template>

  <v-row justify="center">
    <v-dialog
      :value = "true"
      persistent
      max-width="600px"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5 primary--text">Controle de pagamento: {{game.name}}</span>
        </v-card-title>
        <v-card-text>
          <v-list
            flat
            class="pt-0"
            three-line
          >
            <gameUser
                v-for="gameUser in listGameUser"
                :key="gameUser.idGameUser"
                :gameUser="gameUser"
            />
            
          </v-list>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="$emit('close')"
          >
            Fechar
          </v-btn>
          </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  
</template>

<script>
export default {
  props: ['game'],
  data () {
    return {
      listGameUser:[]
    }
  },

  components: {
   'gameUser': require('./../GameUser.vue').default
  },

  mounted () {
    this.$store.dispatch('getUsersGame',this.game.id)
    .then((resp)=>{
      this.listGameUser=resp
      
    }).catch(e => {
      this.$store.commit('showSnackbar',e)
    })  
  },

  methods: {
    
  }
}
</script>

<style>

</style>
