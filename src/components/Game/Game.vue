<template>
  <div>
  <v-list-item
    class="white"
    :ripple="false"
    >
    <template v-slot:default>
        <v-list-item-avatar>
          <v-img v-if="game.competitionLogo" :src="game.competitionLogo"></v-img>
        </v-list-item-avatar>
        <v-list-item-content>
            <v-list-item-title>
              {{game.name}}
            </v-list-item-title>
            <v-list-item-subtitle>
              {{game.competitionName}} - Responsável: {{game.responsibleUserName}}
            </v-list-item-subtitle>
            <v-list-item-subtitle>
              Valor individual: {{game.individual_value}} - {{(game.active?'Ativo':'Inativo')}} 
            </v-list-item-subtitle>  
        </v-list-item-content>
        <v-list-item-action>
            <game-menu
              :game = "game"
            />
        </v-list-item-action>
        
    </template>
  </v-list-item>
  <v-divider />
  </div>
</template>

<script>
export default {
  data () {
    return {
      
    }
  },
  props: ['game'],
  filters: {
    
  },
  components: {
    'game-menu': require('./GameMenu').default
  },
  methods: {
    
    
  }
}
</script>

