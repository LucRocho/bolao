<template>
<div>
  <v-text-field
    v-model="searchTeamName"
    @input="searchTeam"
    class="pa-3"
    outlined
    dense
    label="Pesquisar equipe..."
    hide-details
    clearable
  >
    <template v-slot:append>
      <v-icon
        color="primary"
        :disabled="teamNameInvalid"
      >
        mdi-magnify
      </v-icon>
    </template>
    <template v-slot:prepend>
      <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                @click="addTeam"
                color="primary"
                v-bind="attrs"
                v-on="on"
              >
                mdi-playlist-plus
              </v-icon>
            </template>
            <span>Incluir nova equipe</span>
      </v-tooltip>
    </template>
  </v-text-field>
  <dialog-edit
    v-if="dialogs.edit"
    :team=null
    @close="dialogs.edit=false"
  />
</div>
</template>

<script>
export default {
  data () {
    return {
      searchTeamName: '',
      dialogs: {
        edit: false
      }
    }
  },
  computed: {
    teamNameInvalid () {
      return false
    }
  },
  methods: {
    searchTeam () {
      if (!this.teamNameInvalid) {
        if (!this.searchTeamName){
          this.searchTeamName=''
        }
        this.$store.dispatch('getTeamsByName',this.searchTeamName).then().catch(e => {
          this.$store.commit('showSnackbar',e)
        })
      }
    },
    addTeam () {
      this.dialogs.edit = true
    }
  },
  components: {
    'dialog-edit': require('./Dialogs/DialogEditTeam').default
  }
}
</script>

<style>

</style>
