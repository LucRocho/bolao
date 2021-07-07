<template>
<div>
  <v-text-field
    v-model="searchCompetitionName"
    @input="searchCompetition"
    class="pa-3"
    outlined
    dense
    label="Pesquisar competição..."
    hide-details
    clearable
  >
    <template v-slot:append>
      <v-icon
        color="primary"
        :disabled="competitionNameInvalid"
      >
        mdi-magnify
      </v-icon>
    </template>
    <template v-slot:prepend>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            @click="addCompetition"
            color="primary"
            v-bind="attrs"
            v-on="on"
          >
            mdi-playlist-plus
          </v-icon>
        </template>
        <span>Incluir nova competição</span>
      </v-tooltip>
    </template>
  </v-text-field>
  <dialog-edit
    v-if="dialogs.edit"
    :competition=null
    @close="dialogs.edit=false"
  />
</div>
</template>

<script>
export default {
  data () {
    return {
      searchCompetitionName: '',
      dialogs: {
        edit: false
      }
    }
  },
  computed: {
    competitionNameInvalid () {
      return false
    }
  },
  methods: {
    searchCompetition () {
      if (!this.competitionNameInvalid) {
        if (!this.searchCompetitionName){
          this.searchCompetitionName=''
        }
        this.$store.dispatch('getCompetitionsByName',this.searchCompetitionName).then().catch(e => {
          this.$store.commit('showSnackbar',e)
        })
      }
    },
    addCompetition () {
      this.dialogs.edit = true
    }
  },
  components: {
    'dialog-edit': require('./Dialogs/DialogEditCompetition').default
  }
}
</script>

<style>

</style>
