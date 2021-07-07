<template>

<v-row justify="center">
<v-dialog
    :value = "true"
    persistent
    max-width="600px"
    transition="dialog-bottom-transition"
>

    <v-form ref="form" lazy-validation @submit.prevent="saveUsers">
      <v-card>
        <v-card-title>
          <span class="text-h5 primary--text">Cadastro de usuários participantes</span>
        </v-card-title>
        <v-card-subtitle>
          <span class="text-h6 primary--text">{{game.name}}</span>
        </v-card-subtitle>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                    <v-list
                        
                        class="pt-0"
                        dense
                    >
                        <v-subheader>Usuários disponíveis</v-subheader>
                        <draggable v-model="availableUsers"  :options="{group:'users'}">
                            <user
                                v-for="user in availableUsers"
                                :key="user.id"
                                :user="user"
                                :withoutMenu="true"
                            />
                        </draggable>
                        
                    </v-list>
              </v-col>
              <v-col cols="12" sm="6">
                    <v-list
                        
                        class="pt-0"
                        dense
                    >
                        <v-subheader>Usuários no bolão</v-subheader>
                        <draggable v-model="gameUsers" :options="{group:'users'}" >
                            <user
                                v-for="user in gameUsers"
                                :key="user.id"
                                :user="user"
                                :withoutMenu="true"
                            />
                        </draggable>
                        
                    </v-list>
              </v-col>
            </v-row>
          </v-container>
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
import draggable from 'vuedraggable'
import Util from '../../../dataServices/helper/util'
export default {
    data: () => ({
      gameUsers:[],
      availableUsers:[]
    }),
    props: ['game'],
    components: {
        user: require('./../../User/User').default,
        draggable
    },
    methods: {
        saveUsers(){
            const objUsersGame = {
                gameId:this.game.id,
                stringSelectedUsers : this.getSelectedUsers()
            }
            let formData=Util.object2FormData(objUsersGame,this.$store.state.userStore.loggedUser.id)
            this.$store.dispatch('saveUsersGame',{ formData: formData})
            .then((resp)=>{
                this.$store.commit('showSnackbar',resp)
                this.$emit('close')

            }).catch(e => {
                this.$store.commit('showSnackbar',e)
            })

        },
        getSelectedUsers() {
            let strUsers=""
            this.gameUsers.forEach((user)=> {
                strUsers+=user.id + ","
            });
            if (strUsers!=""){
                strUsers=strUsers.substring(0,strUsers.length-1)
            }
            return strUsers
        }
    },
    mounted () {

        this.$store.dispatch('getUsersGame',this.game.id)
        .then((resp)=>{
          this.gameUsers=resp
          
        }).catch(e => {
          this.$store.commit('showSnackbar',e)
        })

        this.$store.dispatch('getAvailableUsersGame',this.game.id)
        .then((resp)=>{
          this.availableUsers=resp
          
        }).catch(e => {
          this.$store.commit('showSnackbar',e)
        })
    }
  
}
</script>

<style scoped>
.v-list{
  height:400px;/* or any height you want */
  overflow-y:auto
}
</style>