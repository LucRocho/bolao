<template>
  <v-snackbar
    v-model="$store.state.mainStore.snackbar.show"
  >
    {{ $store.state.mainStore.snackbar.text }}
    <template v-slot:action="{ attrs }">
      <v-btn
        @click="$store.commit('hideSnackbar')"
        color="pink"
        text
        v-bind="attrs"
      >
        Fechar
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
}
</script>

<style lang='sass'>
  div.v-snack:not(.v-shack--absolute)
    height: 100%
</style>