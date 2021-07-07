<template>
  <div>
  <v-list-item
    class="white"
    :ripple="false"
    >
    <template v-slot:default>
        <v-list-item-avatar>
          <v-img v-if="gameUser.photo" :src="gameUser.photo"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title>
              {{gameUser.name}}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{gameUser.email}}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="green--text" v-if="gameUser.paid==1">
              PAGO
            </v-list-item-subtitle>
            <v-list-item-subtitle  class="red--text" v-else>
              NÃO PAGO
            </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action v-if="gameUser.paid==1">
            <v-btn
                color="red"
                text
                @click="changePaymentStatus"
            >
                desfazer
            </v-btn>
        </v-list-item-action>
        <v-list-item-action v-else>
            <v-btn
                color="green"
                text
                @click="changePaymentStatus"
            >
                pagar
            </v-btn>
        </v-list-item-action>
        
    </template>
  </v-list-item>
  <v-divider />
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['gameUser'],
  filters: {
  },
  components: {
    
  },
  methods: {
    changePaymentStatus(){
      //console.log('idGameUser:'+this.gameUser.idGameUser+', idGame:' + this.gameUser.id_game +',idUser:'+this.gameUser.id)
      this.$store.dispatch('toogleGamePaid', this.gameUser.idGameUser).then((resp)=>{
        if (this.gameUser.paid==1) {
          this.gameUser.paid=0
        }
        else{
          this.gameUser.paid=1
        }
        this.$store.commit('showSnackbar',resp)
      }).catch(e => {
          this.$store.commit('showSnackbar',e)
      })
    }
  }
}
</script>

