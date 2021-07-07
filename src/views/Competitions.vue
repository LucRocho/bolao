<template>
  <div>
    <p class="text-h6 text-center primary--text mb-0 mt-2" >
      <v-icon color="primary">mdi-trophy</v-icon> - Cadastro de Competições
    </p>
    <field-add-search-competition />
    <list-competitions
      v-if="$store.state.competitionStore.competitions.length"
    />
    <no-item
      v-else
    />
  </div>
</template>

<script>
export default {
  name: 'Competition',
  data() {
      return {
      }
  },
  components: {
    'field-add-search-competition': require('./../components/Competition/FieldAddSearchCompetition').default,
    'list-competitions': require('./../components/Competition/ListCompetitions').default,
    'no-item': require('./../components/Shared/NoItem').default    
  },
  mounted () {
    this.$store.dispatch('getAllCompetitions').then().catch(e => {
          this.$store.commit('showSnackbar',e)
        })
  }
}
</script>