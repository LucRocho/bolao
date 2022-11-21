<template>
  <div>
    <p class="text-h6 text-center primary--text mb-0 mt-2" >
      <v-icon color="primary">mdi-scoreboard</v-icon> - Atualização de Placar
    </p>
    <field-add-search-match :withoutAdd="true" />
    <list-matchs :withoutMenu="true"
      v-if="$store.state.matchStore.matchs.length"
    />
    <no-item
      v-else
    />
  </div>
</template>

<script>
export default {
  name: 'Scoreboard',
  data() {
      return {
      }
  },
  components: {
    'field-add-search-match': require('./../components/Match/FieldAddSearchMatch').default,
    'list-matchs': require('./../components/Match/ListMatchs').default,
    'no-item': require('./../components/Shared/NoItem').default    
  },
  mounted () {
    this.$store.dispatch('getAllMatchs').then().catch(e => {
          this.$store.commit('showSnackbar',e)
        })
  }
}
</script>