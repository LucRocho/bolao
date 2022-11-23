<template>
  <v-card
        color="#1F7087"
        dark
      >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title
              class="text-h6"
              v-text="this.chat.name"
            ></v-card-title>
            <v-card-subtitle v-text="this.chat.message"></v-card-subtitle>
            <v-card-actions>
              <h6>
                <div class="font-weight-light pa-2">{{this.chat.creation_date | niceDate}}</div>
              </h6>
              <v-dialog
                v-if="$store.state.userStore.loggedUser.name==this.chat.name || $store.state.userStore.loggedUser.administrator"
                v-model="dialog"
                persistent
                max-width="290"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-delete-circle</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title class="text-h5">
                    Excluir a mensagem ?
                  </v-card-title>
                  <v-card-text>Exclusão da mensagem selecionada do {{this.chat.name}}</v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="dialog = false"
                    >
                      Não
                    </v-btn>
                    <v-btn
                      color="green darken-1"
                      text
                      @click="excluir()"
                    >
                      Sim
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              
            </v-card-actions>
          </div>

          <v-avatar
            class="ma-3"
            size="125"
            tile
          >
            <v-img :src="this.chat.photo"></v-img>
          </v-avatar>
        </div>
      </v-card>
</template>

<script>
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
export default {
  data () {
    return {
      dialog: false,
      
    }
  },
  computed: {
    
  },
  methods: {

    excluir(){
      
      this.dialog=false;
      this.$store.dispatch('deleteChat', this.chat.id).then(resp=>{
        this.$store.commit('showSnackbar',resp)
      }).catch(e => {
          this.$store.commit('showSnackbar',e)
        })
    }
    
  },
  components: {
    
  },
  props: ['chat']
  ,
  filters: {

    niceDate (value) {
      const newDate = new Date(value)
      //newDate.setHours(newDate.getHours()+3)
      return format(newDate, 'd MMM yyyy HH:mm', { locale: ptBR })
    }

  },
  mounted() {
    
  }
}
</script>


<style>

</style>