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
      :game="game"
      @close="dialogs.delete=false"
    />
    <dialog-edit
      v-if="dialogs.edit"
      :game="game"
      @close="dialogs.edit=false"
    />
    <dialog-rules
      v-if="dialogs.rules"
      :game="game"
      @close="dialogs.rules=false"
    />
    <dialog-users
      v-if="dialogs.users"
      :game="game"
      @close="dialogs.users=false"
    />
    <dialog-payment
      v-if="dialogs.payment"
      :game="game"
      @close="dialogs.payment=false"
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
        rules:false,
        users:false,
        payment: false
      },
      items: [
        {
          title: 'Alterar',
          icon: 'mdi-pencil',
          click () {
            this.dialogs.edit = true
          }
        },
        {
          title: 'Excluir',
          icon: 'mdi-delete',
          click () {
            this.dialogs.delete = true
          }
        },
        {
          title: 'Regras',
          icon: 'mdi-ruler',
          click () {
            this.dialogs.rules = true
          }
        },
        {
          title: 'Participantes',
          icon: 'mdi-account-lock',
          click () {
            this.dialogs.users = true
          }
        },
        {
          title: 'Pagamento',
          icon: 'mdi-cash',
          click () {
            this.dialogs.payment = true
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
    'dialog-delete': require('./Dialogs/DialogDeleteGame').default,
    'dialog-edit': require('./Dialogs/DialogEditGame').default,
    'dialog-rules': require('./Dialogs/DialogRulesGame').default,
    'dialog-users': require('./Dialogs/DialogUsersGame').default,
    'dialog-payment': require('./Dialogs/DialogPaymentGame').default
  },
  props: ['game']
}
</script>

<style>

</style>
