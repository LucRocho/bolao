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
          Excluir {{team.name}} ?
        </v-card-title>
        <v-card-text>Essa equipe será excluída.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            text
            @click="$emit('close')"
          >
            Não
          </v-btn>
          <v-btn
            @click="deleteTeam(team.id)"
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
  props: ['team'],

  methods: {
    deleteTeam(id){
      this.$store.dispatch('deleteTeam', id).then(resp=>{
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
