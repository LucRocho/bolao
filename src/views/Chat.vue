<template>
  <div>
    <p class="text-h6 text-center primary--text mb-0 mt-2" >
      <v-icon color="primary">mdi-chat</v-icon> - Mural
    </p>
    
    <field-select-game @idGameChanged="changeGame" />
    <p class="mr-2 ml-2"> 

      <v-text-field
              v-model="message"
              :append-outer-icon="message ? 'mdi-send' : 'mdi-send'"
              prepend-icon="mdi-paperclip"
              filled
              clear-icon="mdi-close-circle"
              clearable
              label="Mensagem"
              type="text"
              @click:append-outer="sendMessage"
              @click:prepend="openDialog"
              @click:clear="clearMessage"
        >
        </v-text-field>
        <!--
        <v-file-input
          chips
          small-chips
          truncate-length="15"
          accept="image/*"
          v-model="imageFile"
          @change="onFileSelected"
        ></v-file-input>
        -->
    </p>


    <v-row justify="center">
      <v-dialog
        v-model="dialog"
        persistent
        max-width="290"
      >

<v-form ref="form" lazy-validation @submit.prevent="sendImage">

        <v-card>
          <v-card-title class="text-h5">
            Envio de imagem
          </v-card-title>
          <v-card-text>
            <v-file-input
              chips
              small-chips
              truncate-length="15"
              accept="image/*"
              v-model="imageFile"
              @change="onFileSelected"
            ></v-file-input>
            <v-img
              :src="fileName"
            ></v-img>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              text
              @click="dialog = false"
            >
              Cancelar
            </v-btn>
            <v-btn
              v-if="this.imageFile && this.imageFile.name!=''"
              color="green darken-1"
              text
              @click="sendImage"
            >
              Enviar
            </v-btn>
          </v-card-actions>
        </v-card>
        </v-form>
      </v-dialog>
    </v-row>
        
    
    <v-container fluid>
      <chat :idGame=idGame />
      
    </v-container>
    
    
  </div>
</template>

<script>
import Util from '../dataServices/helper/util'
export default {
  name: 'Chat',
  data() {
      return {
        idGame:0,
        message: 'Fala viado!',
        imageFile:null,
        dialog:false,
        fileName:''
       
    }
      
  },

  

  computed: {
    
  },


  components: {
    'field-select-game': require('./../components/Shared/FieldSelectGame').default,
    'chat': require('./../components/Shared/SimpleChat').default
    
  },
  methods:{
    changeGame(selectedIdGame){
      //console.log(selectedIdGame)
      this.idGame=selectedIdGame

      this.$store.dispatch('getAllChats',this.idGame).then().catch(e => {
          this.$store.commit('showSnackbar',e)
        })
    },

    onFileSelected(){
      if (this.imageFile){
        this.createImage(this.imageFile);
      }
        
    },

    createImage(file) {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        this.fileName = e.target.result;
      };
      reader.readAsDataURL(file);
    },

    sendImage(){
      this.sendMessage()
      this.dialog=false
    },

    sendMessage () {
      if ((this.message && this.message.trim()!='') || this.imageFile)
      {
        
        let objChat = {
          id:0,
          id_game:this.idGame,
          message:this.message.substr(0,999),
          chat_image:(this.imageFile?this.imageFile.name:'')
        }
        let formData=Util.object2FormData(objChat,this.$store.state.userStore.loggedUser.id)
        if (this.imageFile) {
          formData.set('chat_image',this.imageFile,objChat.chat_image)
        }
        this.$store.dispatch('saveChat',{ formData: formData, savedChat: objChat, modeCreate: true})
        .then((resp)=>{
            this.clearMessage()
            this.$store.commit('showSnackbar',resp)
            this.$emit('close')
        }).catch(e => {
            this.$store.commit('showSnackbar',e)
        })

        


      }
      
    },
    clearMessage () {
      this.message = ''
    },

    openDialog(){
      this.imageFile=null
      this.dialog=true
    },
    

    
  },
  mounted () {
    this.$store.dispatch('getActiveGamesUser',this.$store.state.userStore.loggedUser.id).then(resp=>{
        let games = resp
        this.idGame=games[0].id
        this.changeGame(this.idGame)
      }).catch(e => {
        this.$store.commit('showSnackbar',e)
      })
  }
}
</script>