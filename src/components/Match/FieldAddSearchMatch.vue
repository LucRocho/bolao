<template>
<div>

  <v-row
    align="center"
    justify="space-between"
  >
    <div  v-if="!withoutAdd">
      <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn 
                class="ma-5" 
                @click="addMatch" 
                v-bind="attrs"
                v-on="on">
                <v-icon
                color="primary"
                dense
                >mdi-playlist-plus</v-icon>
              </v-btn>
            </template>
            <span>Incluir nova partida</span>
      </v-tooltip>
    </div>

    <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn 
                class="ma-5" 
                dense
                v-bind="attrs"
                v-on="on"
                @click="searchMatch">
                <v-icon
                  color="primary"
                  dense
                >mdi-magnify</v-icon>
              </v-btn>
            </template>
            <span>Pesquisar partidas</span>
    </v-tooltip>
  </v-row>
  <dialog-edit
    v-if="dialogs.edit"
    :match=null
    @close="dialogs.edit=false"
  />
  <dialog-search
    v-if="dialogs.search"
    @close="dialogs.search=false"
    @searched="search"
  />
</div>
</template>

<script>
export default {
  data () {
    return {
      dialogs: {
        edit: false,
        search: false
      }
    }
  },
  computed: {
    
  },
  props: ['withoutAdd'],
  methods: {
    search(e) {
      this.$store.dispatch('getMatchs',e).then().catch(err => {
        this.$store.commit('showSnackbar',err)
      })
      this.dialogs.search = false
    },
    searchMatch () {
      this.dialogs.search = true
    },
    addMatch () {
      this.dialogs.edit = true
    }
  },
  components: {
    'dialog-edit': require('./Dialogs/DialogEditMatch').default,
    'dialog-search': require('./Dialogs/DialogSearchMatch').default
  }
}
</script>

<style>

</style>
