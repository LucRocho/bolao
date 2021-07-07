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
      :team="team"
      @close="dialogs.delete=false"
    />
    <dialog-edit
      v-if="dialogs.edit"
      :team="team"
      @close="dialogs.edit=false"
    />
  </div>
</template>

<script>
export default {
  data () {
    return {
      dialogs: {
        delete: false,
        edit: false
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
    'dialog-delete': require('./Dialogs/DialogDeleteTeam').default,
    'dialog-edit': require('./Dialogs/DialogEditTeam').default
  },
  props: ['team']
}
</script>

<style>

</style>
