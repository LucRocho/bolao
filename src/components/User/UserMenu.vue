<template>
  <div>
    <v-menu
      bottom
      left
    >
      <template v-slot:activator="{ on, attrs }">
      <v-btn
          color="primary"
          icon
          v-bind="attrs"
          v-on="on"
      >
          <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      </template>
      <v-list dense>
        <v-list-item
          v-for="(item, index) in items"
          :key="index"
          @click="handleClick(index)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <dialog-delete
      v-if="dialogs.delete"
      :user="user"
      @close="dialogs.delete=false"
    />
    <dialog-edit
      v-if="dialogs.edit"
      :user="user"
      @close="dialogs.edit=false"
    />
    <dialog-change-password
      v-if="dialogs.changePassword"
      :user="user"
      @close="dialogs.changePassword=false"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogs: {
        delete: false,
        edit: false,
        changePassword: false
      },
      items: [
        {
          title: 'Alterar',
          icon: 'mdi-pencil',
          click () {
            // console.log('edit')
            this.dialogs.edit = true
          }
        },
        {
          title: 'Excluir',
          icon: 'mdi-delete',
          click () {
            // console.log('delete')
            this.dialogs.delete = true
          }
        },
        {
          title: 'Alterar senha',
          icon: 'mdi-lock',
          click () {
            // console.log('delete')
            this.dialogs.changePassword = true
          }
        }
      ]
    }
  },
  methods: {
    handleClick (index) {
      this.items[index].click.call(this)
    }
  },
  components: {
    'dialog-delete': require('./Dialogs/DialogDeleteUser').default,
    'dialog-edit': require('./Dialogs/DialogEditUser').default,
    'dialog-change-password': require('./Dialogs/DialogChangePassword').default
  },
  props: ['user']
}
</script>

<style>

</style>
