<template>
  <v-list
    dense
    nav
  >
    <v-list-item
        v-for="(item,index) in items"
        :key="item.title"
        :to="item.to"
        @click="handleClick(index)"
        link
    >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: 'Palpites', icon: 'mdi-scoreboard', to: '/guesses', click(){} },
        { title: 'Ranking', icon: 'mdi-order-numeric-ascending', to: '/ranking', click(){}  },
        { title: 'Premiação', icon: 'mdi-cash-multiple', to: '/prize', click(){}  },
        { title: 'Perfil', icon: 'mdi-account', to: '/profile', click(){this.$root.$emit('openProfile')}  },
        { title: 'Sobre', icon: 'mdi-information', to: '/about', click(){}  },
        { title: 'Sair', icon: 'mdi-exit-to-app', to: '/login' ,click () {this.$store.commit('setLoggedUser',null)} }
      ]
    }
  },
  methods: {
    handleClick (index) {
      this.items[index].click.call(this)
    }
  }
}
</script>

<style>

</style>