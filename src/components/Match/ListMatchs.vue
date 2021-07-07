<template>
  <v-list
    flat
    class="pt-0"
    three-line
  >
    <match
        v-for="match in $store.state.matchStore.matchs"
        :key="match.id"
        :match="match"
        :withoutMenu="withoutMenu"
    />
    
  </v-list>
</template>

<script>
export default {
  components: {
    match: require('./Match').default
  },
  props: ['withoutMenu']
}
</script>

<style>

</style>