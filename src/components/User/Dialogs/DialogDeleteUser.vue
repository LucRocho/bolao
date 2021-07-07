<template>
  <v-row justify="center">
    <v-dialog
      :value = "true"
      persistent
      max-width="600px"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title class="text-h5  primary--text">
          Excluir {{user.name}} ?
        </v-card-title>
        <v-card-text>Esse usuário será excluído.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="$emit('close')"
          >
            Não
          </v-btn>
          <v-btn
            @click="deleteUser(user.id)"
            color="red darken-1"
            text
          >
            Sim
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['user'],

  methods: {
    deleteUser(id){
      this.$store.dispatch('deleteUser', id).then(resp=>{
        this.$store.commit('showSnackbar',resp)
      }).catch(e => {
          this.$store.commit('showSnackbar',e)
        })
    }
  }

}
</script>

<style>

</style>
