<template>
  <v-list
    flat
    class="pt-0"
    two-line
  >
    <competition
        v-for="competition in $store.state.competitionStore.competitions"
        :key="competition.id"
        :competition="competition"
    />
    
  </v-list>
</template>

<script>
export default {
  components: {
    competition: require('./Competition').default
  }
}
</script>
<style>

</style>