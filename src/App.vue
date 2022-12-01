<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-if="$store.state.userStore.loggedUser"
      v-model="drawer"
      :mobile-breakpoint="768"
      app
      >
      <my-avatar />
      <main-menu />
    </v-navigation-drawer>

    <v-app-bar
      v-if="$store.state.userStore.loggedUser"
      app
      color="primary"
      dark
      prominent
      src="grass.jpg"
      height="170"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
        ></v-img>
      </template>
      <v-container class="pa-0 head-container">
        <v-row>
          <v-app-bar-nav-icon @click="drawer=!drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <v-btn
            v-if="!$store.state.chatStore.novaMensagem"
            dark
            icon
            @click="goToChat"
          >
            <v-icon>mdi-chat</v-icon>
          </v-btn>
          <v-badge

            v-if="$store.state.chatStore.novaMensagem"
            bottom
            color="error"
            icon="mdi-bell"
            overlap
            offset-x="25"
            offset-y="25"
            
          >
            <v-btn
              dark
              icon
              @click="goToChat"
            >
              <v-icon>mdi-chat</v-icon>
            </v-btn>
          </v-badge>
          <v-btn
            dark
            icon
            @click="goToRanking"
          >
            <v-icon>mdi-order-numeric-ascending</v-icon>
          </v-btn>
          <settings-menu
            v-if="$store.state.userStore.loggedUser.administrator"
          />
        </v-row>
        <v-row>
          <v-toolbar-title class="text-h4 ml-4">
            {{$store.state.mainStore.appTitle}}
          </v-toolbar-title>
        </v-row>
        <v-row>
          <div class="text-h6 ml-4 font-italic">{{$store.state.competitionStore.activeCompetition?$store.state.competitionStore.activeCompetition.name:'Sem competição ativa'}}</div>
          <v-spacer/>
          <v-avatar size="50" class="mr-2">
            <img  v-if="$store.state.competitionStore.activeCompetition.logo" :src="$store.state.competitionStore.activeCompetition.logo">
          </v-avatar>
        </v-row>
        <v-row>
          <live-date-time/>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-main>
      <router-view />
      <snackbar v-if="$store.state.userStore.loggedUser"/>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      drawer: null,
      connection:null,
    }
  },
  mounted  () {
    
    this.$store.dispatch('getActiveCompetition').then()

    

    this.connection = new WebSocket(`ws://${process.env.NODE_ENV === 'production' ? 'rocho.com.br' : 'localhost'}:7071/`)
    this.connection.onopen = function(event) {
      console.log(event)
      console.log("Conectado ao websocket server...")
    }
    let vm = this;
    this.connection.onmessage = function(event) {
      const mensagem = JSON.parse(event.data)
      if (mensagem.message=='mensagensLidas'  && mensagem.user==vm.$store.state.userStore.loggedUser.id ){
        vm.$store.commit('setNovaMensagem',0)  
      }
      if (mensagem.message=='novaMensagem'  && mensagem.user!=vm.$store.state.userStore.loggedUser.id ){
        vm.$store.commit('setNovaMensagem',1)  
      }
    }
    
    

  },
  components: {
    snackbar: require('./components/Shared/Snackbar').default,
    'live-date-time': require('./components/Shared/LiveDateTime').default,
    'settings-menu': require('./components/Shared/SettingsMenu').default,
    'main-menu': require('./components/Shared/MainMenu').default,
    'my-avatar': require('./components/Shared/MyAvatar').default
    
  },
  methods: {
    goToChat(){
      this.$router.push('Chat').catch(()=>{})
    },
    goToRanking(){
      this.$router.push('Ranking').catch(()=>{})
    },
    
  }
}
</script>
<style lang='sass'>
  .head-container
    max-width: none !important

</style>
