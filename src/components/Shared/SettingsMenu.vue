<template>
  <v-menu>
    <template v-slot:activator="{ on, attrs }">
        <v-btn
        dark
        icon
        v-bind="attrs"
        v-on="on"
        >
        <v-icon>mdi-cog</v-icon>
        </v-btn>
    </template>

    <v-list
        dense
        nav
    >
        <v-list-item
        v-for="item in items"
        :key="item.title"
        :to="item.to"
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
    </v-menu>
</template>

<script>
export default {
  data () {
    return {
      items: [
        { title: 'Competições', icon: 'mdi-trophy', to: '/competitions' },
        { title: 'Equipes', icon: 'mdi-flag', to: '/teams' },
        { title: 'Partidas', icon: 'mdi-soccer-field', to: '/matchs' },
        { title: 'Bolões', icon: 'mdi-soccer', to: '/games' },
        { title: 'Placar', icon: 'mdi-scoreboard', to: '/scoreboard' },
        { title: 'Usuários', icon: 'mdi-account-lock', to: '/users' }
      ]
    }
  }
}
</script>

<style>

</style>