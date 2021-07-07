<template>
  <div class="no-teams">
    <v-icon
        size = "100"
        color = "primary"
    >
        mdi-check
    </v-icon>
    <div class="text-h5 primary--text">
        Nada selecionado
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="sass">
  .no-teams
    position: absolute
    left: 50%
    top: 50%
    transform: translate(-50%,-50%)
    opacity: 0.5
</style>