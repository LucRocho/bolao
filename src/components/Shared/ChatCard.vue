<template>
  <v-card
        :color="this.chat.id_chat_original?'#952175':'#1F7087'"
        dark
      >
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title
              class="text-h6"
              v-text="this.chat.name"
            ></v-card-title>
            <v-card-subtitle v-if="this.chat.id_chat_original && !this.chat.imageOriginal" class="font-italic font-weight-thin"> 
              {{this.chat.originalMessage}} - enviado por {{this.chat.originalUserName}} em {{this.chat.originalDate | niceDate}}
            </v-card-subtitle>
            <v-card-subtitle v-if="this.chat.id_chat_original && this.chat.imageOriginal"> 
              <v-img
                :src="this.chat.imageOriginal"
                max-height="150"
                max-width="150"
              ></v-img>
            </v-card-subtitle>
            <v-card-subtitle v-if="!this.chat.chat_image" v-text="this.chat.message"></v-card-subtitle>
            <v-card-subtitle v-else>
              <v-img
                :src="this.chat.chat_image"
                max-height="150"
                max-width="150"
              ></v-img>
            </v-card-subtitle>
            <v-card-actions>
              <h6>
                <div class="font-weight-light pa-2">{{this.chat.creation_date | niceDate}}</div>
              </h6>
              <v-dialog
                v-if="$store.state.userStore.loggedUser.name==this.chat.name || $store.state.userStore.loggedUser.administrator"
                v-model="dialog"
                persistent
                max-width="300"
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

              <v-dialog
                v-model="dialogReply"
                persistent
                max-width="600px"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    icon
                    v-bind="attrs"
                    v-on="on"
                  >
                    <v-icon>mdi-reply-circle</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Responder {{this.chat.name}}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        
                        <v-col cols="12">
                          <v-text-field
                            v-model="reply"
                            label="Resposta"
                            required
                          ></v-text-field>
                        </v-col>
                      </v-row>
                    </v-container>    
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="dialogReply = false"
                    >
                      Cancelar
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="sendReply"
                    >
                      Enviar
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              
            </v-card-actions>
          </div>

          <v-avatar
            class="ma-3"
            size="100"
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
import Util from '../../dataServices/helper/util'
export default {
  data () {
    return {
      dialog: false,
      dialogReply: false,
      reply:'',
      
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
    },

    sendReply () {
      if (this.reply && this.reply.trim()!='')
        {
          
          let objChat = {
            id:0,
            id_game:this.chat.id_game,
            message:this.reply.substr(0,999),
            id_chat_original:this.chat.id
          }
          let formData=Util.object2FormData(objChat,this.$store.state.userStore.loggedUser.id)
          this.$store.dispatch('saveChat',{ formData: formData, savedChat: objChat, modeCreate: true})
          .then((resp)=>{
              this.$store.commit('showSnackbar',resp)
              this.dialogReply=false
          }).catch(e => {
              this.$store.commit('showSnackbar',e)
          })
        }
      },
    
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