<template>
  <v-list
    flat
    class="pt-0"
  >
    <team
        v-for="team in $store.state.teamStore.teams"
        :key="team.id"
        :team="team"
    />
    
  </v-list>
</template>

<script>
export default {
  components: {
    team: require('./Team').default
  }
}
</script>

<style>

</style>