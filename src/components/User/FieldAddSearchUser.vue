<template>
<div>
  <v-text-field
    v-model="searchUserName"
    @input="searchUser"
    class="pa-3"
    outlined
    dense
    label="Pesquisar usuário..."
    hide-details
    clearable
  >
    <template v-slot:append>
      <v-icon
        color="primary"
        :disabled="userNameInvalid"
      >
        mdi-magnify
      </v-icon>
    </template>
    <template v-slot:prepend>
       <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                @click="addUser"
                color="primary"
                v-bind="attrs"
                v-on="on"
              >
                mdi-playlist-plus
              </v-icon>
            </template>
            <span>Incluir novo usuário</span>
      </v-tooltip>
    </template>
  </v-text-field>
  <dialog-edit
    v-if="dialogs.edit"
    :user=null
    @close="dialogs.edit=false"
  />
</div>
</template>

<script>
export default {
  data () {
    return {
      searchUserName: '',
      dialogs: {
        edit: false
      }
    }
  },
  computed: {
    userNameInvalid () {
      return false
    }
  },
  methods: {
    searchUser () {
      if (!this.userNameInvalid) {
        if (!this.searchUserName){
          this.searchUserName=''
        }
        this.$store.dispatch('getUsersByName',this.searchUserName).then().catch(e => {
          this.$store.commit('showSnackbar',e)
        })
      }
    },
    addUser () {
      this.dialogs.edit = true
    }
  },
  components: {
    'dialog-edit': require('./Dialogs/DialogEditUser').default
  }
}
</script>

<style>

</style>
