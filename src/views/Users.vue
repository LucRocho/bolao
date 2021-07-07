<template>
  <div>
    <p class="text-h6 text-center primary--text mb-0 mt-2" >
      <v-icon color="primary">mdi-account-lock</v-icon> - Cadastro de Usuários
    </p>
    <field-add-search-user />
    <list-users
      v-if="$store.state.userStore.users.length"
    />
    <no-item
      v-else
    />
  </div>
</template>

<script>
export default {
  name: 'User',
  data() {
      return {
      }
  },
  components: {
    'field-add-search-user': require('./../components/User/FieldAddSearchUser').default,
    'list-users': require('./../components/User/ListUsers').default,
    'no-item': require('./../components/Shared/NoItem').default    
  },
  mounted () {
    this.$store.dispatch('getAllUsers').then().catch(e => {
          this.$store.commit('showSnackbar',e)
        })
  }
}
</script>