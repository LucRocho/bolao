<template>
  <div>
    <p class="text-h6 text-center primary--text mb-0 mt-2" >
      <v-icon color="primary">mdi-soccer-field</v-icon> - Cadastro de Partidas
    </p>
    <field-add-search-match />
    <list-matchs
      v-if="$store.state.matchStore.matchs.length"
    />
    <no-item
      v-else
    />
  </div>
</template>

<script>
export default {
  name: 'Match',
  data() {
      return {
      }
  },
  props: ['competition'],
  components: {
    'field-add-search-match': require('./../components/Match/FieldAddSearchMatch').default,
    'list-matchs': require('./../components/Match/ListMatchs').default,
    'no-item': require('./../components/Shared/NoItem').default    
  },
  mounted () {
    /*
    this.$store.dispatch('getAllMatchs').then().catch(e => {
          this.$store.commit('showSnackbar',e)
        })
    */
   if (this.competition){
     this.$store.dispatch('getMatchs',{competitionId:this.competition.id})
     .then()
     .catch(e => {
          this.$store.commit('showSnackbar',e)
     })
   }
  }
}
</script>