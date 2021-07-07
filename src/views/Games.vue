<template>
  <div>
    <p class="text-h6 text-center primary--text mb-0 mt-2" >
      <v-icon color="primary">mdi-soccer</v-icon> - Cadastro de Bolões
    </p>
    <field-add-search-game />
    <list-games
      v-if="$store.state.gameStore.games.length"
    />
    <no-item
      v-else
    />
  </div>
</template>

<script>
export default {
  name: 'Game',
  data() {
      return {
      }
  },
  components: {
    'field-add-search-game': require('./../components/Game/FieldAddSearchGame').default,
    'list-games': require('./../components/Game/ListGames').default,
    'no-item': require('./../components/Shared/NoItem').default    
  },
  mounted () {
    this.$store.dispatch('getAllGames').then().catch(e => {
          this.$store.commit('showSnackbar',e)
        })
  }
}
</script>