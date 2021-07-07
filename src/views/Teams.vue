<template>
  <div>
    <p class="text-h6 text-center primary--text mb-0 mt-2" >
      <v-icon color="primary">mdi-flag</v-icon> - Cadastro de Equipes
    </p>
    <field-add-search-team />
    <list-teams
      v-if="$store.state.teamStore.teams.length"
    />
    <no-item
      v-else
    />
  </div>
</template>

<script>
//import dsTeam from './../dataServices/dsTeam'
export default {
  name: 'Team',
  data() {
      return {
      }
  },
  components: {
    'field-add-search-team': require('./../components/Team/FieldAddSearchTeam').default,
    'list-teams': require('./../components/Team/ListTeams').default,
    'no-item': require('./../components/Shared/NoItem').default    
  },
  mounted () {
    this.$store.dispatch('getAllTeams').then().catch(e => {
          this.$store.commit('showSnackbar',e)
        })
  }
}
</script>