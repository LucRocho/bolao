<template>
  <v-list
    flat
    class="pt-0"
    three-line
  >
    <game
        v-for="game in $store.state.gameStore.games"
        :key="game.id"
        :game="game"
    />
    
  </v-list>
</template>

<script>
export default {
  components: {
    game: require('./Game').default
  }
}
</script>

<style>

</style>