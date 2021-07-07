<template>
<div>
  <v-text-field
    v-model="searchGameName"
    @input="searchGame"
    class="pa-3"
    outlined
    dense
    label="Pesquisar bolão..."
    hide-details
    clearable
  >
    <template v-slot:append>
      <v-icon
        color="primary"
        :disabled="gameNameInvalid"
      >
        mdi-magnify
      </v-icon>
    </template>
    <template v-slot:prepend>
      <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                @click="addGame"
                color="primary"
                v-bind="attrs"
                v-on="on"
              >
                mdi-playlist-plus
              </v-icon>
            </template>
            <span>Incluir novo bolão</span>
      </v-tooltip>
    </template>
  </v-text-field>
  <dialog-edit
    v-if="dialogs.edit"
    :game=null
    @close="dialogs.edit=false"
  />
</div>
</template>

<script>
export default {
  data () {
    return {
      searchGameName: '',
      dialogs: {
        edit: false
      }
    }
  },
  computed: {
    gameNameInvalid () {
      return false
    }
  },
  methods: {
    searchGame () {
      if (!this.gameNameInvalid) {
        if (!this.searchGameName){
          this.searchGameName=''
        }
        this.$store.dispatch('getGamesByName',this.searchGameName).then().catch(e => {
          this.$store.commit('showSnackbar',e)
        })
      }
    },
    addGame () {
      this.dialogs.edit = true
    }
  },
  components: {
    'dialog-edit': require('./Dialogs/DialogEditGame').default
  }
}
</script>

<style>

</style>
