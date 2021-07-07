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
          <settings-menu
            v-if="$store.state.userStore.loggedUser.administrator"
          />
        </v-row>
        <v-row>
          <v-toolbar-title class="text-h4 ml-4">
            {{$store.state.mainStore.appTitle}}
          </v-toolbar-title>
        </v-row>
        <v-row><div class="text-h6 ml-4 font-italic">{{$store.state.competitionStore.activeCompetition?$store.state.competitionStore.activeCompetition.name:'Sem competição ativa'}}</div></v-row>
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
      drawer: null
    }
  },
  mounted  () {
    this.$store.dispatch('getActiveCompetition').then()
  },
  components: {
    snackbar: require('./components/Shared/Snackbar').default,
    'live-date-time': require('./components/Shared/LiveDateTime').default,
    'settings-menu': require('./components/Shared/SettingsMenu').default,
    'main-menu': require('./components/Shared/MainMenu').default,
    'my-avatar': require('./components/Shared/MyAvatar').default
    
  },
  methods: {
   
  }
}
</script>
<style lang='sass'>
  .head-container
    max-width: none !important

</style>
